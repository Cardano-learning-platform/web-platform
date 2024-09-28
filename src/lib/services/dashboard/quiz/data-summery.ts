import type { QuizInformationParams, getCourseWithQuizParams, HttpError_1 } from './types';

class quizSummeryGenerator {
	getAccuracy(data: HttpError_1 | QuizInformationParams | undefined) {
		if (typeof data === 'undefined' || !Array.isArray(data)) return 0;

		let total = 0;
		data.forEach((item) => {
			total += item?.score ?? 0;
		});
		return total / data.length;
	}

	getRandomQuiz(courses: HttpError_1 | getCourseWithQuizParams[] | undefined) {
		if (typeof courses === 'undefined' || !Array.isArray(courses)) return null;

		const quizzes = courses?.flatMap(course =>
			course.course.chapters.flatMap(chapter =>
				chapter.chapters.lessons.flatMap(lesson =>
					lesson.lessons.quizzes.flatMap(quiz => quiz.quizzes)
				)
			)
		);
		if (quizzes.length === 0) {
			return null;
		}
		const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

		return randomQuiz
	}

	getAverageTime(data: HttpError_1 | QuizInformationParams | undefined) {
		if (typeof data === 'undefined' || !Array.isArray(data)) return 0;
		let total = 0;
		data.forEach((item) => {
			total += item?.quiz_time_taken ?? 0;
		});
		return total / data.length;
	}
}
export default quizSummeryGenerator;
