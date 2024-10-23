<script lang="ts">
	import {
		getDrawerStore,
		popup,
		Drawer,
		getModalStore,
		type DrawerSettings,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { CanvasTextGrabber } from 'canvas-text-grabber';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { queryParam } from 'sveltekit-search-params';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isMobile } from '$lib/helpers/isMobile';
	import { truncate } from '$lib/helpers/truncateWords';
	import LearnService from '$lib/services/learn/data-provider';
	// import Onboarding from '$lib/services/onboarding/data-provider';
	import { Drawer as MobileDrawer } from '$lib/ui/components/Drawer';
	import ChapterDrawer from './components/ChapterDrawer.svelte';
	import MobileChapterDrawer from './components/MobileChapterDrawer.svelte';

	const drawerStore = getDrawerStore();
	let contents: object[] = [];
	let openedChapterIds: number[] = [];

	export let data;

	$: previousAndNextLesson = data?.props?.previousAndNextLesson;

	// const onboardingStatus = data.onboardingStatus;
	let isMobileDrawerOpen = false;
	// const onboarding = new Onboarding(data?.supabase);

	// const updateOnboardingStatus = async (tour: string) => {
	// 	if (!tour) return;

	// 	try {
	// 		await fetch(`/api/tour?tour_name=${tour}`);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// onMount(async () => {
	// 	if (onboardingStatus) return;
	// 	const tour = await onboarding.initializeOnboardingProgress('learnTour', {
	// 		onExitTour: () => updateOnboardingStatus('learnTour')
	// 	});
	// 	if (tour && !isMobile()) {
	// 		tour().drive();
	// 	}
	// });

	const modalStore = getModalStore();
	const chapters = data?.props?.chapters;
	const learnProvider = new LearnService(data?.supabase);
	let bottomNavTooltip = ['Explain', 'Menu', 'Quiz'];
	let sectionText: string | undefined;
	const doesUrlHaveError = queryParam('error');
	const urlMessage = queryParam('message');
	let isMobileChapterDrawerOpen = false;
	const surfaceColor = browser
		? getComputedStyle(document.body).getPropertyValue('--color-surface-400')
		: '';

	const sketch = new CanvasTextGrabber({
		stokeStyle: `rgb(${surfaceColor})`,
		canvasStyles: {
			border: 'none'
		},
		selectedElementsStyle: {
			backgroundColor: `rgb(${surfaceColor})`
		}
	});

	$: lessonSlug = $page.url.pathname.split('/').pop();

	$: if ($doesUrlHaveError) {
		toast.warning($urlMessage ?? '', { duration: 5000 });
		doesUrlHaveError.set(null);
		urlMessage.set(null);
	}
	$: if (lessonSlug) {
		// resetHighlight();
		isMobileChapterDrawerOpen = false;
	}
	const contentMenu: DrawerSettings = {
		id: 'contentMenu',
		bgDrawer: 'bg-gray-900 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-gray-500/50 to-gray-500/50',
		width: 'w-full md:w-[480px]',
		padding: 'p-2',
		rounded: 'rounded-xl',
		position: isMobile() ? 'bottom' : 'right',
		height: isMobile() ? 'h-3/4' : 'h-full'
	};

	const redirectToQuiz = (difficulty: string) => {
		goto(
			`/quiz/${lessonSlug}?from=content&difficulty=${difficulty}&redirectTo=${$page.url.pathname}`
		);
	};

	const openChapterMenu = () => {
		if (isMobile()) {
			isMobileChapterDrawerOpen = true;
			return;
		}
		drawerStore.open(contentMenu);
	};

	const sendExplanationEvent = () => {
		sketch.finishDrawing();
		return document?.dispatchEvent(
			new CustomEvent<string | undefined>('explainEvent', { detail: sectionText })
		);
	};

	const quizMenu: ModalSettings = {
		type: 'component',
		title: 'Quiz Difficulty',
		body: 'Select the difficulty of the quiz',
		meta: ['easy', 'medium', 'hard'],
		component: 'quizDifficultyModal',
		response(difficulty) {
			if (!difficulty) return;
			redirectToQuiz(difficulty);
		}
	};

	const handleExplain = async () => {
		const lessonContainer = document.querySelector('#content-container') as HTMLElement;

		toast('Select a section of the text to explain', {
			action: {
				label: 'Cancel',
				onClick: () => sketch.finishDrawing()
			},
			duration: 9000
		});

		sketch.initialize(lessonContainer);

		sketch.getSelectedText((text) => {
			sectionText = text;
		});

		await sketch.isDrawingFinished((elements) => {
			elements?.forEach((element) => element.classList.add('wiggle-effect'));

			setTimeout(() => {
				elements?.forEach((element) => element.classList.remove('wiggle-effect'));

				if (sectionText) {
					isMobileDrawerOpen = true;
				}
			}, 500);
		});
	};

	const handleQuiz = () => {
		modalStore.trigger(quizMenu);
	};
