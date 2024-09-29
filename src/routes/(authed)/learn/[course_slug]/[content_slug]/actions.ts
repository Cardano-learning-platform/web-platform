import { computePosition, offset, flip, shift } from '@floating-ui/dom';

type PopupOptions = {
	tooltip: HTMLElement;
};
type EventAndTooltip = { event: MouseEvent | Event; tooltip: HTMLElement };
type tooltipContents = {
	name: string;
	icon: string;
}[];


export const selectedText = () => {
	if (typeof window === 'undefined') return null;

	if (window?.getSelection()?.focusNode) {
		const isValid = (window?.getSelection()?.focusNode?.parentNode as HTMLElement).closest(
			'#content-container'
		);
		return isValid ? window?.getSelection()?.toString().trim() : null;
	}
	return null;
};

const setupPopup = async ({ event, tooltip }: EventAndTooltip) => {
	const target = event?.target as HTMLElement;

	const { x, y } = await computePosition(target, tooltip, {
		placement: 'top',
		middleware: [offset(4), flip(), shift({ padding: 5 })]
	});
	Object.assign(tooltip.style, {
		left: `${x}px`,
		top: `${y}px`
	});
};

const showPopup = ({ event, tooltip }: EventAndTooltip) => {
	const selectedTextData = selectedText();

	if (tooltip && selectedTextData) {
		tooltip.classList.remove('invisible');
		tooltip.classList.add(
			'visible',
			'transform',
			'scale-0',
			'scale-100',
			'ease-in-out',
			'duration-300'
		);
		setupPopup({ event, tooltip });
	}
};

export const hidePopup = (params?: Partial<EventAndTooltip> | null) => {
	const { event, tooltip } = params || {};
	const target = event?.target as HTMLElement;
	const isPopupClicked = tooltip?.contains(target);

	if (!isPopupClicked && tooltip) {
		tooltip.classList.add('invisible');
		tooltip.classList.remove('visible', 'scale-100');
	}
};

export function createTooltip({
	tooltipContents,
	handlePopupButtonClick
}: {
	tooltipContents: tooltipContents;
	handlePopupButtonClick: (name: string) => void;
}) {
	const tooltip = document.createElement('div');
	tooltip.id = 'tooltip';
	tooltip.classList.add('card', 'rounded-md', 'shadow-xl', 'absolute', 'invisible');
	const div = document.createElement('div');

	const tooltipContent = tooltipContents.map((tooltipContent) => {
		div.classList.add('flex');
		const button = document.createElement('button');
		button.classList.add(
			'[&>*]:pointer-events-none',
			'p-2',
			'w-full',
			'hover:variant-glass-tertiary',
			'hover:shadow-xl',
			'flex',
			'just-fy-center',
			'flex-col',
			'items-center',
			'text-xs'
		);
		button.innerHTML = tooltipContent.icon;
		button.innerHTML += `<span class="ml-2">${tooltipContent.name}</span>`;
		button.addEventListener('click', () => handlePopupButtonClick(tooltipContent.name));
		return button;
	});

	div.append(...tooltipContent);
	tooltip.append(div);
	document.body.append(tooltip);
	return tooltip;
}

export function customTooltip(node: HTMLElement, options: PopupOptions) {
	node.addEventListener('mouseup', (event) => {
		if (window.innerWidth < 768) return;
		return showPopup({ event, tooltip: options.tooltip })
	});
	document.addEventListener('mousedown', (event) => hidePopup({ event, tooltip: options.tooltip }));
	document.addEventListener('visibilitychange', (event) =>
		document.visibilityState === 'hidden' ? hidePopup({ event }) : null
	);
}
