<!-- <script lang="ts">
	import type { getDrawerStore } from '@skeletonlabs/skeleton';

	import { truncate } from '$lib/helpers/truncateWords';
	import { highlight, deleteHighlight } from '$lib/stores/highlight';
	import Skeleton from '$lib/UI/components/Skeleton/index.svelte';

	export let drawerStore: ReturnType<typeof getDrawerStore>;

	const findElementByText = (text: string) => {
		const container = document.querySelector('#content-container');
		const elements = Array.from(container?.querySelectorAll('p') ?? []);
		return elements?.find((element) => {
			if (element.textContent?.includes(text)) {
				return element;
			}
		});
	};

	const scrollToElement = (text: string) => {
		const element = findElementByText(text);
		element?.classList.add('variant-outline-primary', 'transition-all');
		setTimeout(() => {
			element?.classList.remove('variant-outline-primary', 'transition-all');
		}, 1000);
		drawerStore.close();
		element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
</script>

<div class="py-4">
	{#if $highlight.loading}
		<h1 class="text-center text-xl">Fetching highlight</h1>
		<Skeleton length={3} placeholderCount={2} className="mt-5" />
	{:else if $highlight.error}
		<aside class="alert variant-filled-warning">
			<div>
				<iconify-icon
					icon="material-symbols:warning-outline"
					style="color: white;"
					width="25"
					height="25"
				/>
			</div>
			<div class="alert-message">
				<h3 class="h3">Failed fetching Highlights</h3>
				<p>{$highlight.error ?? 'Something went went wrong when fetching the data'}</p>
			</div>
		</aside>
	{:else if $highlight.data.length === 0}
		<div class="list-dl my-5 cursor-pointer p-3">
			<p class="text-center">No highlights</p>
		</div>
	{:else}
		<div class="list-dl my-5 cursor-pointer p-3">
			{#each $highlight.data as { highlight_contents, id }}
				<div class="hover:variant-filled-primary">
					<span class="badge bg-primary-500">
						<iconify-icon
							icon="material-symbols:article-outline"
							style="color: white;"
							width="25"
							height="25"
						/>
					</span>
					<span
						class="flex-auto overflow-hidden"
						on:click={() => scrollToElement(highlight_contents)}
						on:keydown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								scrollToElement(highlight_contents);
							}
						}}
						role="button"
						tabindex="0"
					>
						<p>{truncate(highlight_contents, 45)}</p>
					</span>
					<button on:click={() => deleteHighlight(id)}>
						<iconify-icon
							icon="material-symbols:delete-outline"
							style="color: white;"
							width="25"
							height="25"
						/>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div> -->