</script>

<!-- {#if isMobileChapterDrawerOpen}
	<MobileChapterDrawer
		{chapters}
		getLessonsTitleByChapterId={learnProvider.getLessonsTitleByChapterId}
		{drawerStore}
		bind:openedChapterIds
		bind:contents
		bind:isMobileChapterDrawerOpen
	/>
{/if} -->
<Drawer>
	{#if $drawerStore.id === 'contentMenu'}
		<ChapterDrawer
			{chapters}
			getLessonsTitleByChapterId={learnProvider.getLessonsTitleByChapterId}
			{drawerStore}
			bind:openedChapterIds
			bind:contents
		/>
	{/if}
</Drawer>

<div class="relative">
	<div>
		<slot />
		<div
			class="m-auto flex h-auto max-w-6xl flex-col items-center justify-center gap-5 p-2 lg:flex-row lg:justify-between"
		>
			{#if previousAndNextLesson}
				<div class="">
					{#if previousAndNextLesson.previousLesson}
						<a
							href={previousAndNextLesson.previousLesson.slug}
							class="card btn w-full truncate break-words"
						>
							<iconify-icon icon="fluent:arrow-left-24-regular" class="text-primary-500" />
							<p class="truncate">
								{truncate(previousAndNextLesson.previousLesson.lesson_title, 20)}
							</p>
						</a>
					{/if}
				</div>
				<div class="">
					{#if previousAndNextLesson.nextLesson}
						<a href={previousAndNextLesson.nextLesson.slug} class="card btn">
							<p>{truncate(previousAndNextLesson.nextLesson.lesson_title, 20)}</p>
							<iconify-icon icon="fluent:arrow-right-24-regular" class="text-primary-500" />
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<MobileDrawer bind:isMobileDrawerOpen {sendExplanationEvent} {sectionText} {sketch} />

	<div class="card sticky bottom-0 z-50 p-2 md:bottom-2/4 md:max-w-[100px] md:p-4">
		{#each bottomNavTooltip as tooltip}
			<div class="card variant-filled-tertiary px-3 py-1" data-popup={tooltip}>
				<p>{tooltip}</p>
				<div class="variant-filled-tertiary arrow" />
			</div>
		{/each}

		<div
			class="xs: relative m-auto flex max-w-xs flex-wrap justify-around gap-2 xs:flex-nowrap md:flex-col md:justify-between"
		>
			<a href="/dashboard/home" class="variant-outline-tertiary btn btn-sm md:hidden">
				<iconify-icon icon="iconamoon:home" class="text-primary-500" />
				<p class="font-extralight md:hidden">Home</p>
			</a>
			<button
				class="variant-outline-tertiary btn btn-sm md:btn-md [&>*]:pointer-events-none"
				id="menu"
				use:popup={{ event: 'hover', target: `${!isMobile() && 'Menu'}`, placement: 'right-start' }}
				on:click={openChapterMenu}
			>
				<iconify-icon icon="ic:baseline-menu-book" class="text-primary-500" />
				<p class="font-extralight md:hidden">Menu</p>
			</button>
			<button
				class="variant-outline-tertiary btn btn-sm md:btn-md [&>*]:pointer-events-none"
				id="quiz"
				use:popup={{ event: 'hover', target: `${!isMobile() && 'Quiz'}`, placement: 'right-start' }}
				on:click={handleQuiz}
			>
				<iconify-icon icon="fluent:quiz-new-20-regular" class="text-primary-500" />
				<p class="font-extralight md:hidden">Quiz</p>
			</button>

			<button
				class="variant-outline-tertiary btn btn-sm md:btn-md md:hidden [&>*]:pointer-events-none"
				id="draw"
				use:popup={{ event: 'hover', target: `${!isMobile() && 'Draw'}`, placement: 'right-start' }}
				on:click={handleExplain}
			>
				<iconify-icon icon="fluent:whiteboard-16-filled" class="text-primary-500" />
				<p class=" font-extralight md:hidden">Explain</p>
			</button>
		</div>
	</div>
</div>
