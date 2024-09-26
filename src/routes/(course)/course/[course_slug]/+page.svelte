<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { queryParam } from 'sveltekit-search-params';

	import { page } from '$app/stores';

	export let data;
	const session = data.session;
	let course = data.props.course;
	let courseChapters = data.props.courseChapters;
	const isEnrolled = data.props.enrollmentStatus;
	const errorMessage = queryParam('message');
	const isError = queryParam('error');
	const quizAmount = (courseChapters?.length ?? 0) * 4 * 30;
	const baseUrl = $page.url.href;

	$: {
		if ($isError) {
			toast.error($errorMessage ?? '');
			setTimeout(() => {
				errorMessage.set(null);
				isError.set(null);
			}, 5000);
		}
	}

	const disenroll = async () => {
		const res = await fetch(`/api/unenroll_course?courseId=${course?.id}`);
		const data = await res.json();
		toast.success(data.message);
		setTimeout(() => {
			location.reload();
		}, 2000);
	};
</script>

<header class="variant-glass-tertiary p-4">
	<div class="container mx-auto">
		<h1 class="text-2xl">{course?.course_name}</h1>
	</div>
</header>
<main class="container mx-auto mt-8 p-4">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div class="md:col-span-2">
			<div class="card variant-form-material h-full rounded-lg p-6">
				<h2 class="mb-2 text-xl font-semibold">Course Overview</h2>
				<p class="">
					{course?.description}
				</p>
			</div>
		</div>
		<div>
			<div class="card variant-form-material rounded-lg p-6">
				<h2 class="mb-2 text-xl font-semibold">Course Details</h2>
				<dl class="list-dl">
					<div>
						<span class="badge">
							<iconify-icon
								icon="ph:dot-duotone"
								style="color: white;"
								width="25"
								height="25"
								class="variant-ghost-surface animate-pulse rounded-full"
							/>
						</span>
						<span class="flex-auto">
							<dt>Enrollments</dt>
							<dd>{data.props.enrolledStudentsCount}</dd>
						</span>
					</div>
					<div>
						<span class="badge">
							<iconify-icon
								icon="ph:dot-duotone"
								style="color: white;"
								width="25"
								height="25"
								class="variant-ghost-surface animate-pulse rounded-full"
							/>
						</span>
						<span class="flex-auto">
							<dt>Chapters</dt>
							<dd>{courseChapters?.length}</dd>
						</span>
					</div>
					<div>
						<span class="badge">
							<iconify-icon
								icon="ph:dot-duotone"
								style="color: white;"
								width="25"
								height="25"
								class="variant-ghost-surface animate-pulse rounded-full"
							/>
						</span>
						<span class="flex-auto">
							<dt>Quizzes</dt>
							<dd>{quizAmount}+</dd>
						</span>
					</div>
					{#if isEnrolled}
						<div class="flex">
							<a
								href={`/learn/${course?.slug}`}
								class="variant-ghost-primary btn card-hover w-full"
							>
								Go to course
							</a>
							<button on:click={disenroll} class="variant-soft-warning btn">Disenroll</button>
						</div>
					{:else if !session}
						<a
							href={`/auth/login?redirectTo=/course/${course?.slug}`}
							class="variant-ghost-primary btn card-hover w-full"
						>
							Enroll
						</a>
					{:else}
						<a
							href={`/enroll_course?courseId=${course?.id}`}
							class="variant-ghost-primary btn card-hover w-full"
						>
							Enroll
						</a>
					{/if}
				</dl>
			</div>
		</div>
	</div>

	<div class="card variant-form-material mt-4 rounded-lg p-4 md:p-6">
		<h2 class="mb-2 text-xl font-semibold">Chapters</h2>
		<dl class="list-dl">
			{#if courseChapters?.length === 0 || !courseChapters}
				<div>No chapters found</div>
			{:else}
				{#each courseChapters as { chapters }}
					<div>
						<span class="badge hidden md:block">
							<iconify-icon
								icon="ph:dot-duotone"
								style="color: white;"
								width="25"
								height="25"
								class="variant-ghost-surface animate-pulse rounded-full"
							/>
						</span>
						<span class="flex-auto">
							<dt class="mb-2 md:mb-0">{chapters?.chapter_name}</dt>
							<dd class="text-sm font-extralight">{chapters?.chapter_description}</dd>
						</span>
					</div>
				{/each}
			{/if}
		</dl>
	</div>

	<div class=" mt-4 rounded-lg p-6 shadow-lg">
		<h2 class="mb-2 text-xl font-semibold">Share this course</h2>
		<div class="flex items-center">
			<div class="mb-4 flex flex-grow flex-wrap items-center justify-start gap-4">
				<a
					href="https://facebook.com/sharer/sharer.php?u={baseUrl}"
					target="_blank"
					class="card variant-outline-primary flex w-36 cursor-pointer flex-col p-2 transition duration-300 hover:variant-outline-secondary"
				>
					<div class=" flex items-center justify-center">
						<iconify-icon icon="line-md:facebook" style="color: white;" width="35" height="35" />
					</div>
					<p class="text-center">Facebook</p>
				</a>
				<a
					href="https://twitter.com/intent/tweet/?text={baseUrl}"
					target="_blank"
					class="card variant-outline-primary flex w-36 cursor-pointer flex-col p-2 transition duration-300 hover:variant-outline-secondary"
				>
					<div class=" flex items-center justify-center">
						<iconify-icon icon="line-md:twitter" style="color: white;" width="35" height="35" />
					</div>
					<p class="text-center">Twitter</p>
				</a>
				<a
					href="https://t.me/share/url?url={baseUrl}&text={course?.course_name}
				"
				>
					<div
						class="card variant-outline-primary flex w-36 cursor-pointer flex-col p-2 transition duration-300 hover:variant-outline-secondary"
					>
						<div class=" flex items-center justify-center">
							<iconify-icon icon="line-md:telegram" style="color: white;" width="35" height="35" />
						</div>
						<p class="text-center">Telegram</p>
					</div>
				</a>
				<a
					href="https://www.linkedin.com/sharing/share-offsite/?url={baseUrl}"
					target="_blank"
					class="card variant-outline-primary flex w-36 cursor-pointer flex-col p-2 transition duration-300 hover:variant-outline-secondary"
				>
					<div class=" flex items-center justify-center">
						<iconify-icon icon="line-md:linkedin" style="color: white;" width="35" height="35" />
					</div>
					<p class="text-center">Linkedin</p>
				</a>
				<div
					class="card variant-outline-primary flex w-36 cursor-pointer flex-col p-2 transition duration-300 hover:variant-outline-secondary"
				>
					<div class=" flex items-center justify-center">
						<iconify-icon icon="solar:copy-linear" style="color: white;" width="35" height="35" />
					</div>
					<p class="text-center">Copy link</p>
				</div>
			</div>
		</div>
	</div>
</main>
