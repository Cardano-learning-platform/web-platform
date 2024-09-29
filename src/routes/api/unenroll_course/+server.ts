import { json } from '@sveltejs/kit';

import CourseProvider from '$lib/services/course/data-provider';

export const GET = async ({ url, locals: { supabase, userInformation, safeGetSession } }) => {
    const courseProvider = new CourseProvider(supabase);
    const userId = userInformation?.id;
    const session = await safeGetSession();
    const courseId = Number(url.searchParams.get('courseId'));
    const isCourseIdValid = !Number.isNaN(courseId);

    if (!session || !isCourseIdValid) {
        return json({ error: 'Invalid course id' });
    }

    const { data: isEnrolled, error: enrollmentStatusError } = await courseProvider.getEnrollmentStatus({
        userId,
        courseId
    });
    if (enrollmentStatusError) {
        return json({ error: enrollmentStatusError });
    }

    if (!isEnrolled) {
        return json({ error: 'You are not enrolled in this course' });
    }
    const { error } = await courseProvider.unenrollCourse({ userId, courseId });

    if (error) {
        return json({ error });
    }
    return json({ success: true, message: `Successfully unenrolled` });
};
