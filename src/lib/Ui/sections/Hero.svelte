<script lang="ts">
	import { onMount } from 'svelte';
	let heroSection: HTMLDivElement | null = null;
	function setupObserver() {
		window.addEventListener('scroll', () => {
			const triggerPoint = 150;
			const maxFadePoint = 600;

			const scrollDepth = window.scrollY;
			let opacity = 1;

			if (scrollDepth > triggerPoint) {
				opacity = 1 - (scrollDepth - triggerPoint) / (maxFadePoint - triggerPoint);
				opacity = Math.max(opacity, 0);
			}

			heroSection && (heroSection.style.opacity = String(opacity));
		});
	}
	onMount(() => {
		setupObserver();
	});
</script>

<div
	class="sticky top-0 flex h-[90vh] flex-col items-center justify-center pt-10 md:flex-row"
	id="hero"
	bind:this={heroSection}
>
	<div
		class="pointer-events-none absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat backdrop-blur-md"
	></div>
	<div class="z-10 flex flex-col items-baseline justify-between">
		<h1
			class="bg-clip-text pb-7 text-center text-4xl font-normal leading-10 text-transparent text-white md:text-7xl"
		>
			Shape Your Journey with
			<span class="block">Next-Generation Learning</span>
		</h1>
		<p class="text-md md:text-md mx-auto max-w-xl px-2 text-center font-extralight">
			Join our community and unlock the full potential of e-learning. Start mastering new skills in
			minutes. No credit card required.
		</p>

		<a class="variant-soft-primary btn btn-xl mx-auto mt-8 flex gap-3" href="/auth/register">
			Join us
			<iconify-icon icon="line-md:arrow-small-right" class="text-2xl" />
		</a>
	</div>
</div>
