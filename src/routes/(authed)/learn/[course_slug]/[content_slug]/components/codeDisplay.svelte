<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import { processContent, removeCodeBlock } from '../helpers';
	import { PUBLIC_BACKEND_ENDPOINT } from '$env/static/public';
	import { validatePlutusCode, type ValidationResult } from '$lib/helpers/codeValidator';
	export let courseContent: any;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;
	let terminalContainer: HTMLElement;
	let terminalOutput: { success: boolean; message: string } = { success: true, message: '' };
	let isRunning = false;
	let buildTimestamp: string | null = null;
	let buildStatus: string = 'idle';
	let progress: number = 0;
	let eventSource: EventSource | null = null;
	let outputLines: string[] = [];
	let errorLines: string[] = [];
	let errorDetails: any = null;
	let validationResult: ValidationResult | null = null;
	let showValidationModal = false;
	let isValidating = false;
	let initialCode = removeCodeBlock(courseContent?.initial_code);

	onMount(async () => {
		monaco = (await import('$lib/utils/monaco')).default;

		editor = monaco.editor.create(editorContainer, {
			value: initialCode,
			language: 'haskell',
			theme: 'vs-dark',
			automaticLayout: true,
			minimap: { enabled: false },
			fontSize: 14,
			lineNumbers: 'on',
			roundedSelection: false,
			scrollBeyondLastLine: false,
			readOnly: false
		});
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});

	function connectToSSE(timestamp: string) {
		// Close any existing connection
		if (eventSource) {
			eventSource.close();
		}

		// Reset output arrays and state
		outputLines = [];
		errorLines = [];
		errorDetails = null;

		// Connect to SSE endpoint
		eventSource = new EventSource(`${PUBLIC_BACKEND_ENDPOINT}api/build-status/${timestamp}`);

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);

				// Update build status
				if (data.status) {
					buildStatus = data.status;
				}

				// Update progress
				if (data.progress) {
					progress = data.progress;
				}

				// Add output line if present
				if (data.outputLine) {
					outputLines = [...outputLines, data.outputLine];
				}

				// Add error line if present
				if (data.errorLine) {
					errorLines = [...errorLines, data.errorLine];
				}

				// Handle error object
				if (data.error) {
					errorDetails = data.error;
					errorLines = [...errorLines, data.error.message || JSON.stringify(data.error)];
				}

				// Update terminal message based on status
				if (data.message) {
					terminalOutput = {
						success: buildStatus !== 'failed',
						message: data.message
					};
				}

				// Handle build completion
				if (data.status === 'completed' || data.status === 'failed') {
					isRunning = false;

					if (data.status === 'completed' && !errorDetails) {
						terminalOutput = { success: true, message: 'Build completed successfully!' };
					} else if (data.status === 'failed' || errorDetails) {
						// If we have error details or status is failed, show error message
						terminalOutput = {
							success: false,
							message:
								errorDetails?.message || data.error?.message || 'Build failed. See errors above.'
						};
					}

					// Close connection
					eventSource?.close();
					eventSource = null;
				}
			} catch (err) {
				console.error('Error parsing SSE data:', err);
			}
		};

		eventSource.onerror = (error) => {
			console.error('SSE connection error:', error);

			// EventSource will automatically try to reconnect
			terminalOutput = {
				success: false,
				message: 'Connection error. Attempting to reconnect...'
			};
		};
	}
	const validateCode = () => {
		isValidating = true;
		const code = editor.getValue();
		validationResult = validatePlutusCode(code);

		if (!validationResult.isValid) {
			showValidationModal = true;
			terminalOutput = {
				success: false,
				message: 'Code validation failed. Please fix errors before running.'
			};
		} else {
			showValidationModal = false;
			// If validation passed, run the code
			makeRequest();
		}
		isValidating = false;
	};

	// Close the validation modal
	const closeValidationModal = () => {
		showValidationModal = false;
	};

	const makeRequest = async () => {
		isRunning = true;
		try {
			const response = await fetch(`${PUBLIC_BACKEND_ENDPOINT}api/exercise/nft-burn`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					code: editor.getValue()
				})
			});

			const result = await response.json();

			if (result.timestamp) {
				buildTimestamp = result.timestamp;
				connectToSSE(result.timestamp);
			} else if (result.success) {
				// Fall back to old behavior if no timestamp
				isRunning = false;
				terminalOutput = { success: true, message: 'Success!!!' };
			} else {
				isRunning = false;
				if (result.errorOutput) {
					terminalOutput = { success: false, message: result.errorOutput.message };
				} else {
					terminalOutput = { success: false, message: result.error };
				}
			}
		} catch (error) {
			terminalOutput = { success: false, message: `Error: ${error?.message}` };
		} finally {
			isRunning = false;
		}
	};
