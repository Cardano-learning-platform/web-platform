import { redirect } from '@sveltejs/kit';

import CourseService from '$lib/services/course/data-provider';

export const load = async ({ locals, params }) => {
	const { course_slug: slugOrId } = params;
	const userId = locals.userInformation?.id;
	const courseProvider = new CourseService(locals.supabase);
	const isSlug = Number.isNaN(Number(slugOrId));

	const getCourseBySlug = await courseProvider.getCourseBySlugOrId(
		isSlug ? { course_slug: slugOrId } : { course_id: Number(slugOrId) }
	);

	if (getCourseBySlug.error) {
		redirect(302, `/course/${slugOrId}?error=true&message=Unable to get course`);
	}

	const getEnrollmentStatus = await courseProvider.getEnrollmentStatus({
		courseId: getCourseBySlug.data?.id,
		userId
	});

	if (getEnrollmentStatus.error) {
		redirect(302, `/course/${slugOrId}?error=true&message=You are not enrolled`);
	}

	const getCourseChapters = await courseProvider.getCourseChapters(getCourseBySlug.data?.id);

	if (getCourseChapters.error) {
		redirect(302, `/course/${slugOrId}?error=true&message=Unable to get course chapters`);
	}

	return { chapters: getCourseChapters.data, course: getCourseBySlug.data };
};
