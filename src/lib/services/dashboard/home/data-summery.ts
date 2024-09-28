import { displayTime } from '$lib/helpers/formatDate';
import type { Activity, LessonWithCourse } from './types';
class DashboardSummaryGenerator {
	calculateAverageTime(activities: Activity | undefined) {
		if (!Array.isArray(activities)) {
			return null;
		}
		const totalReadingTimeInSeconds = activities.reduce((sum, item) => sum + item.reading_time, 0);
		const averageReadingTime = totalReadingTimeInSeconds / activities.length;
		const averageTime = displayTime(Number(averageReadingTime.toFixed(0)) * 1000);
		return averageTime;
	}
	calculateRecentCourseLessons(activities: LessonWithCourse | undefined) {
		if (!Array.isArray(activities)) {
			return null;
		}
		const lessons = activities.map((item) => item.lesson).flat();

		return lessons.reduce((accumulator, currentValue) => {
			const isCourseExist = accumulator.find(
				(item) => item?.lessons.course[0].courses.id === currentValue?.lessons.course[0].courses.id
			);
			if (!isCourseExist) {
				accumulator.push(currentValue);
			}
			return accumulator;
		}, [] as any[]);
	}
}

export default DashboardSummaryGenerator;
