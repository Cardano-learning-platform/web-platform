export const formatDate = (date: string | null) => new Date(date ?? 0 * 1000).toLocaleDateString();

export const displayTime = (timeInMs: number | null) => {
	if (!timeInMs) return '';
	const timeInSeconds = Math.floor(timeInMs / 1000);
	if (timeInSeconds >= 3600) {
		const hours = Math.floor(timeInSeconds / 3600);
		const remainingSeconds = timeInSeconds % 3600;
		const minutes = Math.floor(remainingSeconds / 60);
		return `${hours} hr ${minutes} min `;
	} else if (timeInSeconds >= 60) {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes} min ${seconds} sec`;
	} else {
		return `${timeInSeconds} sec`;
	}
};
