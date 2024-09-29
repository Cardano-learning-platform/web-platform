import Dexie, { type Table } from 'dexie';

import type { ReadingInformation } from '$lib/services/analytics/types';

export class indexedDb extends Dexie {
	readingInformation!: Table<ReadingInformation>;
	constructor() {
		super('userData');
		this.version(3).stores({
			readingInformation:
				'++id, _reading_time, _course_id, _user_id, _lesson_id, _timestamp, synced'
		});
	}
}

export const indexedDB = new indexedDb();
