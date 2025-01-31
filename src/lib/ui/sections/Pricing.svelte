<script>
	const benefits = {
		explorer: ['Access to all courses', 'Basic Course Progress Tracking', 'Community Support'],
		innovator: ['All Explorer Benefits', 'No ads', 'Better AI integration', 'Email Support'],
		mastermind: [
			'All Innovator Benefits',
			'One-on-one Mentorship Opportunities',
			'Early Access to New Features',
			'Priority Support'
		]
	};
</script>

<section class="variant-glass-surface relative z-50 pb-20 backdrop-blur-3xl">
	<div class="mx-auto max-w-screen-xl px-4 py-8">
		<div class="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
			<h2 class="pb-9 text-center text-4xl font-black md:text-6xl">Invest in Your Future</h2>
		</div>
		<div class="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
			<div class="card variant-filled-primary mx-auto flex max-w-lg flex-col p-6 text-center">
				<h3 class="mb-4 text-2xl font-semibold">Explorer</h3>
				<p class="font-light">Best for knowledge enthusiasts looking to explore diverse topics.</p>
				<div class="my-8 flex items-baseline justify-center">
					<span class="mr-2 text-5xl font-extrabold">FREE</span>
				</div>

				<ul role="list" class="mb-8 space-y-4 text-left">
					{#each benefits.explorer as benefit}
						<li class="flex items-center space-x-3">
							<iconify-icon
								icon="heroicons-outline:check"
								class="text-2xl text-green-500 dark:text-green-400"
							/>
							<span>{benefit}</span>
						</li>
					{/each}
				</ul>
				<a
					href="/auth/register"
					class="rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
					>Get started
				</a>
			</div>

			<div class="card variant-filled-secondary mx-auto flex max-w-lg flex-col p-6 text-center">
				<h3 class="mb-4 text-2xl font-semibold">Innovator</h3>
				<p class="font-light sm:text-lg">
					Best for those seeking an ad-free and innovative learning experience.
				</p>
				<div class="my-8 flex items-baseline justify-center">
					<span class="mr-2 text-5xl font-extrabold">$-</span>
					<span class="">/month</span>
				</div>

				<ul role="list" class="mb-8 space-y-4 text-left">
					{#each benefits.innovator as benefit}
						<li class="flex items-center space-x-3">
							<iconify-icon
								icon="heroicons-outline:check"
								class="text-2xl text-green-500 dark:text-green-400"
							/>
							<span>{benefit}</span>
						</li>
					{/each}
				</ul>
				<button
					aria-disabled="true"
					disabled
					class="rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-black focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
					>Coming Soon
				</button>
			</div>

			<div class="card variant-filled-tertiary mx-auto flex max-w-lg flex-col p-6 text-center">
				<h3 class="mb-4 text-2xl font-semibold">Mastermind</h3>
				<p class="font-light sm:text-lg">
					Best for dedicated learners aiming to master their skills.
				</p>
				<div class="my-8 flex items-baseline justify-center">
					<span class="mr-2 text-5xl font-extrabold">$-</span>
					<span class="">/month</span>
				</div>

				<ul role="list" class="mb-8 space-y-4 text-left">
					{#each benefits.mastermind as benefit}
						<li class="flex items-center space-x-3">
							<iconify-icon
								icon="heroicons-outline:check"
								class="text-2xl text-green-500 dark:text-green-400"
							/>
							<span>{benefit}</span>
						</li>
					{/each}
				</ul>
				<button
					aria-disabled="true"
					disabled
					class="rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium backdrop-blur-3xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
					>Coming Soon
				</button>
			</div>
		</div>
	</div>
</section>
