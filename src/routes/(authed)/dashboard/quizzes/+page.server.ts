import { DataProvider } from '$lib/services/dashboard/quiz/data-provider';
export const load = async ({ locals: { userInformation, getSession, supabase } }) => {
	const session = await getSession();
	if (!session) return new Response('Unauthorized', { status: 401 });

	const userId = userInformation?.id;
	const dataProvider = new DataProvider(supabase);

	const getQuizHistory = async () => {
		return dataProvider.getQuizHistory(userId);
	};
	const getCourseWithQuiz = async () => {
		return dataProvider.getCourseWithQuiz({ userId });
	};

	return {
		streamed: {
			quizHistory: getQuizHistory(),
			coursesWithQuiz: getCourseWithQuiz()
		}
	};
};
