<script lang="ts">
	import { TreeView, TreeViewItem, ProgressRadial } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import { queryParam } from 'sveltekit-search-params';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { displayTime } from '$lib/helpers/formatDate.js';
	import QuizSummeryGenerator from '$lib/services/dashboard/quiz/data-summery';
	import Skeleton from '$lib/UI/components/Skeleton/index.svelte';
	import Timeline from '$lib/UI/components/Timeline/quiz.svelte';

	export let data;
	const summeryGenerator = new QuizSummeryGenerator();
	type PromiseQuizData = typeof data.streamed;
	type HttpError_1 = object;
	type QuizData = Awaited<PromiseQuizData> | HttpError_1 | undefined;

	const isError = queryParam('error');
	const errorMessage = queryParam('message');

	$: {
		if ($isError) {
			toast.error($errorMessage ?? '');
			errorMessage.set(null);
			isError.set(null);
			if (browser) window?.history.replaceState(null, '', $page.url.href);
		}
	}

	const handleRandomQuiz = (courseWithQuizData: QuizData) => {
		const randomQuiz = summeryGenerator.getRandomQuiz(courseWithQuizData);
		if (randomQuiz?.slug) {
			goto(
				`/quiz/${randomQuiz.slug}?difficulty=${randomQuiz.quiz_difficulty}&redirectTo=${$page.url.pathname}`
			);
		}
	};
</script>

<div class="w-full overflow-auto rounded-lg p-4">
	<div class="mt-10 justify-between gap-5 space-y-5 md:flex md:space-y-0">
		<div class="flex flex-1 flex-col gap-8">
			{#await data.streamed?.coursesWithQuiz}
				<Skeleton length={1} placeholderCount={1} />
			{:then quiz}
				<button
					on:click={() => handleRandomQuiz(quiz)}
					class="card variant-ringed-surface card-hover flex cursor-pointer gap-10 p-5"
				>
					<iconify-icon icon="fad:arprandom" style="color: white;" width="35" height="35" />
					<div class="">
						<p class="text-center text-xl font-extralight">Get Random quiz</p>
					</div>
				</button>
			{:catch}
				<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
					<div>
						<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
					</div>
					<div class="alert-message">
						<h6 class="h6">Random Quiz</h6>
						<p>Oops, Something Went Wrong</p>
					</div>
				</aside>
			{/await}

			{#await data.streamed?.quizHistory}
				<Skeleton length={1} placeholderCount={1} />
			{:then quiz}
				{@const quizAverageTime = displayTime(summeryGenerator.getAverageTime(quiz))}
				<div class="card variant-ringed-surface card-hover flex cursor-pointer gap-10 p-5">
					<iconify-icon icon="entypo:time-slot" style="color: white;" width="35" height="35" />
					<div class="">
						<p class="text-center text-xl font-extralight">Average Time</p>
						<p class="text-xl font-light">{quizAverageTime}</p>
					</div>
				</div>
			{:catch}
				<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
					<div>
						<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
					</div>
					<div class="alert-message">
						<h6 class="h6">Average Time</h6>
						<p>Oops, Something Went Wrong</p>
					</div>
				</aside>
			{/await}
		</div>

		{#await data.streamed?.quizHistory}
			<div class="flex-1">
				<Skeleton length={1} placeholderCount={6} />
			</div>
		{:then quiz}
			{@const quizAccuracy = Number(summeryGenerator.getAccuracy(quiz)?.toFixed(2))}
			<div class="h-82 card variant-ringed-surface card-hover flex-1 overflow-auto p-5">
				<div class="card-heading">
					<p class="text-center text-xl font-extralight">Average accuracy</p>
					<div class="mt-5 flex justify-center">
						<ProgressRadial
							width="w-44"
							font={56}
							stroke={120}
							class="rounded-md"
							meter="stroke-tertiary-500/100"
							value={quizAccuracy}>{quizAccuracy}%</ProgressRadial
						>
					</div>
				</div>
			</div>
		{:catch}
			<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
				<div>
					<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
				</div>
				<div class="alert-message">
					<h6 class="h6">Quiz Accuracy</h6>
					<p>Oops, Something Went Wrong</p>
				</div>
			</aside>
		{/await}

		{#await data.streamed?.quizHistory}
			<div class="flex-1">
				<Skeleton length={1} placeholderCount={6} />
			</div>
		{:then quiz}
			<div class="card variant-ringed-surface card-hover h-80 flex-1 overflow-auto p-5">
				<p class="text-center text-xl font-extralight">Recent activity</p>
				<Timeline quizHistory={quiz} />
			</div>
		{:catch}
			<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
				<div>
					<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
				</div>
				<div class="alert-message">
					<h6 class="h6">Recent activity</h6>
					<p>Oops, Something Went Wrong</p>
				</div>
			</aside>
		{/await}
	</div>
	<h1 class="mt-12 text-center text-xl font-extralight">All quizzes</h1>
	{#await data.streamed?.coursesWithQuiz}
		<Skeleton length={2} placeholderCount={4} />
	{:then courseWithQuiz}
		<div class="m-3 h-[80vh]">
			<div>
				{#if !courseWithQuiz || (Array.isArray(courseWithQuiz) && courseWithQuiz.length === 0)}
					<p>No enrolled course found</p>
				{:else if Array.isArray(courseWithQuiz)}
					{#each courseWithQuiz as data}
						<TreeView>
							<TreeViewItem>
								{data?.course?.course_name}
								<svelte:fragment slot="children">
									{#if data?.course?.chapters}
										{#each data.course.chapters as chapter}
											<TreeViewItem>
												{chapter?.chapters?.chapter_name}
												<svelte:fragment slot="children">
													{#if chapter}
														{@const lessons = chapter.chapters?.lessons}
														{#if lessons}
															{#each lessons as lesson}
																<TreeViewItem>
																	{lesson?.lessons?.lesson_title}
																	<svelte:fragment slot="children">
																		{@const quizzes = lesson?.lessons?.quizzes}
																		{#if quizzes}
																			{#each quizzes as quiz}
																				<a
																					href={`/quiz/${quiz.quizzes?.id}?difficulty=${quiz.quizzes?.quiz_difficulty}`}
																				>
																					<TreeViewItem>
																						{quiz.quizzes?.quiz_title}
																					</TreeViewItem>
																				</a>
																			{/each}
																		{/if}
																	</svelte:fragment>
																</TreeViewItem>
															{/each}
														{/if}
													{/if}
												</svelte:fragment>
											</TreeViewItem>
										{/each}
									{:else}
										<p class="text-center">No quiz found</p>
									{/if}
								</svelte:fragment>
							</TreeViewItem>
						</TreeView>
					{/each}
				{:else}
					<p>Something went wrong</p>
				{/if}
			</div>
		</div>
	{:catch}
		<aside class="alert variant-ghost-warning" transition:fade|local={{ duration: 500 }}>
			<div>
				<iconify-icon icon="formkit:sad" style="color: white;" width="35" height="35" />
			</div>
			<div class="alert-message">
				<p>Oops, Something Went Wrong</p>
			</div>
		</aside>
	{/await}
</div>
