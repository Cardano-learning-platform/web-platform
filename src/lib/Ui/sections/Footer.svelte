<script>
	import { page } from '$app/stores';
	const currentUrl = $page.url.host;
	const getCurrentYear = new Date().getFullYear();
</script>

<footer class="card variant-outline-surface shadow">
	<div class="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
		<span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center"
			>© {getCurrentYear} <a href={currentUrl} class="hover:underline">Learn cardano™</a>. All
			Rights Reserved.
		</span>
		<ul
			class="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<li>
				<a href="/about_us" class="mr-4 hover:underline md:mr-6">About</a>
			</li>
			<li>
				<a href="/privacy" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
			</li>

			<li>
				<a href="/contact_us" class="hover:underline">Contact</a>
			</li>
		</ul>
	</div>
</footer>