</script>

<div class="h-screen bg-surface-900 flex">
	<div class="w-1/2 bg-surface-800 border-r border-surface-700 overflow-y-auto">
		<div class="p-4">
			<div class="prose prose-invert mx-auto pl-20 py-6 lg:prose-lg">
				<!-- prose prose-invert mx-auto px-4 py-6 lg:prose-2xl -->
				<h1>{courseContent?.lesson_title}</h1>
				{#await processContent(courseContent?.lesson_content) then lessonContentData}
					<div>
						{@html lessonContentData.value}
					</div>
				{/await}
			</div>
		</div>
	</div>

	<div class="w-1/2 flex flex-col">
		<div bind:this={editorContainer} class="flex-1" />

		<div bind:this={terminalContainer} class="h-1/3 bg-black border-t border-surface-700">
			<div class="flex items-center justify-between p-2 border-b border-surface-800">
				<div class="flex items-center gap-2 text-surface-200">
					<iconify-icon icon="iconoir:terminal" width="24" height="24" />
					<span>Terminal Output</span>
				</div>
				<button
					on:click={validateCode}
					disabled={isRunning}
					class="btn variant-filled-success"
					class:opacity-50={isRunning}
				>
					<iconify-icon icon="cuida:play-outline" class="text-black" width="24" height="24" />
					{isRunning ? 'Running...' : 'Run Code'}
				</button>
			</div>
			<div class="h-[calc(100%-3rem)] overflow-y-auto">
				{#if isRunning}
					<p class="flex text-xl p-4 items-center gap-2">
						Building code <iconify-icon
							icon="line-md:loading-twotone-loop"
							width="24"
							height="24"
						/>
					</p>
				{:else}
					<p class={terminalOutput.success ? 'text-green-400' : 'text-red-400'}>
						{terminalOutput.message || 'Terminal output...'}
					</p>

					{#if errorDetails && errorDetails.file}
						<div class="mt-2">
							<p class="text-red-400">
								Error in {errorDetails.file}
								{#if errorDetails.line}
									at line {errorDetails.line}
								{/if}
							</p>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>
{#if showValidationModal}
	<div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
		<div class="bg-surface-800 rounded-lg shadow-xl w-3/4 max-w-3xl max-h-[80vh] overflow-y-auto">
			<div class="p-4 border-b border-surface-700 flex justify-between items-center">
				<h2 class="text-xl font-semibold text-surface-50">Code Validation Results</h2>
				<button on:click={closeValidationModal} class="text-surface-400 hover:text-surface-50">
					<iconify-icon icon="carbon:close" width="24" height="24" />
				</button>
			</div>

			<div class="p-4">
				<h3 class="text-lg text-red-400 mb-3">
					Found {validationResult?.errors.length} issue{validationResult?.errors.length === 1
						? ''
						: 's'}
				</h3>

				<div class="space-y-3">
					{#each validationResult?.errors || [] as error}
						<div class="bg-surface-700 rounded p-3">
							<h4 class="font-medium text-red-300">{error.message}</h4>
							{#if error.details}
								<p class="text-sm text-surface-300 mt-1">{error.details}</p>
							{/if}

							{#if error.lines && error.lines.length > 0}
								<div class="mt-2 text-sm">
									<p class="text-surface-300">Found at lines:</p>
									<ul class="list-disc pl-5 mt-1 text-surface-400">
										{#each error.lines as line}
											<li>
												Line {line.lineNumber}:
												<code class="bg-surface-800 px-1 py-0.5 rounded">{line.content}</code>
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							{#if error.suggestion}
								<div class="mt-2">
									<p class="text-sm text-surface-300">Suggested implementation:</p>
									<pre
										class="bg-surface-900 p-2 rounded text-xs overflow-x-auto mt-1 text-green-300">{error.suggestion}</pre>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<div class="mt-4 flex justify-end">
					<button on:click={closeValidationModal} class="btn variant-filled-surface">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		/* overflow: hidden; */
	}
</style>
