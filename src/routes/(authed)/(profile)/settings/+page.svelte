<script lang="ts">
	import { getModalStore, popup, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { toast } from 'svelte-sonner';

	import ThemeList from './ThemeList.svelte';
	export let data;
	const modalStore = getModalStore();

	const deleteMe = async () => await fetch('/api/delete_user');

	const deleteAccountModal: ModalSettings = {
		type: 'prompt',
		title: 'Delete account',
		body: `Are you sure you want to delete your account? This action is irreversible and will permanently erase all your data, settings, and history.
		</br>
		</br>
		You will not be able to recover any information or access the services with this account again.To confirm, please type <strong class="cursor-pointer">DELETE MY ACCOUNT</strong> in the box below and click the confirm button.`,
		value: '',
		valueAttr: { type: 'text', required: true },
		response: async (confirmation: string) => {
			if (confirmation !== 'DELETE MY ACCOUNT') {
				return toast.error('Invalid confirmation');
			}
			toast.info('Deleting account...');
			try {
				await deleteMe();
				toast.success('Account deleted, logging out...');
				await fetch('/auth/logout');
				window.location.href = '/';
			} catch (error) {
				toast.error('Failed to delete account');
			}
		}
	};

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
	let current_theme: string = data.props.theme || 'gold-nouveau';

	function set_theme(theme: string) {
		const one_year = 60 * 60 * 24 * 365;
		document.cookie = `theme=${theme}; max-age=${one_year}; path=/`;
		document.body.setAttribute('data-theme', theme);
		current_theme = theme;
	}
	const supportedThemes: AutocompleteOption<string>[] = [
		{ label: 'Gold Nouveau', value: 'gold-nouveau', keywords: 'gold, nouveau' },
		{ label: 'Skeleton', value: 'skeleton', keywords: 'skeleton' },
		{ label: 'Modern', value: 'modern', keywords: 'modern' },
		{ label: 'Crimson', value: 'crimson', keywords: 'crimson' },
		{ label: 'Wintry', value: 'wintry', keywords: 'wintry' },
		{ label: 'Rocket', value: 'rocket', keywords: 'rocket' },
		{ label: 'Vintage', value: 'vintage', keywords: 'vintage' },
		{ label: 'Hamlindigo', value: 'hamlindigo', keywords: 'hamlindigo' },
		{ label: 'Sahara', value: 'sahara', keywords: 'sahara' },
		{ label: 'Seafoam', value: 'seafoam', keywords: 'seafoam' }
	];

	const handleThemeChange = (theme: string | undefined) => {
		const themeVariant = theme;
		if (!themeVariant) return;
		if (themeVariant === current_theme) return;
		const selectedTheme = supportedThemes.find((theme) => theme.label === themeVariant);
		if (!selectedTheme) return;
		set_theme(selectedTheme.value);
	};
	const handleDeleteAccount = () => {
		modalStore.trigger(deleteAccountModal);
	};
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-8 text-3xl font-semibold">Settings</h1>

	<section class="variant-ghost-surface mb-6 rounded-md p-4">
		<h2 class="mb-4 max-w-sm text-2xl font-semibold">Theme</h2>

		<button class="variant-filled-secondary btn" use:popup={popupSettings}
			>Theme <iconify-icon icon="ic:sharp-arrow-drop-down"></iconify-icon>
		</button>

		<div
			data-popup="popupAutocomplete"
			class="card z-10 max-h-80 overflow-scroll overflow-x-hidden p-2"
		>
			<ThemeList {handleThemeChange} />
		</div>
	</section>

	<section class="variant-ghost-surface mb-6 rounded-md p-4">
		<h2 class="mb-4 text-2xl font-semibold">Email Preferences</h2>
		<form>
			<div class="mb-4">
				<label for="emailUpdates" class="mb-2 block font-semibold">Receive Email Updates</label>
				<input type="checkbox" id="emailUpdates" name="emailUpdates" class="checkbox mr-2" />
				<label for="emailUpdates" class="inline">Yes, I want to receive email updates.</label>
			</div>
		</form>
	</section>

	<section class="variant-ghost-surface mb-6 rounded-md p-4">
		<h2 class="mb-4 text-2xl font-semibold">Help and Support</h2>
		<p class=" mb-4">If you need assistance, please feel free to contact our support team.</p>
		<a href="mailto:mail@keleme.io" class="anchor">Email Support</a>
	</section>
	<section class="variant-glass-error mb-6 rounded-md p-4">
		<h2 class="mb-4 text-2xl font-semibold">Danger zone</h2>
		<button class="variant-glass-error btn" on:click={handleDeleteAccount}>
			Delete my account
		</button>
	</section>
</div>
