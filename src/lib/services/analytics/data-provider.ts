import { indexedDB } from '$lib/indexDb';
import type { Supabase } from './types';
import type { ReadingInformation } from './types';
class Analytics {
	constructor() {}

	storeReadingInformation = async (readingInformation: ReadingInformation) => {
		try {
			const data = await indexedDB.readingInformation.add(readingInformation);
			return data;
		} catch (error) {
			return null;
		}
	};

	searchReadingInformation = async (trackingId: number | null) => {
		try {
			const data = await indexedDB.readingInformation.get(trackingId);
			return data;
		} catch (error) {
			return null;
		}
	};

	updateReadingInformation = async ({
		trackingId,
		readingInformation
	}: {
		trackingId: number | null;
		readingInformation: ReadingInformation;
	}) => {
		try {
			const existingReadingInfo = await this.searchReadingInformation(trackingId);

			if (!existingReadingInfo) return;
			if (existingReadingInfo._reading_time === readingInformation._reading_time) return;

			await indexedDB.readingInformation.update(trackingId, readingInformation);
		} catch (error) {
			return null;
		}
	};
	bulkSetSyncReadingInformation = async ({
		readingInformation
	}: {
		readingInformation: ReadingInformation[];
	}) => {
		try {
			const updatedSyncValue = readingInformation.map((readingInfo) => {
				return {
					key: readingInfo.id,
					changes: { synced: 1 }
				};
			});
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await indexedDB.readingInformation.bulkUpdate(updatedSyncValue);
		} catch (error) {
			return null;
		}
	};
	getAllLocalReadingInformation = async () => {
		try {
			const data = await indexedDB.readingInformation.toArray();
			return data;
		} catch (error) {
			return null;
		}
	};
	deleteSyncedLocalReadingInformation = async () => {
		try {
			await indexedDB.readingInformation.where('synced').equals(1).delete();
		} catch (error) {
			return null;
		}
	};

	deleteAllLocalReadingInformation = async () => {
		try {
			await indexedDB.readingInformation.clear();
		} catch (error) {
			return null;
		}
	};
	removeZeroDurationReadings = async () => {
		try {
			const readingInformation = await indexedDB.readingInformation.toArray();
			readingInformation.pop(); // remove the last element as it is the current reading information
			await indexedDB.readingInformation.bulkDelete(
				readingInformation.filter((entry) => entry._reading_time === 0).map((entry) => entry.id)
			);
		} catch (error) {
			return null;
		}
	};
	processReadingDataForSending = (readingInformation: ReadingInformation[] | null) => {
		if (!readingInformation) return [];
		let validReadingData =
			readingInformation.length > 10 ? readingInformation.slice(0, 10) : readingInformation;
		validReadingData.pop(); //  remove the last element as it is the current reading information
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		validReadingData = validReadingData.map(({ id, ...relevantData }) => relevantData);

		return validReadingData;
	};

	sendReadingInformationToServer = async ({ supabase }: { supabase: Supabase }) => {
		try {
			await this.removeZeroDurationReadings();

			const allReadingInformation = await this.getAllLocalReadingInformation();
			if (!allReadingInformation || allReadingInformation.length === 0) return;

			const processedReadingData = this.processReadingDataForSending(allReadingInformation);
			if (processedReadingData.length === 0) return;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const { error } = await supabase.rpc('add_reading_information', {
				data: processedReadingData
			});
			if (error) return null;

			await this.bulkSetSyncReadingInformation({ readingInformation: allReadingInformation });
			return 'success';
		} catch (error) {
			return null;
		}
	};
}
export default Analytics;
