<script lang="ts">
	import { onMount } from 'svelte';
	let ctaSection: HTMLDivElement | null = null;

	function setupObserver() {
		window.addEventListener('scroll', () => {
			const startFadePoint = window.innerHeight * 0.1;
			const fullyVisiblePoint = 10;

			const distanceFromBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;

			let opacity = 0;
			if (distanceFromBottom < startFadePoint) {
				opacity = (startFadePoint - distanceFromBottom) / (startFadePoint - fullyVisiblePoint);
				opacity = Math.min(opacity, 1);
			}

			ctaSection && (ctaSection.style.opacity = String(opacity));
		});
	}

	onMount(() => {
		setupObserver();
	});
</script>

<section
	class="variant-glass-surface relative z-50 flex min-h-screen items-center justify-center rounded-b-[70px] border-b-2 border-secondary-500 px-5 py-20 pt-8 text-center backdrop-blur-3xl lg:rounded-b-[200px]"
>
	<img src="/hero/star.png" alt=" " class="absolute bottom-48 left-0 w-32 lg:top-0 lg:w-auto" />
	<img src="/hero/spring.png" class="absolute right-0 top-8 w-32 lg:top-1/2 lg:w-auto" alt=" " />
	<div class="relative z-10 mx-auto max-w-4xl">
		<h2 class="py-4 text-7xl font-black">Sign up for free today</h2>
		<p class="mx-auto mb-8 max-w-lg text-lg font-extralight">
			Join our community and unlock the full potential of e-learning. Start mastering new skills in
			minutes. No credit card required.
		</p>
		<a class="variant-ghost-tertiary btn btn-xl" href="/auth/register">Signup</a>
	</div>
</section>
<div class="sticky bottom-0 -z-10 lg:min-h-52" bind:this={ctaSection}>
	<h2 class="py-5 text-center text-3xl lg:text-9xl">LEARN CARDANO</h2>
</div>
