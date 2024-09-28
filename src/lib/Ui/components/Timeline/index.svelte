<script lang="ts">
	import { formatDate } from '$lib/helpers/formatDate';
	type HttpError_1 = unknown;
	interface recentTimeline {
		id: number;
		created_at: string;
		user: { profile_id: number }[];
		lesson: {
			lessons: {
				lesson_title: string;
				slug: string;
				course: { course_id: number }[];
			};
		}[];
	}
	[];

	export let timeline: recentTimeline[] | HttpError_1 | undefined = [];
</script>

<ol class="border-l border-neutral-300" data-testId="content-container">
	{#if !timeline}
		<p>Nothing to see here</p>
	{:else if Array.isArray(timeline) && timeline.length !== 0}
		{#each timeline as { created_at, lesson }}
			{#each lesson as { lessons }}
				{@const courseId = lessons.course[0].course_id}
				{@const slug = lessons.slug}
				{@const lesson_title = lessons.lesson_title}
				<li>
					<div class="flex-start flex items-center pt-3">
						<div class="variant-filled-tertiary -ml-[5px] mr-3 h-[9px] w-[9px] rounded-full" />
						<span class="variant-outline-secondary badge" data-testId="timeline-date"
							>{formatDate(created_at)}</span
						>
					</div>
					<a href={`/learn/${courseId}/${slug}`} class="mb-6 mt-2" data-testId="content-link">
						<h4 class="text-md mb-1.5 ml-4" data-testId="content-title">
							{lesson_title}
						</h4>
					</a>
				</li>
			{/each}
		{/each}
	{/if}
</ol>
