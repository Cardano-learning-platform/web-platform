import { redirect } from '@sveltejs/kit';

import CourseProvider from '$lib/services/course/data-provider';

export const load = async ({ url, locals: { supabase, userInformation, safeGetSession } }) => {
	const courseProvider = new CourseProvider(supabase);
	const userId = userInformation?.id;
	const { session } = await safeGetSession();
	const courseId = Number(url.searchParams.get('courseId'));
	const isCourseIdValid = !Number.isNaN(courseId);

	if (!session || !isCourseIdValid) {
		return new Response(null, { status: 301, headers: { Location: `/` } });
	}

	const { data: isEnrolled, error: enrollmentStatusError } = await courseProvider.getEnrollmentStatus({
		userId,
		courseId
	});

	if (enrollmentStatusError) {
		return new Response(null, { status: 301, headers: { Location: `/course/${courseId}?error=true&message=${enrollmentStatusError}` } });
	}

	if (isEnrolled) {
		redirect(301, `/learn/${courseId}`);
	}

	const { error } = await courseProvider.enrollCourse({ userId, courseId });

	if (error) {
		redirect(301, `/course/${courseId}?error=true&message=${error}`);
	}

	redirect(301, `/dashboard/courses?success=true&message=Successfully enrolled, ${courseId}`);
};
