import type { RequestEvent } from '@sveltejs/kit';

import type { Database } from '$lib/database.types';
export type Supabase = RequestEvent['locals']['supabase'];

export type Lesson = Database['public']['Tables']['lessons']['Row'];
e;
export type getLessonContents =
	| {
			lessonId: number | null | undefined;
			lessonSlug?: string | null | undefined;
	  }
	| {
			lessonId?: number | null | undefined;
			lessonSlug: string | null | undefined;
	  };
export type HighlightedData = {
	id: number;
	user_id: number;
	content_id: number;
	course_id: number;
	highlight_contents: string;
	created_at: string;
};

export type createHighlightDataParams = {
	userId: number | null | undefined;
	contentId: number | null | undefined;
	courseId: number | null | undefined;
	highlightContents: string | null | undefined;
};

export type sendLessonProgress = {
	lessonId: number | null | undefined;
	userId: number | null | undefined;
	courseId: number | null | undefined;
};

export type ReturnTypeHighlight = Promise<
	| {
			data: null;
			error: string;
	  }
	| {
			data: HighlightedData[];
			error: null;
	  }
>;

export type ReturnType = Promise<
	| {
			data: null;
			error: string;
	  }
	| {
			data: Response;
			error: null;
	  }
>;
