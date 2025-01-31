<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	import forgotPasswordSchema from '$lib/schema/forgetPassword';
	// import { Spinner } from '$lib/ui/components/Spinner';

	export let data;
	const toastStore = getToastStore();

	const { form, errors, enhance, constraints, delayed } = superForm(data.form, {
		autoFocusOnError: true,
		validators: forgotPasswordSchema,
		onUpdated({ form }) {
			if (form.message) {
				toastStore.trigger({
					message: form.message.text,
					background:
						form.message.status == 'success' ? 'variant-filled-success' : 'variant-filled-warning'
				});
				form.message.status === 'success' &&
					setTimeout(() => {
						location.href = '/auth/login';
					}, 2000);
			}
		}
	});
</script>

<div class="hero min-h-16 m-auto mt-10 max-w-lg">
	<div class="hero-content flex-col p-2 lg:flex-col">
		<div class="bg-base-100 card variant-ghost-surface w-full flex-shrink-0 p-5 shadow-2xl">
			<div class="card-body">
				<form class="form-control my-5" action="" method="post" use:enhance>
					<p class="text-center text-xl">Forgot password?</p>
					<div class="form-control">
						<label class="label my-2" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							type="email"
							placeholder="email"
							name="email"
							class="input-bordered input"
							bind:value={$form.email}
							{...$constraints.email}
						/>
						{#if $errors.email}
							<small class="variant-filled-error badge mt-2">{$errors.email}</small>
						{/if}
					</div>
					<div class="mt-6 flex gap-4">
						<button class="variant-filled-primary btn w-full" type="submit" name="login">
							{#if $delayed}
								loading
							{/if}
							Reset password
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div class="min-h-[30vh]" />
