<script lang="ts">
	import {
		getDrawerStore,
		popup,
		Drawer,
		getModalStore,
		type DrawerSettings,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { queryParam } from 'sveltekit-search-params';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isMobile } from '$lib/helpers/isMobile';
	import { truncate } from '$lib/helpers/truncateWords';
	import LearnService from '$lib/services/learn/data-provider';
	import { Drawer as MobileDrawer } from '$lib/ui/components/Drawer';
	import ChapterDrawer from './components/ChapterDrawer.svelte';
	import MobileChapterDrawer from './components/MobileChapterDrawer.svelte';
	import { CanvasTextGrabber } from 'canvas-text-grabber';

	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();
	let contents: object[] = [];
	let openedChapterIds: number[] = [];

	export let data;

	$: previousAndNextLesson = data?.props?.previousAndNextLesson;
	$: currentLessonTitle = data?.props?.lesson?.lesson_title || '';

	let isMobileDrawerOpen = false;
	let isMobileChapterDrawerOpen = false;
	let sectionText: string | undefined;

	const doesUrlHaveError = queryParam('error');
	const urlMessage = queryParam('message');
	const surfaceColor = browser
		? getComputedStyle(document.body).getPropertyValue('--color-surface-400')
		: '';

	const chapters = data?.props?.chapters;
	const learnProvider = new LearnService(data?.supabase);

	$: lessonSlug = $page.url.pathname.split('/').pop();

	$: if ($doesUrlHaveError) {
		toast.warning($urlMessage ?? '', { duration: 5000 });
		doesUrlHaveError.set(null);
		urlMessage.set(null);
	}

	$: if (lessonSlug) {
		isMobileChapterDrawerOpen = false;
	}

	// Updated drawer settings for better visibility and clarity
	const contentMenu: DrawerSettings = {
		id: 'contentMenu',
		bgDrawer: 'bg-gray-900 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-gray-500/50 to-gray-500/50',
		width: 'w-full md:w-[480px]',
		padding: 'p-4', // Increased padding
		rounded: 'rounded-xl',
		position: isMobile() ? 'bottom' : 'right',
		height: isMobile() ? 'h-3/4' : 'h-full'
	};

	// Navigate to quiz with selected difficulty
	const redirectToQuiz = (difficulty: string) => {
		goto(
			`/quiz/${lessonSlug}?from=content&difficulty=${difficulty}&redirectTo=${$page.url.pathname}`
		);
	};

	const sketch = new CanvasTextGrabber({
		stokeStyle: `rgb(${surfaceColor})`,
		canvasStyles: {
			border: 'none'
		},
		selectedElementsStyle: {
			backgroundColor: `rgb(${surfaceColor})`
		}
	});

	const sendExplanationEvent = () => {
		sketch.finishDrawing();
		return document?.dispatchEvent(
			new CustomEvent<string | undefined>('explainEvent', { detail: sectionText })
		);
	};

	// Explanation handler with clearer instructions
	const handleExplain = async () => {
		const lessonContainer = document.querySelector('#content-container') as HTMLElement;

		toast('Select text to get an explanation', {
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

	// Open chapter menu with improved functionality
	const openChapterMenu = () => {
		if (isMobile()) {
			isMobileChapterDrawerOpen = true;
			return;
		}
		drawerStore.open(contentMenu);

		// Show help toast for first-time users
		if (localStorage.getItem('chapters-menu-seen') !== 'true') {
			toast.info('Navigate between chapters and lessons using this menu', {
				duration: 5000,
				position: 'top-center'
			});
			localStorage.setItem('chapters-menu-seen', 'true');
		}
	};

	// Updated quiz modal with clearer instructions
	const quizMenu: ModalSettings = {
		type: 'component',
		title: 'Select Quiz Difficulty',
		body: 'Choose a difficulty level to test your knowledge on this topic:',
		meta: [
			{ value: 'easy', label: 'Easy - Basic concepts' },
			{ value: 'medium', label: 'Medium - More detailed questions' },
			{ value: 'hard', label: 'Hard - Advanced application' }
		],
		component: 'quizDifficultyModal',
		response(difficulty) {
			if (!difficulty) return;
			redirectToQuiz(difficulty);
		}
	};

	const handleQuiz = () => {
		modalStore.trigger(quizMenu);
	};

	// Define navigation items after all functions are defined
	const navigationItems = [
		{
			id: 'home',
			label: 'Return Home',
			icon: 'iconamoon:home',
			mobileLabel: 'Home',
			action: () => goto('/dashboard/home')
		},
		{
			id: 'chapters',
			label: 'Lesson Chapters',
			icon: 'ic:baseline-menu-book',
			mobileLabel: 'Chapters',
			action: openChapterMenu
		},
		{
			id: 'quiz',
			label: 'Take a Quiz',
			icon: 'fluent:quiz-new-20-regular',
			mobileLabel: 'Quiz',
			action: handleQuiz
		},
		{
			id: 'explain',
			label: 'Explain Selection',
			icon: 'fluent:whiteboard-16-filled',
			mobileLabel: 'Explain',
			action: handleExplain,
			mobileOnly: true
		}
	];
</script>

<!-- Mobile Chapter Drawer (when open) -->
{#if isMobileChapterDrawerOpen}
	<MobileChapterDrawer
		{chapters}
		getLessonsTitleByChapterId={learnProvider.getLessonsTitleByChapterId}
		{drawerStore}
		bind:openedChapterIds
		bind:contents
		bind:isMobileChapterDrawerOpen
	/>
{/if}

<!-- Desktop Chapter Drawer -->
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
	<!-- Current lesson indicator -->
	<div
		class="bg-surface-800/80 py-2 px-4 sticky top-0 z-40 backdrop-blur-sm border-b border-surface-700"
	>
		<div class="max-w-6xl mx-auto flex items-center justify-between">
			<div class="flex items-center gap-2">
				<iconify-icon icon="ph:book-open-text" class="text-primary-500" width="20" height="20" />
				<p class="text-sm md:text-base font-medium truncate max-w-[200px] md:max-w-md">
					{currentLessonTitle}
				</p>
			</div>
			<button
				class="btn btn-sm variant-ghost-surface"
				on:click={openChapterMenu}
				aria-label="Open chapters menu"
			>
				<iconify-icon icon="heroicons:bookmark" class="text-primary-500" />
				<span class="hidden md:inline">Browse Chapters</span>
			</button>
		</div>
	</div>

	<div>
		<slot />

		<!-- Previous/Next Lesson Navigation -->
		{#if previousAndNextLesson}
			<div class="bg-surface-800/40 border-t border-surface-700 py-4">
				<div class="m-auto flex max-w-6xl flex-col md:flex-row justify-between gap-3 px-4">
					<div class="flex-1">
						{#if previousAndNextLesson.previousLesson}
							<a
								href={previousAndNextLesson.previousLesson.slug}
								class="card btn w-full md:w-auto variant-ghost-surface"
							>
								<iconify-icon icon="fluent:arrow-left-24-regular" class="text-primary-500" />
								<div class="flex flex-col items-start text-left">
									<span class="text-xs text-surface-400">Previous Lesson</span>
									<p class="truncate">
										{truncate(previousAndNextLesson.previousLesson.lesson_title, 30)}
									</p>
								</div>
							</a>
						{/if}
					</div>
					<div class="flex-1 flex justify-end">
						{#if previousAndNextLesson.nextLesson}
							<a
								href={previousAndNextLesson.nextLesson.slug}
								class="card btn w-full md:w-auto variant-ghost-surface"
							>
								<div class="flex flex-col items-end text-right">
									<span class="text-xs text-surface-400">Next Lesson</span>
									<p>{truncate(previousAndNextLesson.nextLesson.lesson_title, 30)}</p>
								</div>
								<iconify-icon icon="fluent:arrow-right-24-regular" class="text-primary-500" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Mobile explanation drawer -->
	<MobileDrawer bind:isMobileDrawerOpen {sendExplanationEvent} {sectionText} {sketch} />

	<!-- Main Navigation Menu -->
	<div class="sticky bottom-0 z-50 p-2 md:bottom-2/4 md:right-4 md:fixed md:max-w-[60px]">
		<!-- Navigation tooltips -->
		{#each navigationItems as item}
			<div class="card variant-filled-tertiary px-3 py-1" data-popup={item.label}>
				<p>{item.label}</p>
				<div class="variant-filled-tertiary arrow" />
			</div>
		{/each}

		<!-- Navigation buttons -->
		<div class="card variant-outline-primary shadow-xl">
			<div class="p-2 flex flex-row md:flex-col justify-around items-center gap-1 md:gap-3">
				{#each navigationItems as item}
					{#if !item.mobileOnly || (item.mobileOnly && isMobile())}
						<button
							class="btn-nav-item"
							id={item.id}
							use:popup={{
								event: 'hover',
								target: `${!isMobile() && item.label}`,
								placement: 'right-start'
							}}
							on:click={item.action}
							aria-label={item.label}
						>
							<iconify-icon icon={item.icon} class="text-primary-500" width="24" height="24" />
							<p class="text-xs font-extralight md:hidden">{item.mobileLabel}</p>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.btn-nav-item {
		@apply p-2 rounded-md flex flex-col items-center justify-center transition-all duration-150 
		hover:bg-surface-600/30 focus:bg-surface-600/50 focus:outline-none;
		min-width: 64px;
	}

	@media (min-width: 768px) {
		.btn-nav-item {
			min-width: auto;
			@apply p-3;
		}
	}

	.wiggle-effect {
		animation: wiggle 0.5s ease-in-out;
	}

	@keyframes wiggle {
		0%,
		100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-5deg);
		}
		75% {
			transform: rotate(5deg);
		}
	}
</style>
