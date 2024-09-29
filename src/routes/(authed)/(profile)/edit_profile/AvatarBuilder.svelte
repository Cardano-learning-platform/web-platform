<script lang="ts">
	import { onMount } from 'svelte';
	import { avatarGenerator } from 'svelte-faces';

	import Drawer from './SideSelector.svelte';

	export let previewImage: string | undefined;
	export let usePreviousImage: boolean;
	export let avatarContainer: HTMLElement | null;
	const { initialize, generatePreview, getRandomStyle, isInitialized, getAllParts } =
		avatarGenerator;

	type Part = {
		path: string;
		svg: string;
		part: string | undefined;
	};

	type AvatarParts = {
		[key: string]: Part[];
	};

	let avatarNumbers: ReturnType<typeof getRandomStyle>;
	let isAvatarBuilderOpen = false;
	let selectedPartType: string | null = null;
	let categorizedParts: AvatarParts = {};

	onMount(async () => {
		await initialize();
		avatarNumbers = getRandomStyle();
		categorizeParts();
	});

	const categorizeParts = () => {
		categorizedParts = getAllParts().reduce(
			(acc, part) => {
				if (!acc[part.part]) {
					acc[part.part] = [];
				}
				acc[part.part].push(part);
				return acc;
			},
			{} as Record<string, Part[]>
		);
	};

	const selectPartType = (partType: string) => {
		selectedPartType = partType;
	};
	function handlePartSelect(part: Part, partType: string | null) {
		usePreviousImage = false;
		avatarNumbers[partType] = part.path;
	}

	const randomAvatar = () => {
		usePreviousImage = false;
		avatarNumbers = getRandomStyle();
	};

	$: if (isInitialized) {
		avatarNumbers = getRandomStyle();
	}
</script>

<Drawer bind:isAvatarBuilderOpen>
	{#if isAvatarBuilderOpen}
		<div class="flex h-max flex-col justify-between">
			<div class="flex-grow">
				{#if selectedPartType}
					<div class="flex flex-wrap justify-center gap-2 p-4">
						{#each categorizedParts[selectedPartType] as part}
							<button
								on:click={() => handlePartSelect(part, selectedPartType)}
								class="svg-container flex h-16 w-16 items-center justify-center overflow-hidden border
                                {avatarNumbers[selectedPartType] === part.path
									? 'variant-filled-primary'
									: 'variant-ghost-tertiary'}"
							>
								<!--  eslint-disable-next-line svelte/no-at-html-tags -->
								{@html part.svg}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="flex flex-wrap justify-center gap-2 p-2">
				{#each Object.keys(categorizedParts).filter((partType) => partType !== 'christmas' && partType !== 'halloween') as partType}
					<button
						class="variant-outline-primary btn {selectedPartType === partType
							? 'variant-filled-primary'
							: ''}"
						on:click={() => selectPartType(partType)}
					>
						{partType}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</Drawer>

<div class="my-3 flex flex-col items-center justify-center gap-3 md:flex-row md:justify-around">
	<div class="max-w-[200px]">
		{#if usePreviousImage}
			<img src={previewImage} alt="Generated Avatar" class="w-full rounded-full" />
		{:else}
			<div bind:this={avatarContainer} class="flex w-40 items-center justify-center">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html generatePreview(avatarNumbers)}
			</div>
		{/if}
	</div>
	<div class="">
		<button class="variant-ghost-secondary btn btn-sm" type="button" on:click={randomAvatar}>
			Random Avatar
		</button>

		<button
			class="variant-ghost-tertiary btn btn-sm"
			type="button"
			on:click={() => (isAvatarBuilderOpen = true)}
		>
			Build your own
		</button>
	</div>
</div>
