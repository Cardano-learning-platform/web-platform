import type {
	getLessonContents,
	Supabase,
	sendLessonProgress
} from './types';

class DataProvider {
	supabase: Supabase;
	constructor(supabase: Supabase) {
		this.supabase = supabase;
	}
	getLessonContents = async ({ lessonId, lessonSlug }: getLessonContents) => {
		if (!lessonId && !lessonSlug)
			return { data: null, error: 'getLessonContents(): lessonId or lessonSlug is required' };
		const lessonIdOrSlug = lessonId ? lessonId : lessonSlug;
		const lessonIdOrSlugKey = lessonId ? 'id' : 'slug';
		try {
			const { data: lessonData, error: lessonError } = await this.supabase
				.from('lessons')
				.select(
					`
					id,
					lesson_title,
					lesson_content,
					slug,
					lesson_type,
					initial_code
					`
				)
				.eq(lessonIdOrSlugKey, lessonIdOrSlug)
				.single();
			if (lessonError) return { data: null, error: lessonError };

			return { data: lessonData, error: lessonError };
		} catch (error) {

			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	getCurrentChapterIdByLessonId = async (lessonId: number | undefined) => {
		if (!lessonId) return { data: null, error: 'getPreviousAndNextLesson(): lessonId are required' };
		try {
			const { data: lessonData, error: lessonError } = await this.supabase
				.from('lessons_chapter_links')
				.select(
					`
					chapter_id,
                    lessons!inner(
                        id,
                        lesson_title,
                        slug
                    )
 		            `
				)
				.eq('lessons.id', lessonId)
				.single();

			if (lessonError) return { data: null, error: lessonError.message };
			return { data: lessonData, error: null };

		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	}
	getPreviousAndNextLesson = async ({ lessonId }: { lessonId: number | undefined }) => {
		if (!lessonId) return { data: null, error: 'getPreviousAndNextLesson(): lessonId is required' };

		const { data: currentChapterId, error: currentChapterError } = await this.getCurrentChapterIdByLessonId(lessonId);
		if (currentChapterError) return { data: null, error: currentChapterError };

		const chapterId = currentChapterId?.chapter_id;
		if (!chapterId) return { data: null, error: 'getPreviousAndNextLesson(): chapterId is required' };

		try {
			const { data: previousAndNextLesson, error: lessonError } = await this.supabase
				.from('lessons_chapter_links')
				.select(
					`
					chapter_id,
					lessons(
						id,
						lesson_title,
						slug
					)
 		            `
				)
				.eq('chapter_id', chapterId);

			if (lessonError) return { data: null, error: lessonError.message };
			const lessonIndex = previousAndNextLesson.findIndex((lesson) => lesson?.lessons?.id === lessonId);
			const previousLesson = previousAndNextLesson[lessonIndex - 1];
			const nextLesson = previousAndNextLesson[lessonIndex + 1];

			const previousAndNextLessonData = {
				previousLesson: previousLesson?.lessons,
				nextLesson: nextLesson?.lessons
			};
			return { data: previousAndNextLessonData, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	}
	getLessonsTitleByChapterId = async (chapterId: number | null | undefined) => {
		if (!chapterId)
			return { data: null, error: 'getLessonContentsByChapterId(): chapterId is required' };

		try {
			const { data: lessonTitles, error: lessonError } = await this.supabase
				.from('lessons_chapter_links')
				.select(
					`
					chapter_id,
                    lessons(
                        id,
                        lesson_title,
                        slug
                    )
 		            `
				)
				.eq('chapter_id', chapterId);
			if (lessonError) return { data: null, error: lessonError.message };
			return { data: lessonTitles, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error: error.message };
			}
			return { data: null, error: 'Something went wrong' };
		}
	};
	sendLessonProgress = async ({ lessonId, userId, courseId }: sendLessonProgress) => {
		if (!lessonId || !userId || !courseId)
			return { data: null, error: 'sendLessonProgress(): lessonId courseId,or userId is required' };

		try {
			const { error } = await this.supabase.rpc('add_lesson_history', {
				courseid: courseId,
				lessonid: lessonId,
				userid: userId
			});
			if (error) return { data: null, error: error.message };
			return { data: 'success', error: null };
		} catch (error) {
			if (error instanceof Error) return { data: null, error: error.message };
			return { data: null, error: 'Something went wrong' };
		}
	};

	// createHighlightData = async ({
	// 	contentId,
	// 	courseId,
	// 	highlightContents,
	// 	userId
	// }: createHighlightDataParams) => {
	// 	if (!contentId || !courseId || !highlightContents || !userId)
	// 		return {
	// 			data: null,
	// 			error: 'createHighlightedData(): contentId, courseId, highlightContents, userId is required'
	// 		};

	// 	try {
	// 		const res = await fetch('/api/highlights', {
	// 			method: 'POST',
	// 			body: JSON.stringify({
	// 				content: highlightContents,
	// 				contentId,
	// 				userId,
	// 				courseId
	// 			})
	// 		});
	// 		if (!res.ok) throw new Error('Unable to create highlighted data');
	// 		return { data: 'Success', error: null };
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			return { data: null, error: error.message };
	// 		}
	// 		return { data: null, error: 'Something went wrong' };
	// 	}
	// };
	// getHighlightedData = async (lessonId: number | undefined): ReturnTypeHighlight => {
	// 	if (!lessonId) {
	// 		return { data: null, error: 'getHighlightedData(): lessonId is required' };
	// 	}
	// 	try {
	// 		const response = await fetch(`/api/highlights?contentId=${lessonId}`);
	// 		if (!response.ok) {
	// 			return { data: null, error: 'Unable to fetch highlighted data' };
	// 		}
	// 		const highlightedData = await response.json();

	// 		return { data: highlightedData, error: null };
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			return { data: null, error: error.message };
	// 		}
	// 		return { data: null, error: 'Something went wrong' };
	// 	}
	// };
	// deleteHighlightedData = async (highlightId: string | undefined) => {
	// 	if (!highlightId) {
	// 		return { data: null, error: 'deleteHighlightedData(): Id is required ' };
	// 	}

	// 	try {
	// 		const deleteRes = await fetch(`/api/highlights?id=${highlightId}`, { method: 'DELETE' });
	// 		if (!deleteRes.ok) throw new Error('Unable to delete highlighted data');
	// 		return { data: deleteRes, error: null };
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			return { data: null, error: error.message };
	// 		}
	// 		return { data: null, error: 'Something went wrong' };
	// 	}
	// };

	// getSummarizedContentByLessonId = async (lessonId: number | undefined) => {
	// 	if (!lessonId) {
	// 		return { data: null, error: 'getSummarizedContentByLessonId(): lessonId is required' };
	// 	}

	// 	try {
	// 		const { data: summarizedContent, error: summarizedContentError } = await this.supabase
	// 			.from('summarized_lessons')
	// 			.select(
	// 				`
	// 			id,
	// 			summarized_content,
	// 			lesson:summarized_lessons_lesson_links!inner(
	// 				lesson_id
	// 			)
	// 		`
	// 			)
	// 			.eq('lesson.lesson_id', lessonId)
	// 			.single();
	// 		if (summarizedContentError) return { data: null, error: summarizedContentError.message };
	// 		return { data: summarizedContent, error: null };
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			return { data: null, error: error.message };
	// 		}
	// 		return { data: null, error: 'Something went wrong' };
	// 	}
	// };
}
export default DataProvider;
