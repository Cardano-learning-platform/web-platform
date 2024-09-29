<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import DashboardSummaryGenerator from '$lib/services/dashboard/home/data-summery';
	// import Onboarding from '$lib/services/onboarding/data-provider';
	import { LineChart as Bar } from '$lib/ui/components/LineChart';
	import { Skeleton } from '$lib/ui/components/Skeleton';
	import { Timeline } from '$lib/ui/components/Timeline';

	export let data;
	const totalEnrolledCourses = data.totalEnrolledCourses;
	const userInformation = data.userInformation;
	const summeryGenerator = new DashboardSummaryGenerator();
	// const onboarding = new Onboarding(data.supabase);
	// const onboardingStatus = data.onboardingStatus;

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
	// 	const tour = await onboarding.initializeOnboardingProgress('dashboardTour', {
	// 		onExitTour: () => updateOnboardingStatus('dashboardTour')
	// 	});
	// 	if (tour) {
	// 		const tourData = tour();
	// 		tourData.drive();
	// 	}
	// });
</script>

<div class="p-4">
	<div class="card-header flex justify-between px-0">
		<h1 class="text-2xl">
			Welcome, {userInformation?.first_name ?? data?.session?.user.email}
			<span class="wave text-3xl">👋</span>
		</h1>
	</div>

	<div class="mt-10 justify-between gap-5 space-y-5 md:flex md:space-y-0">
		<div class="flex flex-1 flex-col gap-8">
			{#await data.streamed?.recentCourses}
				<div class="flex-1">
					<Skeleton length={1} placeholderCount={1} />
				</div>
			{:then recentCourse}
				{@const lessonsWithCourse = summeryGenerator.calculateRecentCourseLessons(recentCourse)}

				<div id="continue-where-you-left">
					<h3 class="mb-3 text-xl font-semibold">Continue where you left off</h3>
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each lessonsWithCourse as { lessons }}
							{@const course = lessons.course[0].courses}
							<div class="card variant-ghost-surface p-3">
								<p class="mb-4 text-lg font-bold">{course.course_name}</p>
								<p class="text-md">{lessons.lesson_title}</p>
								<a
									href="/learn/{course.id}/{lessons.slug}"
									class="variant-filled-primary btn card-hover mt-4 px-4 py-2"
								>
									Resume
								</a>
							</div>
						{/each}
					</div>
				</div>
			{:catch}
				<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
					<div>
						<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
					</div>
					<div class="alert-message">
						<h6 class="h6">Continue where you left off</h6>
						<p>Oops, Something Went Wrong</p>
					</div>
				</aside>
			{/await}
		</div>
	</div>

	<h1 class="my-9 text-2xl">Learning Insight</h1>
	<div>
		<div class="wrap mt-10 justify-between gap-5 space-y-5 md:flex md:flex-wrap md:space-y-0">
			<div class=" flex flex-col gap-8">
				<a href="courses" class="card variant-ghost-surface card-hover flex max-w-md gap-10 p-5">
					<iconify-icon
						icon="clarity:certificate-line"
						style="color: white;"
						width="35"
						height="35"
					/>
					<div class="">
						<p class="font-light">Total enrolled courses</p>
						<p class="text-xl font-light">{totalEnrolledCourses}</p>
					</div>
				</a>

				{#await data.streamed?.timeSpentLearning}
					<Skeleton length={1} placeholderCount={1} />
				{:then timeSpent}
					{@const averageTime = summeryGenerator.calculateAverageTime(timeSpent)}
					<div
						class="card variant-ghost-surface card-hover flex max-w-md gap-10 p-5"
						id="average-time-spent"
					>
						<iconify-icon icon="entypo:time-slot" style="color: white;" width="35" height="35" />
						<div class="">
							<p class="font-light">Average learning time</p>
							<p class="text-xl font-light">{averageTime}</p>
						</div>
					</div>
				{:catch}
					<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
						<div>
							<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
						</div>
						<div class="alert-message">
							<h6 class="h6">Average learning time</h6>
							<p>Oops, Something Went Wrong</p>
						</div>
					</aside>
				{/await}
			</div>

			{#await data.streamed?.timeline}
				<div class="flex-1">
					<Skeleton length={1} placeholderCount={6} />
				</div>
			{:then timeline}
				<div
					class="card variant-ghost-surface card-hover h-80 min-w-[300px] max-w-lg flex-1 overflow-auto p-5"
					id="learning-history-timeline"
				>
					<p>Timeline</p>
					<Timeline {timeline} />
				</div>
			{:catch}
				<aside
					class="alert card variant-ghost-warning card-hover h-80 flex-1 overflow-auto p-5"
					transition:fade|local={{ duration: 500 }}
				>
					<div>
						<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
					</div>
					<div class="alert-message">
						<h6 class="h6">Timeline</h6>
						<p>Oops, Something Went Wrong</p>
					</div>
				</aside>
			{/await}

			{#await data.streamed?.weeklyCourses}
				<div class="card variant-ghost-surface flex min-h-max max-w-2xl flex-1">
					<Skeleton length={2} placeholderCount={3} />
				</div>
			{:then weeklyCourses}
				<div
					class="card variant-ghost-surface flex min-h-max max-w-lg flex-1"
					id="weekly-learning-graph"
				>
					<Bar countCourses={weeklyCourses} />
				</div>
			{:catch}
				<aside
					class="alert card variant-ghost-warning card-hover h-80 flex-1 overflow-auto p-5"
					transition:fade|local={{ duration: 500 }}
				>
					<div>
						<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
					</div>
					<div class="alert-message">
						<h6 class="h6">Learning insight</h6>
						<p>Oops, Something Went Wrong</p>
					</div>
				</aside>
			{/await}
		</div>
	</div>
</div>

<style>
	@keyframes wave-animation {
		0% {
			transform: rotate(0deg);
		}
		10% {
			transform: rotate(14deg);
		}
		20% {
			transform: rotate(-8deg);
		}
		30% {
			transform: rotate(14deg);
		}
		40% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(10deg);
		}
		60% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.wave {
		display: inline-block;
		animation-name: wave-animation;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		transform-origin: 70% 70%;
	}
</style>
