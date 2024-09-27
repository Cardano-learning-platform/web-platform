<script lang="ts">
	import type { Provider } from '@supabase/supabase-js';

	import { enhance } from '$app/forms';
	export let data;
	const supabase = data.supabase;
	const signInWithProvider = async (provider: Provider) => {
		await supabase.auth.signInWithOAuth({
			provider: provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
	};

	const submitSocialLogin = async ({ action }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				await signInWithProvider('google');
				break;
			default:
				break;
		}
	};
</script>

<div class="hero m-auto flex h-screen items-center justify-center">
	<div class="hero-content p-2">
		<div class="bg-base-100 card variant-ghost-surface w-full flex-shrink-0 p-5 shadow-2xl">
			<div class="card-body">
				<div class="mb-10 p-3">
					<h1 class="text-center text-xl">Good to See You Again! 👋</h1>
					<p class="text-center">Keep the fun going! Log in to access your account. 🎉</p>
				</div>

				<form
					class="flex justify-center"
					action="?/login"
					method="POST"
					use:enhance={submitSocialLogin}
				>
					<button
						class="variant-ghost-primary btn flex items-center gap-5"
						type="submit"
						formaction="?/login&provider=google"
					>
						<iconify-icon icon="flat-color-icons:google" width="28" />
						<span>Sign in with google</span>
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
