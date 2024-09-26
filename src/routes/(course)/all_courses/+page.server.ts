import { error } from '@sveltejs/kit';

import CourseService from '$lib/services/course/data-provider';

export const load = async ({ locals: { supabase } }) => {
	const courseProvider = new CourseService(supabase);

	const { data: courses, error: courseError } = await courseProvider.getAllCourses();

	if (courseError) error(400, courseError);
	return { props: { courses } };
};
