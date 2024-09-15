<script>
	import AboutUs from '$lib/Ui/sections/AboutUs.svelte';
	import Hero from '$lib/Ui/sections/Hero.svelte';
	import Featured from '$lib/Ui/sections/Featured.svelte';
	import Pricing from '$lib/Ui/sections/Pricing.svelte';
	import Faq from '$lib/Ui/sections/Faq.svelte';
	import ContactUs from '$lib/Ui/sections/ContactUs.svelte';
	import CTA from '$lib/Ui/sections/CTA.svelte';

	export let data;
	const courses = []; // data.props.courses;
</script>

<Hero />
<div class="z-40">
	<AboutUs />
	<Featured {courses} />
	<Pricing />
	<Faq />
	<ContactUs />
	<CTA />
</div>
