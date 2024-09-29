import type { RequestEvent } from '@sveltejs/kit';
export type Supabase = RequestEvent['locals']['supabase'];

export interface ReadingInformation {
	id?: number;
	_reading_time: number | undefined;
	_course_id: number | null;
	_user_id: number | undefined;
	_lesson_id: number | undefined;
	_timestamp: string | undefined;
	synced?: 0 | 1;
}
