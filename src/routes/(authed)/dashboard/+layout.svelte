<script lang="ts">
	import { AppShell, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	import Sidebar from './sidebar.svelte';
	const drawerStore = getDrawerStore();

	const drawerOpen = () => {
		drawerStore.open({});
	};
</script>

<AppShell slotSidebarLeft="variant-ghost-tertiary mt-4 rounded-md hidden lg:block ">
	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>

	<button class="hidden p-5 lg:hidden" on:click={drawerOpen}>
		<iconify-icon icon="ph:sidebar" style="color: white;" width="25" />
	</button>

	<Drawer>
		<Sidebar />
	</Drawer>

	<div class="variant-ghost-surface m-4 min-h-screen rounded-md">
		<slot />
	</div>
</AppShell>
