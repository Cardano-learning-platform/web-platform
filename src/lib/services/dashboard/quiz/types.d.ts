import type { Database } from '$lib/database.types';
export type chapters = Database['public']['Tables']['chapters']['Row'];
export type Courses = Database['public']['Tables']['courses']['Row'];
export type Lessons = Database['public']['Tables']['lessons']['Row'];
export type QuizAccuracy = Database['public']['Tables']['quiz_performances']['Row'];
export type Quiz = Database['public']['Tables']['quizzes']['Row'];

type HttpError_1 = object;

export type getCourseWithQuizParams = Courses & {
	chapters: chapters &
	{
		lessons: Lessons &
		{
			quizzes: Quiz[];
		}[];
	}[];
	quizzes: Partial<Quiz>[];
};

export type QuizInformationParams = Partial<QuizAccuracy> & {
	quiz: Partial<Quiz>[] | undefined;
	user: { profile_id: number }[];
};
