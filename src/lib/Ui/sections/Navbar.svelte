<script lang="ts">
	import type { LayoutData } from './$types';
	import { Avatar, ProgressBar, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { navigating, page } from '$app/stores';
	import { truncate } from '$lib/helpers/truncateWords';

	export let data: LayoutData;
	$: session = data.session;
	$: currentUrl = $page.url.pathname;
	$: userData = data.userInformation;

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom'
	};

	const handleLogout = async () => {
		await fetch('/auth/logout');
		location.reload();
	};
	$: initialFirstName = Array.isArray(userData?.first_name) ? (userData?.first_name[0] ?? '') : '';
	$: initialLastName = Array.isArray(userData?.last_name) ? (userData?.last_name[0] ?? '') : '';
	$: initialName = `${initialFirstName} ${initialLastName}`;

	let mobileMenu: HTMLDivElement;
	let mobileButton: HTMLButtonElement;
	$: mobileMenuVisible = false;

	const handleClickOutside = (event: MouseEvent) => {
		if (mobileMenuVisible && mobileMenu && !mobileButton.contains(event.target as Node)) {
			mobileMenuVisible = false;
		}
	};

	const toggleMobileMenu = () => {
		mobileMenuVisible = !mobileMenuVisible;
	};
</script>

<svelte:body on:click={handleClickOutside} />

{#if $navigating}
	<ProgressBar label="Progress Bar" class="fixed top-0 z-50" height="h-1" value={undefined} />
{/if}

<nav class="variant-glass-surface sticky top-0 z-20">
	<div class="mx-auto px-2 sm:px-6 lg:px-12">
		<div class="relative flex h-12 items-center justify-between">
			{#if session}
				<div class="flex flex-1 items-center justify-around sm:items-stretch sm:justify-start">
					<div class="flex flex-shrink-0 items-center">
						<a href="/">
							<div class=" scale-110">
								<img src="/logo.svg" class="w-full max-w-[2rem] scale-125" alt="logo" />
							</div>
						</a>
					</div>
					<div class="sm:ml-6 sm:block md:mx-auto">
						<div class="flex space-x-4">
							<a
								href="/dashboard"
								class="{currentUrl === '/dashboard/home'
									? 'variant-ghost-secondary'
									: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
								aria-current="page"
								>Dashboard
							</a>
							<a
								href="/all_courses"
								class="{currentUrl === '/all_courses'
									? 'variant-ghost-secondary'
									: ''} hidden rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary md:inline-flex"
								>All courses
							</a>
						</div>
					</div>
				</div>

				<div
					class=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
				>
					<a href="/search" type="button" class="relative hidden rounded-full p-1 md:inline-flex">
						<iconify-icon icon="ic:sharp-search" style="color: white;" width="25" height="25" />
					</a>

					<!-- Profile dropdown -->
					<div class="relative ml-3">
						<div
							class="variant-ghost-surface flex w-28 cursor-pointer items-center justify-between rounded-md p-1"
							use:popup={popupFeatured}
						>
							<button type="button" class="relative flex flex-row items-center gap-10">
								<span class="absolute -inset-1.5" />
								<span class="sr-only">Open user menu</span>
								<Avatar
									class="h-8 w-8 rounded-full"
									src={userData?.avatar_url ?? ''}
									initials={initialName}
								/>
							</button>
							<span class="badge font-light"
								>{truncate(userData?.first_name ?? data?.session?.user.email, 5)}</span
							>
							<iconify-icon
								icon="tabler:chevron-down"
								style="color: white;"
								width="25"
								height="25"
							/>
						</div>

						<div
							class="card z-50 w-48 rounded-md border border-tertiary-400 !bg-surface-700 p-4 shadow-xl"
							data-popup="popupFeatured"
						>
							<nav class="list-nav">
								<ul>
									<li>
										<a href="/profile">
											<span class="flex-auto">Profile</span>
										</a>
									</li>
									<li class="md:hidden">
										<a href="/all_courses">All courses</a>
									</li>
									<li>
										<a href="/search">Search</a>
									</li>
									<li>
										<a href="/settings">Settings</a>
									</li>
									<li>
										<button on:click={handleLogout} class="w-full">logout</button>
									</li>
								</ul>
							</nav>

							<div class="arrow border-l border-t border-tertiary-400 bg-surface-700" />
						</div>
					</div>
				</div>
			{:else}
				<div class="flex flex-1 items-center">
					<button
						bind:this={mobileButton}
						type="button"
						class="relative inline-flex items-center justify-center rounded-md p-2 md:hidden"
						on:click={toggleMobileMenu}
					>
						<span class="-inset-0.5" />
						<span class="sr-only">Open main menu</span>

						<iconify-icon
							icon="iconamoon:menu-burger-horizontal-bold"
							style="color: white;"
							width="25"
						/>
					</button>

					<div class="flex flex-shrink-0 items-center">
						<a href="/">
							<div class="w-48 scale-110 font-black">Learn Cardano</div>
						</a>
					</div>
					<div class="hidden sm:ml-6 sm:block md:mx-auto">
						<div class="flex">
							<a
								href="/all_courses"
								class="{currentUrl === '/all_courses'
									? 'variant-ghost-secondary'
									: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
								>All courses
							</a>
							<a
								href="/search"
								class="{currentUrl === '/search'
									? 'variant-ghost-secondary'
									: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
								>Search
							</a>
						</div>
					</div>
				</div>
				<div class="flex gap-6 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<a href="/auth/login" class=" variant-ghost-secondary btn btn-sm"> Login </a>
					<a href="/auth/register" class=" variant-ghost-primary btn btn-sm"> Register </a>
				</div>
			{/if}
		</div>
	</div>
	<!-- Mobile dropdown -->
	{#if session}
		<div class={mobileMenuVisible ? 'block' : 'hidden'} id="mobile-menu" bind:this={mobileMenu}>
			<div class="flex flex-col space-y-1 px-2 pb-3 pt-2">
				<a
					href="/dashboard"
					class="{currentUrl === '/dashboard/home'
						? 'variant-ghost-secondary'
						: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
					aria-current="page"
				>
					Dashboard
				</a>
				<a
					href="/all_courses"
					class="{currentUrl === '/all_courses'
						? 'variant-ghost-secondary'
						: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
					>All courses
				</a>
			</div>
		</div>
	{:else}
		<div class={mobileMenuVisible ? 'block' : 'hidden'} id="mobile-menu" bind:this={mobileMenu}>
			<div class="flex flex-col space-y-1 px-2 pb-3 pt-2">
				<a
					href="/search"
					class="{currentUrl === '/search'
						? 'variant-ghost-secondary'
						: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
					>Search
				</a>
				<a
					href="/all_courses"
					class="{currentUrl === '/all_courses'
						? 'variant-ghost-secondary'
						: ''} rounded-md px-3 py-2 text-sm font-medium transition-all hover:variant-ghost-secondary"
					>All courses
				</a>
			</div>
		</div>
	{/if}
</nav>
