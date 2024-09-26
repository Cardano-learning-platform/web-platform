<script lang="ts">
	import { queryParam } from 'sveltekit-search-params';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Card } from '$lib/ui/components/Card/index.js';
	import { ResponsiveCard } from '$lib/ui/layout/index.js';

	export let data;
	const searchQuery = queryParam('searchQuery');
	let searchFailureMessage = queryParam('message');

	let searchPhrase = $searchQuery ?? '';
	$: $searchFailureMessage = $page.url.searchParams.get('message');

	const handleSearch = () => {
		const url = encodeURIComponent(`${searchPhrase}`);
		goto(`/search/?searchQuery=${url}`);
	};
	const handleSearchOnEnter = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};
</script>

<aside class="alert variant-ghost-surface mx-10 my-2">
	<div><iconify-icon icon="uit:process" class="animate-spin" /></div>
	<div class="alert-message">
		<p>
			Our team is dedicated to developing high-quality courses on Cardano blockchain technology.
		</p>
	</div>
</aside>
<div class="container mx-auto p-8">
	<h1 class="mb-4 text-4xl font-bold">Search</h1>
	<div class="flex flex-col items-center gap-5 md:flex-row">
		<input
			class="input py-2 px-1"
			type="text"
			bind:value={searchPhrase}
			on:keypress={handleSearchOnEnter}
			placeholder="Enter course."
		/>
		<button class="variant-filled-primary btn" on:click={handleSearch}>Search</button>
	</div>
	{#if $searchFailureMessage}
		<p class="mt-5 text-yellow-500">{$searchFailureMessage}</p>
	{/if}

	{#if data?.courses}
		<div class="mt-20">
			<ResponsiveCard>
				{#each data?.courses as course}
					<Card {...course} />
				{/each}
			</ResponsiveCard>
		</div>
	{/if}
</div>
