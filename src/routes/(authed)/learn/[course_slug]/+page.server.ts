import { redirect } from '@sveltejs/kit';

import learnService from '$lib/services/learn/data-provider';

export const load = async ({ params, parent, url, locals: { supabase } }) => {
	const data = await parent();
	const lessonSlug = url.searchParams.get('lesson_slug');

	const learnProvider = new learnService(supabase);
	const firstChapterId = data?.chapters ? data?.chapters[0].chapters?.id : null;
	const course_slug = params.course_slug;

	if (!firstChapterId) redirect(302, `/course/${course_slug}`);
	if (lessonSlug) redirect(302, `/learn/${course_slug}/${lessonSlug}`);
	const getLessonsTitle = await learnProvider.getLessonsTitleByChapterId(firstChapterId);
	if (getLessonsTitle.error) redirect(302, `/course/${course_slug}`);

	const firstContentSlug = getLessonsTitle?.data ? getLessonsTitle?.data[0].lessons?.slug : null;
	if (!firstContentSlug) redirect(302, `/course/${course_slug}`);

	const newUrl = `/learn/${course_slug}/${firstContentSlug}`;
	redirect(302, newUrl);
};
