import type { DrawerSettings } from '@skeletonlabs/skeleton';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const syntheticForm = ({
	selectedText,
	handleSubmit
}: {
	selectedText: string | null | undefined;
	handleSubmit: (e: unknown) => void;
}) => {
	const form = document.createElement('form');
	const input = document.createElement('input');
	input.classList.add('hidden');
	input.value = selectedText ?? '';
	form.appendChild(input);
	document.body.appendChild(form);
	form.addEventListener('submit', handleSubmit);
	return form;
};
export const removeCodeBlock = (code: string) => code.split('\n').slice(1, -1).join('\n');

export const processContent = async (content: string | null | undefined) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(content ?? '');

export const explainMenu: DrawerSettings = {
	id: 'explainMenu',
	bgDrawer: 'bg-gray-900 text-white',
	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-gray-500/50 to-gray-500/50',
	padding: 'p-4',
	rounded: 'rounded-xl',
	position: 'bottom',
	height: 'h-3/4'
};
export const tableOfContentMenu: DrawerSettings = {
	id: 'tableOfContentMenu',
	bgDrawer: 'bg-gray-900 text-white',
	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-gray-500/50 to-gray-500/50',
	padding: 'p-4',
	rounded: 'rounded-xl',
	position: 'top',
	height: 'auto'
};


export const tooltipContents = [
	{
		name: 'Copy',
		icon: '<iconify-icon icon="solar:copy-outline" style="color: white;" width="25" height="25" />'
	},
	{
		name: 'Explain',
		icon: '<iconify-icon icon="tabler:zoom-question" style="color: white;" width="25" height="25" />'
	}
];
