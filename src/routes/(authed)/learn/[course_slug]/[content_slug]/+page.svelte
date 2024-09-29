<script lang="ts">
	import {
		ProgressBar,
		TableOfContents,
		tocCrawler,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import { useCompletion } from 'ai/svelte';
	import destr from 'destr';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	import { dev, browser } from '$app/environment';
	import { page } from '$app/stores';
	import AnalyticsService from '$lib/services/analytics/data-provider';
	import type { ReadingInformation } from '$lib/services/analytics/types';
	import { Skeleton } from '$lib/ui/components/Skeleton';
	import { trackReadingTime } from '$lib/utils/trackReadingTime';
	import { customTooltip, selectedText, hidePopup, createTooltip } from './actions';
	import { syntheticForm, processContent, explainMenu, tooltipContents } from './helpers';
	export let data;

	const { input, handleSubmit, completion, error, isLoading } = useCompletion({
		api: '/api/explanations'
	});

	// Constants
	const updatingInterval = 10000; // 10 seconds
	const courseId = data.course && data?.course.id;
	const courseCategory = data.course && data?.course.category[0].categories?.category_title;
	const userId = data.userInformation?.id;
	const drawerStore = getDrawerStore();
	const analyticsProvider = new AnalyticsService();

	const { destroy, initiate, totalTimeInSeconds } = trackReadingTime();
	let trackingReadingTimeId: number | null;
	let isWaiting = false;
	$: lessonSlug = $page.url.pathname.split('/').pop();
	$: courseContent = data.props?.lesson;
	$: isVideo = data.props?.lesson?.lesson_type === 'video';
	$: isText = data.props?.lesson?.lesson_type === 'text';

	const initializeReadingInformation = async ({
		_lesson_id,
		_reading_time,
		_user_id,
		_course_id
	}: Omit<ReadingInformation, '_timestamp'>) => {
		trackingReadingTimeId = await analyticsProvider.storeReadingInformation({
			_lesson_id,
			_reading_time,
			_user_id,
			_course_id,
			_timestamp: new Date().toISOString(),
			synced: 0
		});
	};
	const syncPreviousReadingInformation = async () => {
		if (dev) return;
		await analyticsProvider.sendReadingInformationToServer({
			supabase: data.supabase
		});
	};
	const deleteSyncedReadingInformation = async () => {
		await analyticsProvider.deleteSyncedLocalReadingInformation();
	};

	const initiateReadingInformation = async () => {
		initiate();
		await initializeReadingInformation({
			_lesson_id: courseContent?.id,
			_reading_time: $totalTimeInSeconds,
			_user_id: userId,
			_course_id: courseId
		});
	};
	const handleCustomExplanationEvent = (event: Event) => {
		const customEvent = event as CustomEvent<string | undefined>;
		const text = customEvent.detail;
		handleExplanation(text);
	};

	onMount(() => {
		(async function () {
			await initiateReadingInformation();
			await syncPreviousReadingInformation();
			await deleteSyncedReadingInformation();
		})();
		return () => destroy();
	});
	onMount(() => {
		document.addEventListener('explainEvent', handleCustomExplanationEvent);

		return () => {
			document.removeEventListener('explainEvent', handleCustomExplanationEvent);
		};
	});
	$: if (lessonSlug && browser) {
		(async function () {
			destroy();
			await initiateReadingInformation();
		})();
	}

	// update the reading time every 10 seconds
	setInterval(() => {
		(async function () {
			await analyticsProvider.updateReadingInformation({
				trackingId: trackingReadingTimeId,
				readingInformation: {
					_lesson_id: courseContent?.id,
					_reading_time: $totalTimeInSeconds,
					_user_id: userId,
					_course_id: courseId,
					_timestamp: new Date().toISOString()
				}
			});
		})();
	}, updatingInterval);

	const handleCopyToClipBoard = () => {
		const selectedTextData = selectedText();
		isWaiting = true;
		drawerStore.close();
		if (selectedTextData) {
			navigator.clipboard.writeText(selectedTextData);
			toast.success('Copied to clipboard');
			isWaiting = false;
			hidePopup();
		}
	};

	const handleExplanation = (selectedTextData?: string) => {
		const text = selectedTextData ?? selectedText();
		const question = { subject: courseCategory, question: text ?? '' };
		input.set(JSON.stringify(question));

		const form = syntheticForm({ selectedText: text, handleSubmit });
		const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
		form.dispatchEvent(submitEvent);

		drawerStore.open(explainMenu);
	};

	const handlePopupButtonClick = (name: string) => {
		if (name === 'Copy') handleCopyToClipBoard();
		if (name === 'Explain') handleExplanation();
	};
</script>

{#if $drawerStore.id === 'explainMenu'}
	<Drawer class="m-auto">
		<div class="prose prose-lg prose-invert mx-auto my-6 max-w-7xl">
			{#if $isLoading}
				<h2>Thinking <i class="emoji-thinking-face rotate" /></h2>
				<Skeleton placeholderCount={3} length={3} />
			{:else if $error}
				<aside class="alert variant-soft-warning">
					<div><iconify-icon icon="material-symbols:warning-outline" width="35" /></div>
					<div class="alert-message">
						<h3 class="h3 mt-0">Something went wrong</h3>
						<p>
							{destr($error)?.message || $error?.message || $error || 'Please try again later'}
						</p>
					</div>
				</aside>
			{:else}
				<div>
					{#await processContent($completion)}
						<h2>Loading <i class="emoji-writing-hand rotate"></i></h2>
						<Skeleton placeholderCount={3} length={3} />
					{:then data}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<div class="p-5">{@html data.value}</div>
					{:catch error}
						<aside class="alert variant-filled-warning">
							<div><iconify-icon icon="material-symbols:warning-outline" width="35" /></div>
							<div class="alert-message">
								<h3 class="h3">Something went wrong</h3>
								<p>{error.message ?? 'Please try again later'}</p>
							</div>
						</aside>
					{/await}
				</div>
			{/if}
		</div>
	</Drawer>
{/if}

{#if $drawerStore.id === 'tableOfContentMenu'}
	<Drawer class="m-auto">
		<TableOfContents class="p-10" />
	</Drawer>
{/if}

{#each tooltipContents as tooltipContent}
	<div class="card variant-filled-tertiary z-10 px-3 py-1" data-popup={tooltipContent.name}>
		<p>{tooltipContent.name}</p>
		<div class="variant-filled-tertiary arrow" />
	</div>
{/each}

{#if isWaiting}
	<ProgressBar value={undefined} height="h-1" class="fixed top-0 z-50 " />
{/if}

{#if isVideo}
	<video controls>
		<source src={courseContent?.lesson_content} type="video/mp4" />
		<track kind="captions" src={''} srclang="en" label="English Captions" default />
	</video>
{/if}

{#if isText}
	<div class="relative overflow-hidden">
		<TableOfContents
			class="card fixed z-10 hidden max-w-xs p-10 transition-all duration-300 md:variant-ghost-surface hover:opacity-100 md:-right-28 md:top-20 md:block md:opacity-10 hover:md:right-10"
		/>

		<div
			class="prose prose-invert mx-auto px-4 py-6 lg:prose-2xl"
			id="content-container"
			use:customTooltip={{ tooltip: createTooltip({ tooltipContents, handlePopupButtonClick }) }}
			use:tocCrawler={{ key: $page.url, mode: 'generate' }}
		>
			<h1>{courseContent?.lesson_title}</h1>

			{#await processContent(courseContent?.lesson_content) then lessonContentData}
				<div>
					<!--  eslint-disable-next-line svelte/no-at-html-tags -->
					{@html lessonContentData.value}
				</div>
			{/await}
		</div>
	</div>
{/if}

<style>
	@keyframes rotate {
		0% {
			transform: perspective(600px) rotateY(0deg);
		}
		100% {
			transform: perspective(600px) rotateY(1turn);
		}
	}

	.rotate {
		animation: rotate 2s linear infinite;
	}
</style>
