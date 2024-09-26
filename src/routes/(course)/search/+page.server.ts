import { redirect } from '@sveltejs/kit';

import CourseService from '$lib/services/course/data-provider';

export const load = async ({ url, locals: { supabase } }) => {
	const searchQuery = url.searchParams.get('searchQuery');
	if (searchQuery) {

		const courseService = new CourseService(supabase);
		const { data: courses, error } = await courseService.searchCourses(searchQuery);
		if (error) {
			redirect(303, '/search?error=true&message=Something went wrong');
		}

		if (courses?.length === 0) {
			redirect(303, '/search?error=false&message=No courses found');
		}

		return {
			courses
		};
	}
	return {};
};
