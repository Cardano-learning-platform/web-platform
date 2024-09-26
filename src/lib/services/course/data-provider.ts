import type {
	EnrollmentStatusParams,
	Supabase,
	getCourseBySlugOrIdParams,
	EnrollStudent
} from './types';

class DataProvider {
	supabase: Supabase;
	constructor(supabase: Supabase) {
		this.supabase = supabase;
	}
	getAllCourses = async () => {
		try {
			const { data: courses, error: courseError } = await this.supabase.from('courses').select(
				`
				id,
				slug,
				course_name,
				price,
				course_image_url,
				description,
				category:courses_category_links(
					categories(
						category_title
					)
				)
				`
			);
			if (courseError) return { data: null, error: courseError.message };
			return { data: courses, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	getEnrollmentStatus = async ({ courseId, userId }: EnrollmentStatusParams) => {
		if (!courseId || !userId) {
			return { data: null, error: 'getEnrollmentStatus(): courseId and userId are required' };
		}
		try {
			const { data: EnrolledCourseIdAndProfile, error: enrollmentError } = await this.supabase
				.from('subscriptions')
				.select(
					`					
					course:subscriptions_courses_links!inner(
						course_id
					),
					profile:subscriptions_profiles_links!inner(
							profile_id
					)
				`
				)
				.eq('profile.profile_id', userId)
				.eq('course.course_id', courseId)
				.maybeSingle();
			if (enrollmentError) return { data: null, error: enrollmentError.message };
			return { data: !!EnrolledCourseIdAndProfile, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	getCourseBySlugOrId = async ({ course_id, course_slug }: getCourseBySlugOrIdParams) => {
		if (!course_id && !course_slug) {
			return { data: null, error: 'getCourseBySlugOrId(): course_id or course_slug is required' };
		}

		const courseIdOrSlug = course_id ? course_id : course_slug;
		const courseIdOrSlugKey = course_id ? 'id' : 'slug';
		try {
			const { data: course, error: courseIdError } = await this.supabase
				.from('courses')
				.select(
					`
				id,
				slug,
				course_name,
				price,
				description,
				category:courses_category_links(
					categories(
						category_title
					)
				)
				`
				)
				.eq(courseIdOrSlugKey, courseIdOrSlug)
				.single();
			if (courseIdError) return { data: null, error: courseIdError.message };
			return { data: course, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	getEnrolledCourses = async (userId: number | undefined) => {
		if (!userId) return { data: null, error: 'getEnrolledCourses(): userId is required' };
		try {
			const {
				data: enrolledCourses,
				error: enrolledError,
				count
			} = await this.supabase
				.from('subscriptions')
				.select(
					`
					course:subscriptions_courses_links!inner(
						course_id,
						courses(
							course_name,
							course_image_url,
							slug,
							price
						)
					),
					user:subscriptions_profiles_links!inner(
							profile_id
					)
				`,
					{ count: 'exact' }
				)
				.eq('user.profile_id', userId)
				.order('created_at', { ascending: false });
			if (enrolledError) {
				return { data: null, error: enrolledError.message, enrolledCoursesAmount: count };
			}

			return { data: enrolledCourses, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	enrollCourse = async ({ courseId, userId }: EnrollStudent) => {
		if (!courseId || !userId)
			return { data: null, error: 'enrollCourse(): courseId and userId are required' };
		try {
			const { data: enrollmentData, error: enrollmentError } = await this.supabase.rpc(
				'enroll_course',
				{ course_id: courseId, user_id: userId }
			);

			if (enrollmentError) return { data: null, error: enrollmentError.message };
			return { data: enrollmentData, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};

	unenrollCourse = async ({ courseId, userId }: EnrollStudent) => {
		if (!courseId || !userId)
			return { data: null, error: 'unenrollCourse(): courseId and userId are required' };

		try {
			const { data: unenrollmentData, error: unenrollmentError } = await this.supabase.rpc(
				'unenroll_course',
				{ course_id: courseId, user_id: userId }
			);

			if (unenrollmentError)
				return { data: null, error: unenrollmentError.message };

			return { data: unenrollmentData, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};


	getCourseChapters = async (courseId: number | null | undefined) => {
		if (!courseId) return { data: null, error: 'getCourseLessonChapters(): courseId is required' };

		try {
			const { data: lessonChapters, error: lessonError } = await this.supabase
				.from('chapters_course_links')
				.select(
					`
                    chapters(
                        id,
                        chapter_name,
						chapter_description,
                        slug
                    )
 		            `
				)
				.eq('course_id', courseId);
			if (lessonError) return { data: null, error: lessonError.message };
			return { data: lessonChapters, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	searchCourses = async (searchQuery: string | null) => {
		if (!searchQuery) return { data: null, error: 'searchCourses(): searchQuery is required' };

		try {
			const { data: courses, error: courseError } = await this.supabase
				.from('courses')
				.select(
					`
				id,
				slug,
				course_name,
				price,
				course_image_url,
				description,
				category:courses_category_links(
					categories(
						category_title
					)
				)`
				)
				.ilike('course_name', `%${searchQuery}%`);

			if (courseError) return { data: null, error: courseError.message };
			return { data: courses, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	getEnrolledStudentsCount = async (courseId: number | null | undefined) => {
		if (!courseId) return { data: null, error: 'getEnrolledStudents(): courseId is required' };
		try {
			const { error: enrolledError, count } = await this.supabase
				.from('subscriptions_courses_links')
				.select('', { count: 'exact', head: true })
				.eq('course_id', courseId);
			if (enrolledError) return { data: null, error: enrolledError.message };
			return { data: count, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
}
export default DataProvider;
