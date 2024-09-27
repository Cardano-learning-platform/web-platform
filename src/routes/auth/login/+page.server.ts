import type { Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

const OAUTH_PROVIDERS = ['google'];

export const actions: Actions = {
	login: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: 'Provider not supported.'
				});
			}
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo: `${url.origin}/auth/callback`
				}
			});

			if (err) {
				console.log(err);
				return fail(400, {
					message: 'Something went wrong.'
				});
			}
			redirect(303, data.url);
		}
		redirect(303, '/');
	}
};
