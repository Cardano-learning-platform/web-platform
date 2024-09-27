import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	cookies.delete('userInformation', { path: '/' });
	await locals.supabase.auth.signOut();
	redirect(303, '/');
};
