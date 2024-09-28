import CourseServices from '$lib/services/course/data-provider';

export const load = async ({ locals }) => {
	const supabase = locals.supabase;
	const userId = locals.userInformation?.id;
	const courseProvider = new CourseServices(supabase);

	const { data: enrolledCourses } = await courseProvider.getEnrolledCourses(userId);
	return {
		enrolledCourses: enrolledCourses
	};
};
