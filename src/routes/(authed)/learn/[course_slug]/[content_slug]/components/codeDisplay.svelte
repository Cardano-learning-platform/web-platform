<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import { processContent, removeCodeBlock } from '../helpers';
	import { PUBLIC_BACKEND_ENDPOINT } from '$env/static/public';

	export let courseContent: any;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;
	let terminalContainer: HTMLElement;
	let terminalOutput: { success: boolean; message: string } = { success: true, message: '' };
	let isRunning = false;

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

			if (result.success) {
				terminalOutput = { success: true, message: 'Success!!!' };
			} else {
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
					on:click={makeRequest}
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
					<p class="p-2 {terminalOutput.success ? 'text-green-400' : 'text-red-400'} font-mono">
						{terminalOutput.message || 'Terminal output...'}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		/* overflow: hidden; */
	}
</style>
