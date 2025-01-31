<script>
	// import AboutUs from '$lib/ui/sections/About.svelte';
	import Hero from '$lib/ui/sections/Hero.svelte';
	import Featured from '$lib/ui/sections/Featured.svelte';
	import Pricing from '$lib/ui/sections/Pricing.svelte';
	import Faq from '$lib/ui/sections/Faq.svelte';
	import ContactUs from '$lib/ui/sections/ContactUs.svelte';
	import CTA from '$lib/ui/sections/CTA.svelte';

	// export let data;
	const courses = []; // data.props.courses;
</script>

<Hero />
<div class="z-40">
	<!-- <AboutUs /> -->
	<Featured {courses} />
	<Pricing />
	<Faq />
	<ContactUs />
	<CTA />
</div>
