import { redirect, fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';

import updatePasswordSchema from '$lib/schema/updatePassword';
import type { Actions } from './$types';

export const load = async (event) => {
	const form = await superValidate(event, updatePasswordSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const supabase = locals.supabase;
		const formData = await request.formData();
		const form = await superValidate(formData, updatePasswordSchema);
		if (!form.valid) return fail(400, { form });

		const { password } = form.data;

		try {
			const { error } = await supabase.auth.updateUser({ password });

			if (error) {
				return message(form, {
					text: error?.message ?? 'Something went wrong',
					status: 'error'
				});
			}
		} catch (err) {
			return message(form, {
				text: 'Something went wrong',
				status: 'error'
			});
		}
		redirect(303, '/');
	}
} satisfies Actions;
