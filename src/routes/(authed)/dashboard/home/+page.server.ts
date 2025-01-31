import DashboardService from '$lib/services/dashboard/home/data-provider';
// import OnboardingDataProvider from '$lib/services/onboarding/data-provider.js';

export const load = async ({ locals: { userInformation, supabase, safeGetSession }, parent, cookies }) => {
	const { session } = await safeGetSession();

	if (!session) return new Response('Unauthorized', { status: 401 });

	const enrolledCourses = (await parent()).enrolledCourses;
	const userId = userInformation?.id;
	// console.log(userId)
	// const onboardingDataProvider = new OnboardingDataProvider(supabase);
	const dataProvider = new DashboardService(supabase);

	// const onboardingProgress = await onboardingDataProvider.getUserOnboardingProgressCookie("dashboardTour", cookies);

	const getOneWeekOfHistory = async () => dataProvider.getOneWeekOfHistory(userId);

	const getTimeSpentLearning = async () => dataProvider.getTimeSpentLearning(userId);

	const getRecentCourses = async () => dataProvider.getRecentCourses(userId);

	const getWeeklyCourses = async () => dataProvider.getWeeklyCourses(userId);

	// console.log('enrolledCourses', enrolledCourses);
	// console.log(await getOneWeekOfHistory());
	// console.log(await getTimeSpentLearning());
	// console.log(await getRecentCourses());
	// console.log(await getWeeklyCourses());
	return {
		totalEnrolledCourses: enrolledCourses?.length ?? 0,
		onboardingStatus: null,// onboardingProgress.data,
		streamed: {
			timeline: getOneWeekOfHistory(),
			timeSpentLearning: getTimeSpentLearning(),
			recentCourses: getRecentCourses(),
			weeklyCourses: getWeeklyCourses()
		}
	};
};
