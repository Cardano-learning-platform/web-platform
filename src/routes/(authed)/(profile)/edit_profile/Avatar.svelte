<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	import { Spinner } from '$lib/ui/components/Spinner';
	export let size = 10;
	export let url: string;
	export let supabase: SupabaseClient;
	let uploading = false;
	let files: FileList;
	const toastStore = getToastStore();
	export let userId: number | undefined;
	const dispatch = createEventDispatcher();

	const isImageEmpty = (image: File | null) => {
		return image?.size === 0;
	};

	const validateImage = (image: File) => {
		const errors = [];

		const TWO_MEGABYTES = 2000000;
		if (!isImageEmpty(image) && image.size > TWO_MEGABYTES) {
			errors.push('Profile picture must be less than 2MB');
		}

		const supportedImageTypes = ['image/png', 'image/jpeg', 'image/webp'];
		const imageType = image.type;

		if (!isImageEmpty(image) && !supportedImageTypes.includes(imageType)) {
			errors.push('Profile picture must be a png, jpeg or webp');
		}

		return { valid: errors.length === 0, errors };
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;
			if (!files || files.length === 0) {
				toastStore.trigger({
					message: 'You must select an image to upload.',
					background: 'variant-filled-error'
				});
				throw new Error('You must select an image to upload.');
			}
			const { valid, errors } = validateImage(files[0]);

			if (!valid) {
				throw new Error(errors[0]);
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${userId}.${fileExt}`;

			let { error } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, { upsert: true });

			if (error) {
				toastStore.trigger({
					message: error.message,
					background: 'variant-filled-error'
				});
				throw error;
			}
			url = supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				return toastStore.trigger({
					message: error.message,
					background: 'variant-filled-error'
				});
			}
		} finally {
			uploading = false;
			toastStore.trigger({
				message:
					"Your profile picture has been uploaded successfully. Don't forget to save your changes. After saving, it may take a few minutes for the changes to propagate.",
				background: 'variant-filled-secondary',
				timeout: 10000
			});
		}
	};
</script>

<div class="flex max-w-lg items-center justify-evenly">
	{#if url}
		<img
			src={url}
			alt={url ? 'Avatar' : 'No image'}
			class="avatar image rounded-full"
			style="height: {size}em; width: {size}em;"
		/>
	{:else}
		<div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />

	<div style="width: {size}em;">
		<label class="variant-ghost-primary btn m-1" for="single">
			{#if uploading}
				<Spinner /> Uploading
			{:else}
				Upload
			{/if}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
