<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { Field, Control, Label, FieldErrors } from 'formsnap';
	import { avatarGenerator } from 'svelte-faces';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import editProfileSchema from '$lib/schema/editProfile';
	import { Spinner } from '$lib/ui/components/Spinner';
	import AvatarBuilder from './AvatarBuilder.svelte';

	export let data;
	const toastStore = getToastStore();
	let usePreviousImage = true;
	let avatarContainer: HTMLElement | null = null;

	const form = superForm(data.form, {
		validators: zodClient(editProfileSchema),

		async onSubmit({ formData }) {
			if (!usePreviousImage && avatarContainer) {
				const png = await avatarGenerator.getPng({
					element: avatarContainer,
					width: 150,
					height: 175
				});
				const data = await fetch('/api/update_profile', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ png })
				});
				const response = await data.json();
				formData.append('avatar_url', response.url);
			}
		},
		onUpdated({ form }) {
			if (form.message) {
				toastStore.trigger({
					message: form.message.text,
					background:
						form.message.status == 'success' ? 'variant-filled-success' : 'variant-filled-warning'
				});
			}
		}
	});
	const { form: formData, enhance, delayed, errors } = form;
	let previewImage = $formData.avatar_url;
</script>

<form class="card variant-ghost-surface m-auto mt-4 max-w-3xl p-4" method="POST" use:enhance>
	<Field {form} name="first_name">
		<Control let:attrs>
			<Label class="label my-4">First Name</Label>
			<input {...attrs} type="text" bind:value={$formData.first_name} class="input" />
		</Control>
		{#if $errors.first_name}
			<FieldErrors class="variant-filled-warning badge mt-2" />
		{/if}
	</Field>

	<Field {form} name="last_name">
		<Control let:attrs>
			<Label class="label my-4">Last Name</Label>
			<input {...attrs} type="text" bind:value={$formData.last_name} class="input" />
		</Control>
		{#if $errors.last_name}
			<FieldErrors class="variant-filled-warning badge mt-2" />
		{/if}
	</Field>

	<AvatarBuilder bind:previewImage bind:usePreviousImage bind:avatarContainer />

	<button
		type="submit"
		disabled={$delayed}
		aria-busy={$delayed}
		class="variant-filled-primary btn mt-7 w-full"
	>
		{#if $delayed}
			<Spinner />
		{:else}
			Update Profile
		{/if}
	</button>
</form>
