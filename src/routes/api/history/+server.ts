export const GET = async ({ url, locals }) => {
	const session = await locals.safeGetSession();
	if (!session) return new Response('Unauthorized', { status: 401 });

	const content_id = url.searchParams.get('content_id');
	const supabase = locals.supabase;
	const userId = session.user?.id;
	try {
		const { error } = await supabase.from('history').insert([{ content_id, user_id: userId }]);
		if (error) {
			return new Response('failed');
		}
	} catch (error) {
		console.log(error);
		return new Response('failed');
	}
};
