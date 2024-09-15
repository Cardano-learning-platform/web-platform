<script lang="ts">
	import Siema, { type SiemaOptions } from 'siema';
	import { onMount, createEventDispatcher } from 'svelte';
	export let perPage: number | SiemaOptions['perPage'] = 3;
	export let loop = true;
	export let autoplay = 0;
	export let duration = 200;
	export let easing = 'ease-out';
	export let startIndex = 0;
	export let draggable = true;
	export let multipleDrag = true;
	export let controls = true;
	export let threshold = 20;
	export let rtl = false;

	let siema: HTMLElement;
	let controller: Siema | null = null;
	let timer: ReturnType<typeof setInterval> | null = null;
	const dispatch = createEventDispatcher();

	$: pips = controller ? controller?.innerElements : [];
	$: currentPerPage = controller ? controller.perPage : perPage;

	onMount(() => {
		controller = new Siema({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			loop,
			duration,
			easing,
			startIndex,
			draggable,
			multipleDrag,
			threshold,
			rtl,
			onChange: handleChange
		});

		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
		return () => {
			autoplay && clearInterval(timer);
			controller.destroy();
		};
	});

	export function isDotActive(currentIndex: number, dotIndex: number) {
		if (currentIndex < 0) currentIndex = pips.length + currentIndex;
		return (
			currentIndex >= dotIndex * currentPerPage &&
			currentIndex < dotIndex * currentPerPage + currentPerPage
		);
	}

	export function left() {
		controller?.prev();
	}

	export function right() {
		controller?.next();
	}

	export function go(index) {
		controller?.goTo(index);
	}

	export function pause() {
		clearInterval(timer);
	}

	export function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	function handleChange(event) {
		currentIndex = controller?.currentSlide;
		dispatch('change', {
			currentSlide: controller?.currentSlide,
			slideCount: controller?.innerElements?.length
		});
	}

	function resetInterval(node, condition) {
		function handleReset(event) {
			pause();
			resume();
		}

		if (condition) {
			node.addEventListener('click', handleReset);
		}

		return {
			destroy() {
				node.removeEventListener('click', handleReset);
			}
		};
	}
</script>

<div class="carousel">
	{#if controls}
		<div class="mx-auto flex max-w-7xl items-center justify-end gap-5 py-2">
			<button
				class="left"
				type="button"
				on:click={left}
				use:resetInterval={autoplay}
				aria-label="left"
			>
				<slot name="left-control" />
			</button>
			<button
				class="right"
				type="button"
				on:click={right}
				use:resetInterval={autoplay}
				aria-label="right"
			>
				<slot name="right-control" />
			</button>
		</div>
	{/if}

	<div class="slides" bind:this={siema}>
		<slot />
	</div>
</div>

<style>
	.carousel {
		position: relative;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>
