<script lang="ts">
	import Carousel from '$lib/helpers/carousel.svelte';
	import { truncate } from '$lib/helpers/truncateWords';
	// @ts-ignore
	export let courses;

	let perPage = {
		400: 1,
		800: 2,
		1240: 3
	};
</script>

<div class="variant-glass-secondary relative top-[-1px] z-50 min-h-screen backdrop-blur-3xl">
	<h2 class=" py-9 text-center text-4xl font-black md:text-6xl">Featured Courses</h2>

	<Carousel autoplay={5000} {perPage}>
		<button
			class="variant-ghost-primary btn-icon btn-xl btn-icon-xl hidden rounded-full md:block"
			slot="left-control"
		>
			<iconify-icon icon="fluent:ios-arrow-left-24-filled" class="text-3xl" />
		</button>

		<button class="variant-ghost-primary btn-icon btn-icon-xl hidden md:block" slot="right-control">
			<iconify-icon icon="fluent:ios-arrow-right-24-filled" class="rounded-full text-3xl" />
		</button>

		{#each courses as card}
			<div class="container mx-auto flex w-full justify-center p-6">
				<div
					class="card variant-ghost-tertiary card-hover w-full max-w-md overflow-hidden rounded-lg shadow-lg"
				>
					<img src={card.course_image_url} class="w-full" alt=" Description" />
					<div class="p-4">
						<div class="mb-2 text-3xl font-black text-primary-100">{card.course_name}</div>
						<p class="text-base">{truncate(card.description, 100)}</p>
					</div>
					<div class="flex justify-center pb-2 pt-4">
						<button class="variant-filled-primary btn btn-lg">View Course</button>
					</div>
				</div>
			</div>
		{/each}
	</Carousel>
	<a
		href="/all_courses"
		class="variant-ghost-tertiary btn btn-lg mx-auto mt-10 flex max-w-sm animate-bounce"
	>
		Browse all courses
	</a>
</div>
