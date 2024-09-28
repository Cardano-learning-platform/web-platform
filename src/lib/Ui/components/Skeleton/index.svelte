<script>
	export let length = 1;
	export let placeholderCount = 1;
	export let className = '';
	const colsPerGrid = [3, 4, 2, 4];
	const gridsCount = Math.ceil(placeholderCount / colsPerGrid.length);
</script>

{#each Array.from({ length }, (_, i) => i) as item (item)}
	<section class="card variant-soft-surface mt-1 w-full {className}">
		<div class="space-y-4 p-4">
			{#each Array.from({ length: placeholderCount }, (_, i) => i) as placeholderItem (placeholderItem)}
				<div class="placeholder animate-pulse bg-gray-500" />
			{/each}

			{#each Array.from({ length: gridsCount }, (_, i) => i) as gridIndex (gridIndex)}
				{#if gridIndex * colsPerGrid.length < placeholderCount}
					<div
						class="grid"
						style="grid-template-columns: repeat({colsPerGrid[gridIndex]}, 1fr); grid-gap: 1rem;"
					>
						{#each Array.from({ length: Math.min(placeholderCount - gridIndex * colsPerGrid.length, colsPerGrid[gridIndex]) }, (_, i) => i) as item (item)}
							<div class="placeholder animate-pulse" />
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</section>
{/each}
