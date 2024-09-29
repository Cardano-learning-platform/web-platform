<script lang="ts">
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import 'iconify-icon';
	import {
		Modal,
		storePopup,
		Toast,
		initializeStores,
		Drawer,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { setupViewTransition } from 'sveltekit-view-transition';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import QuizModal from '$lib/ui/components/Modal/QuizModal.svelte';

	import Footer from '$lib/ui/sections/Footer.svelte';
	import Navbar from '$lib/ui/sections/Navbar.svelte';

	import '../app.postcss';

	initializeStores();

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	const modalRegistry: Record<string, ModalComponent> = {
		quizDifficultyModal: { ref: QuizModal }
	};

	$: isHomePath = $page.url.pathname === '/';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	setupViewTransition();

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="app {isHomePath && 'variant-soft-primary'}">
	<Drawer />
	<Modal components={modalRegistry} />

	<Navbar {data} />
	<Toast position="t" />
	<Toaster position="top-center" visibleToasts={5} closeButton />
	<main class="content relative">
		<slot />
	</main>

	<Footer />
</div>

<style>
	.content {
		min-height: calc(100vh - 101px);
	}
</style>
