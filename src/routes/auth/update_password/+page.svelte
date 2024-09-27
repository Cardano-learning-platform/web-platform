<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	import updatePasswordSchema from '$lib/schema/updatePassword';
	import { Spinner } from '$lib/UI/components/Spinner';

	export let data;
	const toastStore = getToastStore();

	const { form, errors, enhance, constraints, delayed } = superForm(data.form, {
		autoFocusOnError: true,
		validators: updatePasswordSchema,
		onUpdated({ form }) {
			if (form.message) {
				toastStore.trigger({
					message: form.message.text,
					background:
						form.message.status === 'success' ? 'variant-filled-success' : 'variant-filled-warning'
				});
				form.message.status === 'success' &&
					setTimeout(() => {
						location.href = '/';
					}, 2000);
			}
		}
	});
</script>

<div class="hero min-h-16 m-auto mt-10 max-w-lg">
	<div class="hero-content flex-col p-2 lg:flex-col">
		<div class="bg-base-100 card variant-ghost-surface w-full flex-shrink-0 p-5 shadow-2xl">
			<div class="card-body">
				<form class="form-control" action="" method="post" use:enhance>
					<p class="text-center text-xl">Type in your new password</p>
					<div class="form-control">
						<label class="label my-2" for="password">
							<span class="label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="password"
							name="password"
							class="input-bordered input"
							required
							bind:value={$form.password}
							{...$constraints.password}
						/>
						{#if $errors.password}
							<small class="variant-filled-error badge mt-2">{$errors.password}</small>
						{/if}
					</div>
					<div class="mt-4 flex gap-4">
						<button
							class="variant-filled-primary btn w-full"
							type="submit"
							name="updatePassword"
							disabled={$delayed}
							aria-busy={$delayed}
						>
							{#if $delayed}
								<Spinner />
							{/if}

							Change password
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div class="min-h-[30vh]" />
