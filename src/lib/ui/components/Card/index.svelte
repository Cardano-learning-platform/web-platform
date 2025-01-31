<script lang="ts">
	import type { Database } from '$lib/database.types';
	import { truncate } from '$lib/helpers/truncateWords';

	type Course = Database['public']['Tables']['courses']['Row'] & { enrolled: boolean };

	export let course_name: Course['course_name'];
	export let course_image_url: Course['course_image_url'];
	export let description: Course['description'];
	export let slug: Course['slug'];
	export let enrolled = false;
</script>

<div class="bg-initial card card-hover w-full max-w-md">
	<a class="overflow-hidden" href={`/course/${slug}`}>
		<header>
			<picture>
				<img
					data-testId="image"
					src={course_image_url}
					class="max-h-[300px] w-full max-w-md rounded-t-md object-cover"
					alt="{course_name},"
					width="300"
					height="300"
				/>
			</picture>
		</header>
		{#if !enrolled}
			<div class="mr-2 mt-2 flex justify-end">
				<span class="variant-filled badge ml-auto">New Curriculum</span>
			</div>
		{/if}
		<div class="space-y-4 p-4">
			<h2 class="text-2xl font-black" data-testId="name">{course_name}</h2>
			<article>
				<p data-testId="description" class="font-extralight">
					{truncate(description, 140)}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer data-testId="footer" class="flex items-center justify-start space-x-4 p-4">
			{#if enrolled}
				<a href={`/learn/${slug}`} class="variant-filled-primary btn w-full">Go to course</a>
			{:else}
				<a href={`/course/${slug}`} class="variant-filled-primary btn w-full">View More</a>
			{/if}
		</footer>
	</a>
</div>
