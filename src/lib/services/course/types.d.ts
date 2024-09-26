import type { RequestEvent } from '@sveltejs/kit';
export type Supabase = RequestEvent['locals']['supabase'];
export type EnrollmentStatusParams = {
	courseId: number | undefined | null;
	userId: number | undefined | null;
};
export type getCourseBySlugOrIdParams =
	| {
			course_id: number | undefined | null;
			course_slug?: string | undefined | null;
	  }
	| {
			course_id?: number | undefined | null;
			course_slug: string | undefined | null;
	  };
export type EnrollStudent = {
	courseId: number | undefined | null;
	userId: number | undefined | null;
};
