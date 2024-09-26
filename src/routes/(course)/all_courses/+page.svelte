<script>
	import { Card } from '$lib/ui/components/Card/';
	import { ResponsiveCard } from '$lib/ui/layout/';
	export let data;
	const courses = data.props.courses;
	console.log(courses);
</script>

<aside class="alert variant-ghost-surface mx-10 my-2">
	<div><iconify-icon icon="uit:process" class="animate-spin" /></div>
	<div class="alert-message">
		<p>
			Our team is dedicated to developing high-quality courses on Cardano blockchain technology.
		</p>
	</div>
</aside>
<div class="p-10">
	<ResponsiveCard>
		{#if !courses || courses.length === 0}
			<p>No courses yet</p>
		{:else}
			{#each courses as card}
				<Card {...card} />
			{/each}
		{/if}
	</ResponsiveCard>
</div>
