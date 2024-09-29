<script lang="ts">
	import { Drawer } from 'vaul-svelte';

	export let isAvatarBuilderOpen = false;
</script>

<div data-vaul-drawer-wrapper class="z-[40000]">
	<Drawer.Root
		direction="bottom"
		bind:open={isAvatarBuilderOpen}
		onOutsideClick={() => (isAvatarBuilderOpen = false)}
	>
		<Drawer.Portal class="z-[40000]">
			<Drawer.Overlay class="fixed inset-0 " />
			<Drawer.Content
				class="variant-glass-surface fixed bottom-0 left-0 right-0 z-50 mt-24  flex h-[50%] flex-col rounded-t-[10px]"
			>
				<div class="variant-glass-primary flex-1 overflow-auto rounded-t-[10px] p-4">
					<div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
					<slot />
				</div>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
</div>
