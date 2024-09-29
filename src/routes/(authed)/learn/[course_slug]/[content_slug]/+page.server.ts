import LearnService from '$lib/services/learn/data-provider';
import type { PageServerLoad } from './$types';
export const load = (async ({ parent, locals: { supabase, userInformation } }) => {
	const parentData = await parent();
	const lessonId = parentData.props?.lesson?.id;
	const courseId = parentData.course?.id;
	const userId = userInformation?.id;
	const learnProvider = new LearnService(supabase);

	await learnProvider.sendLessonProgress({
		lessonId,
		userId,
		courseId
	});
}) satisfies PageServerLoad;
