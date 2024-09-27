import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';

import forgotPasswordSchema from '$lib/schema/forgetPassword';
import type { Actions } from './$types';

export const load = async (event) => {
	const form = await superValidate(event, forgotPasswordSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const supabase = locals.supabase;
		const formData = await request.formData();
		const form = await superValidate(formData, forgotPasswordSchema);

		if (!form.valid) return fail(400, { form });

		const { email } = form.data;

		try {
			const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${url.origin}/auth/callback?next=/auth/update_password`
			});

			if (error) {
				return message(form, {
					text: error?.message ?? 'Something went wrong',
					status: 'error'
				});
			}
			if (data) {
				return message(form, {
					text: 'Check your email for the reset link',
					status: 'success'
				});
			}
		} catch (err) {
			return message(form, {
				text: 'Something went wrong',
				status: 'error'
			});
		}
	}
} satisfies Actions;
