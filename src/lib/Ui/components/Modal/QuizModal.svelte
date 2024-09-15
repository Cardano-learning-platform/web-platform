<script lang="ts">
	import { ListBox, ListBoxItem, getModalStore } from '@skeletonlabs/skeleton';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let parent: any;

	const modalStore = getModalStore();
	const quizDifficultyList = $modalStore[0].meta;
	let difficulty = '';

	function onFormSubmit(): void {
		if ($modalStore[0].response) {
			$modalStore[0].response(difficulty);
		}
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? ''}</header>
		<article>{$modalStore[0].body ?? ''}</article>
		<ListBox class="border border-surface-500 p-4 rounded-container-token">
			{#each quizDifficultyList as item}
				<ListBoxItem bind:group={difficulty} name={item} value={item}
					>{item.toUpperCase()}</ListBoxItem
				>
			{/each}
		</ListBox>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select Difficulty</button>
    </footer>
	</div>
{/if}
