<script lang="ts">
	import { Confetti } from 'svelte-confetti';
	import { toast } from 'svelte-sonner';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Card } from '$lib/Ui/components/Card';
	import { ResponsiveCard } from '$lib/Ui/layout';

	export let data;
	const enrolledCourses = data.enrolledCourses;
	const isSuccess = $page.url.searchParams.get('success') === 'true';
	const message = $page.url.searchParams.get('message') ?? '';
	const filteredCourse = enrolledCourses
		?.map((course) => {
			return course.course;
		})
		.flat();

	if (isSuccess) {
		const messageContent = message.split(',')[0];
		const courseId = message.split(',')[1];
		const courseName = filteredCourse?.find((course) => course.course_id === Number(courseId))
			?.courses?.course_name;
		toast.success(`${messageContent} ${courseName}`, { duration: 5000 });
		$page.url.searchParams.delete('success');
		$page.url.searchParams.delete('message');

		if (browser) window?.history.replaceState(null, '', $page.url.href);
	}
</script>

<div>
	{#if isSuccess}
		<div
			style="
	position: fixed;
	top: -50px;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	overflow: hidden;
	pointer-events: none;"
		>
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[500, 4000]}
				infinite={false}
				duration="3000"
				amount="600"
				fallDistance="100vh"
			/>
		</div>
	{/if}
	<div class="w-full overflow-auto rounded-lg p-4">
		<h1 class="mb-4 text-3xl font-bold">Enrolled Courses</h1>
		{#if !filteredCourse || (Array.isArray(filteredCourse) && filteredCourse.length === 0)}
			<div class="flex min-h-screen items-center justify-center">
				<div class="variant-ghost-tertiary rounded-lg p-8 shadow-xl">
					<div class="space-y-4 text-center">
						<h1 class="text-4xl font-bold">Oops! No courses enrolled.</h1>
						<p>Discover our wide range of courses and find your next learning opportunity.</p>
						<a
							href="/all_courses"
							class="variant-filled-primary btn inline-block transition duration-300"
						>
							Explore All Courses
						</a>
					</div>
				</div>
			</div>
		{:else}
			<ResponsiveCard>
				{#each filteredCourse as course}
					<Card
						course_image_url={course.courses?.course_image_url ?? null}
						course_name={course.courses?.course_name ?? null}
						slug={course.courses?.slug ?? null}
						description={''}
						enrolled={true}
					/>
				{/each}
			</ResponsiveCard>
			<a href="/all_courses" class="variant-ghost-secondary btn mx-auto mt-4 flex max-w-sm">
				View All Courses
			</a>
		{/if}
	</div>
</div>
