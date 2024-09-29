import { redirect } from '@sveltejs/kit';

import lessonService from '$lib/services/learn/data-provider';
import OnboardingDataProvider from '$lib/services/onboarding/data-provider';

export const load = async ({ locals: { supabase }, params, parent, cookies }) => {
	const data = await parent();
	const lessonProvider = new lessonService(supabase);
	const { content_slug, course_slug } = params;
	// const isSummarized = url.searchParams.get('summarized') === 'true';
	const onboardingDataProvider = new OnboardingDataProvider(supabase);
	if (data.chapters === undefined) {
		return redirect(302, `/course/${course_slug}?error=true&message=Unable to get course chapters`);
	}
	const lesson = await lessonProvider.getLessonContents({ lessonSlug: content_slug });
	const onboardingProgress = await onboardingDataProvider.getUserOnboardingProgressCookie("learnTour", cookies);

	if (lesson.error) return redirect(302, `/course/${course_slug}?error=true&message=Unable to get course lessons`);

	const previousAndNextLesson = await lessonProvider.getPreviousAndNextLesson({ lessonId: lesson?.data?.id });

	// if (isSummarized) {
	// 	const summeryData = await lessonProvider.getSummarizedContentByLessonId(lesson.data?.id);
	// 	return {
	// 		props: {
	// 			lesson: lesson.data,
	// 			chapters: data.chapters,
	// 			summery: summeryData?.data?.summarized_content
	// 		}
	// 	};
	// }

	return {
		onboardingStatus: onboardingProgress.data,
		props: {
			lesson: lesson.data,
			chapters: data.chapters,
			previousAndNextLesson: previousAndNextLesson.data
		}
	};
};
