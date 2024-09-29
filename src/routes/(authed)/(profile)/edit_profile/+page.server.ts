import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { message } from 'sveltekit-superforms/server';


import editProfileSchema from '$lib/schema/editProfile';
import UserService from '$lib/services/user/data-provider';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { userInformation } }) => {
	const first_name = userInformation?.first_name ?? "";
	const last_name = userInformation?.last_name;
	const avatar_url = userInformation?.avatar_url
	return {
		form: await superValidate({ first_name, last_name, avatar_url }, zod(editProfileSchema)),
	};
};

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const session = await locals.safeGetSession();
		const supabase = locals.supabase;
		const userId = session.user?.id;
		const userProvider = new UserService(supabase);
		const form = await superValidate(request, zod(editProfileSchema));

		if (!session?.user) redirect(308, '/auth/login');
		if (!form.valid) return fail(400, { form });


		// @ts-expect-error - just incase removing the ID attribute so users cant update
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id, ...dataWithoutId } = form.data;

		const updatedUserData = await userProvider.updateUserById({ userId, data: { ...dataWithoutId } });

		updatedUserData.data &&
			cookies.set('userInformation', JSON.stringify({ ...updatedUserData.data }), { path: '/' });

		if (updatedUserData.error) {
			return message(form, {
				text: updatedUserData.error ?? 'Something went wrong',
				status: 'error'
			});
		}
		if (updatedUserData.data) {
			return message(form, {
				text: 'Profile updated successfully',
				status: 'success'
			});
		}
		return { form };
	}
} satisfies Actions;
