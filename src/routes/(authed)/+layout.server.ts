import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
    const session = await locals.safeGetSession();
    if (!session) {
        redirect(303, `/auth/login?redirectTo=${url.pathname}`);
    }
}
