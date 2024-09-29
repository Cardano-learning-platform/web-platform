<script>
	export let data;
	$: user = data.userInformation;
	const session = data.session?.user;
	import { Avatar } from '@skeletonlabs/skeleton';

	const initialName = `${user?.first_name ?? [0]} ${user?.last_name ?? [0]}`;
</script>

<div class="card variant-glass-surface m-auto mt-4 max-w-7xl p-4">
	<div class="flex justify-between">
		<div class="px-4 sm:px-0">
			<h3 class="text-base font-semibold leading-7">Personal Information</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6">
				Personal details this wont be publicly available.
			</p>
		</div>
		<Avatar
			src={user?.avatar_url ?? ''}
			initials={initialName}
			alt="Profile"
			rounded="rounded-full"
			width="w-32"
		/>
	</div>
	<div class="mt-6 border-t border-gray-100">
		<dl class="divide-y divide-gray-100">
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6">First name</dt>
				<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{user?.first_name ?? ''}</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6">last name</dt>
				<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{user?.last_name ?? ''}</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6">Email address</dt>
				<dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{session?.email}</dd>
			</div>
			<!-- <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"> -->
			<!-- <dt class="text-sm font-medium leading-6">Phone number</dt> -->
			<!-- <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{user?.phone}</dd> -->
			<!-- </div> -->

			<!-- <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"> -->
			<!-- <dt class="text-sm font-medium leading-6">Date of Birth</dt> -->
			<!-- <dd class="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"></dd> -->
			<!-- </div> -->

			<div>
				<a class="anchor m-auto" href="/edit_profile">
					<button class="variant-filled-primary btn mt-8 w-full">Edit profile</button>
				</a>
			</div>
		</dl>
	</div>
</div>
