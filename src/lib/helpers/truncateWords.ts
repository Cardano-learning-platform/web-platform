export const truncate = (string: string | undefined | null, length: number) => {
	if (!string || typeof string !== 'string') return '';
	if (string?.length <= length) return string;

	return string.slice(0, length - 1) + '...';
};
