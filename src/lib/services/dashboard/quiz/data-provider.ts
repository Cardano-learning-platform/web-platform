import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
type Supabase = RequestEvent['locals']['supabase'];

export class DataProvider {
	supabase: Supabase;
	constructor(supabase: Supabase) {
		this.supabase = supabase;
	}
	getQuizHistory = async (userId: number | undefined) => {
		if (!userId) {
			return error(400, 'id is required');
		}
		try {
			const { data, error: historyError } = await this.supabase
				.from('quiz_performances')
				.select(
					`
					id,
					quiz_time_taken,
					score,
					created_at,
					quiz:quiz_performances_quiz_links!inner(
						quizzes!inner(
							id,
							slug
						)
					),
					user:quiz_performances_profile_links!inner(
						profile_id
					)
	        `
				)
				.eq('user.profile_id', userId)
				.order('created_at', { ascending: false })
				.limit(10);
			if (historyError) return error(400, historyError.message);
			return data;
		} catch (_) {
			return error(400, 'Something went wrong');
		}
	};
	getCourseWithQuiz = async ({ userId }: { userId: number | undefined }) => {
		if (!userId) {
			return error(400, 'Something went wrong');
		}
		try {
			const { data: courses, error: courseError } = await this.supabase
				.from('subscriptions')
				.select(
					`
					course:subscriptions_courses_links
					(
						course:courses!inner(
						id,
						slug,
						course_name,
						chapters:chapters_course_links!inner(
							chapters!inner(
								id,
								chapter_name,
								lessons:lessons_chapter_links!inner(
									lessons!inner(
										id,
										slug,
										lesson_title,
										quizzes:quizzes_lesson_links!inner(
											quizzes!inner(
												id,
												slug,
												quiz_title,
												quiz_difficulty
											)
										)
									)
								)
							)
						)
					)
					),
					user:subscriptions_profiles_links!inner(
						profile_id
					)
					`
				)
				.eq('user.profile_id', userId);
			if (courseError) return error(400, courseError.message);
			const mergedCourses = courses.map((course) => course.course).flat();
			return mergedCourses;
		} catch (_) {
			return error(400, 'Something went wrong');
		}
	};
}
