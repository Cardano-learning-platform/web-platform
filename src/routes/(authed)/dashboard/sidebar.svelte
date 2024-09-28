<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	const drawerClose = () => {
		drawerStore.close();
	};
	let currentTile = $page.url.pathname;

	$: switch ($page.url.pathname) {
		case '/dashboard/home':
			currentTile = $page.url.pathname;
			break;
		case '/dashboard/quizzes':
			currentTile = $page.url.pathname;
			break;
		case '/dashboard/courses':
			currentTile = $page.url.pathname;
			break;
		case '/dashboard/resources':
			currentTile = $page.url.pathname;
			break;
		case '/dashboard/notifications':
			currentTile = $page.url.pathname;
			break;
		default:
			break;
	}
</script>

<div class="">
	<div class="flex flex-col gap-2">
		<div class="flex h-[60px] items-center px-6">
			<a class="flex items-center gap-2 font-semibold" href="/" on:click={drawerClose}>
				<iconify-icon icon="ph:sidebar" style="color: white;"></iconify-icon>
				<span class="">Dashboard</span>
			</a>
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-1">
				<a
					class={`flex items-center gap-3 rounded-md px-3 py-2 ${
						currentTile === '/dashboard/home' ? 'variant-filled-tertiary' : ''
					}`}
					href="/dashboard/home"
					on:click={drawerClose}
				>
					<iconify-icon icon="carbon:home" style="color: white;" />
					Home
				</a>
				<a
					class={`flex items-center gap-3 rounded-lg px-3 py-2 ${
						currentTile === '/dashboard/courses' ? 'variant-filled-tertiary' : ''
					}`}
					href="/dashboard/courses"
					on:click={drawerClose}
				>
					<iconify-icon icon="carbon:course" style="color: white;" />

					Courses
				</a>
				<a
					class={`flex items-center gap-3 rounded-lg px-3 py-2 ${
						currentTile === '/dashboard/quizzes' ? 'variant-filled-tertiary' : ''
					}`}
					href="/dashboard/quizzes"
					on:click={drawerClose}
				>
					<iconify-icon icon="material-symbols:quiz-outline" style="color: white;" />
					Quizzes
				</a>
			</nav>
		</div>
	</div>
</div>
