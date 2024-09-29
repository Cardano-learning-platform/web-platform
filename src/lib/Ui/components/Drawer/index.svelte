<script lang="ts">
	import type { CanvasTextGrabber } from 'canvas-text-grabber';
	import { Drawer as MobileDrawer } from 'vaul-svelte';

	export let isMobileDrawerOpen: boolean;
	export let sectionText: string | undefined = undefined;
	export let sendExplanationEvent: () => void;
	export let sketch: CanvasTextGrabber;
</script>

<MobileDrawer.Root bind:open={isMobileDrawerOpen} onClose={() => sketch.finishDrawing()}>
	<MobileDrawer.Portal>
		<MobileDrawer.Overlay class="fixed inset-0 bg-black/40" />
		<MobileDrawer.Content
			class="fixed bottom-0 left-0 right-0 mt-24 flex h-[76%] flex-col rounded-t-[10px] bg-surface-900"
		>
			<div class="flex-1 rounded-t-[10px] p-4">
				<div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full" />
				<div class="mx-auto max-w-md">
					<MobileDrawer.Title class="mb-4 font-bold">Explanation</MobileDrawer.Title>
					<p class="mb-2">
						{#if sectionText}
							{sectionText}
						{:else}
							Select a section of the text to explain
						{/if}
					</p>
					<div class="mt-5 flex justify-between">
						<button
							class="variant-outline-primary btn"
							on:click={() => {
								sketch.finishDrawing();
								isMobileDrawerOpen = false;
							}}
						>
							Cancel
						</button>
						<button
							class="variant-filled-primary btn"
							on:click={() => {
								sendExplanationEvent();
								isMobileDrawerOpen = false;
							}}
						>
							Explain
						</button>
					</div>
				</div>
			</div>
		</MobileDrawer.Content>
	</MobileDrawer.Portal>
</MobileDrawer.Root>
