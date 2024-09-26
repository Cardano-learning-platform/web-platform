import { error } from '@sveltejs/kit';

import CourseProvider from '$lib/services/course/data-provider';

export const load = async ({ params, locals: { supabase, userInformation } }) => {
	const slugOrId = params.course_slug;
	const userId = userInformation?.id;
	const isSlug = Number.isNaN(Number(slugOrId));

	const courseProvider = new CourseProvider(supabase);

	const courseData = await courseProvider.getCourseBySlugOrId(
		isSlug ? { course_slug: slugOrId } : { course_id: Number(slugOrId) }
	);

	if (courseData.error) error(400, 'Unable to get course ');
	const courseChapterData = await courseProvider.getCourseChapters(courseData.data?.id);

	if (courseChapterData.error) error(400, 'Unable to get course chapters');

	const getEnrollmentStatus = await courseProvider.getEnrollmentStatus({
		courseId: courseData.data?.id,
		userId
	});
	const getEnrolledStudentsCount = await courseProvider.getEnrolledStudentsCount(
		courseData.data?.id
	);
	const enrolledStudentsCount = getEnrolledStudentsCount.data || 0;

	return {
		props: {
			course: courseData.data,
			courseChapters: courseChapterData.data,
			enrollmentStatus: getEnrollmentStatus.data,
			enrolledStudentsCount: enrolledStudentsCount
		}
	};
};
