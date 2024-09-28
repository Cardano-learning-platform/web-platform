<script lang="ts">
	import { formatDate } from '$lib/helpers/formatDate';
	type HttpError_1 = unknown;
	type quizHistory = {
		id: string;
		quiz_time_taken: number;
		score: number;
		created_at: string;
		user: { profile_id: string }[];
		quiz: { quizzes: { id: string; slug: string } }[];
	};

	export let quizHistory: quizHistory[] | HttpError_1 | null | undefined = [];
</script>

<ol class="border-l border-neutral-300">
	{#if Array.isArray(quizHistory)}
		{#each quizHistory as { created_at, quiz }}
			<li>
				<div class="flex-start flex items-center pt-3">
					<div class="variant-filled-tertiary -ml-[5px] mr-3 h-[9px] w-[9px] rounded-full" />
					<span class="variant-outline-secondary badge" data-testId="timeline-date"
						>{formatDate(created_at)}</span
					>
				</div>
				<div class="mb-6 mt-2">
					<h4 class="text-md mb-1.5 ml-4">{quiz[0].quizzes.slug}</h4>
				</div>
			</li>
		{/each}
	{/if}
</ol>
