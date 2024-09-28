import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
type Supabase = RequestEvent['locals']['supabase'];

class DataProvider {
	supabase: Supabase;
	constructor(supabase: Supabase) {
		this.supabase = supabase;
	}

	getOneWeekOfHistory = async (userId: number | undefined) => {
		if (!userId) return error(400, "Couldn't get history");
		try {
			const DATE_OFFSET = 7;
			const subtractDays = new Date().setDate(new Date().getDate() - DATE_OFFSET);
			const isoDate = new Date(subtractDays).toISOString();

			const { data, error: historyError } = await this.supabase
				.from('lesson_histories')
				.select(
					`
					id,
					created_at,
					user:lesson_histories_profile_links!inner(
						profile_id
					),
					lesson:lesson_histories_lesson_links(
						lessons(
							lesson_title,slug,
							course:lessons_course_links(course_id)
						)
					)
				`
				)
				.eq('user.profile_id', userId)
				.gte('created_at', isoDate)
				.order('created_at', { ascending: false })
				.limit(50);
			if (historyError) return error(400, historyError.message ?? "Couldn't get history");
			return data;
		} catch (_) {
			return error(400, "Couldn't get enrolled courses");
		}
	};
	getNumberOfEnrolledCourses = async (userId: string) => {
		try {
			const { count, error: countError } = await this.supabase
				.from('subscriptions')
				.select('*', { count: 'exact' })
				.eq('user_id', userId);
			if (countError) return error(400, countError.message ?? "Couldn't get enrolled courses");

			return count;
		} catch (_) {
			return error(400, "Couldn't get enrolled courses");
		}
	};
	getTimeSpentLearning = async (userId: number | undefined) => {
		if (!userId) return error(400, "Couldn't get history");
		try {
			const { data: timeSpentLearning, error: errorTimeSpentLearning } = await this.supabase
				.from('reading_informations')
				.select(
					`
				id,
				reading_time,
				user_id:reading_informations_profile_links!inner(
					profile_id
				)
			`
				)
				.eq('user_id.profile_id', userId)
				.limit(50);
			if (errorTimeSpentLearning)
				return error(400, errorTimeSpentLearning.message ?? "Couldn't get history");
			return timeSpentLearning;
		} catch (_) {
			return error(400, "Couldn't get enrolled courses");
		}
	};
	getRecentCourses = async (userId: number | undefined) => {
		if (!userId) return error(400, "Couldn't get history");
		try {
			const { data: recentCourses, error: errorRecentCourses } = await this.supabase
				.from('lesson_histories')
				.select(
					`
				lesson:lesson_histories_lesson_links!inner(
					lessons!inner(
						lesson_title,
						slug,
						course:lessons_course_links!inner(
							courses(
								id,
								course_name
							)
						)
					)
				),
				user:lesson_histories_profile_links!inner(
					profile_id
				)				
			`
				)
				.limit(15)
				.eq('user.profile_id', userId)
				.order('created_at', { ascending: false });

			if (errorRecentCourses)
				return error(400, errorRecentCourses.message ?? "Couldn't get history");
			return recentCourses;
		} catch (err) {
			return error(400, "Couldn't get enrolled courses");
		}
	};
	getWeeklyCourses = async (userId: number | undefined) => {
		if (!userId) return error(400, "Couldn't get history");
		try {
			const { data, error: errorLessonPerWeek } = await this.supabase.rpc(
				'get_user_lessons_per_week',
				{ user_id: userId }
			);
			if (errorLessonPerWeek)
				return error(400, errorLessonPerWeek.message ?? "Couldn't get history");
			return data;
		} catch (err) {
			return error(400, "Couldn't get enrolled courses");
		}
	};
}

export default DataProvider;
