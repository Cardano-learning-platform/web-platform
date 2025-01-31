<script>
	import { toast } from 'svelte-sonner';

	import ContactUsSchema from '$lib/schema/contactUs';
	import { Spinner } from '$lib/ui/components/Spinner';

	let name = '';
	let email = '';
	let message = '';
	let isSubmitting = false;

	async function handleSubmit(e) {
		e.preventDefault();
		isSubmitting = true;

		const data = {
			name,
			email,
			message
		};
		const validationResult = ContactUsSchema.safeParse(data);
		if (!validationResult.success) {
			validationResult.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			isSubmitting = false;
			return;
		}

		try {
			const response = await fetch('/api/contact_us', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			if (!response.ok) {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			toast.error('Failed to send message');
		}
		toast.success('Message sent successfully');
		isSubmitting = false;
	}
</script>

<section id="contactUs" class="variant-soft-surface relative backdrop-blur-3xl">
	<div class="mx-auto max-w-screen-lg px-4">
		<h2 class=" pb-9 text-center text-4xl font-black md:text-6xl">Contact Us</h2>
		<p class="mb-8 text-center font-light sm:text-xl lg:mb-16">
			Have questions or feedback? Reach out to us by filling out the form below, and we'll get back
			to you as soon as possible.
		</p>
		<form class="card variant-glass-surface space-y-8 p-5" on:submit={handleSubmit}>
			<div>
				<label for="subject" class="mb-2 block text-sm font-black">Name</label>
				<input
					bind:value={name}
					disabled={isSubmitting}
					type="text"
					id="subject"
					class="input variant-form-material p-3 text-sm shadow-sm"
					placeholder="Full name"
					required
				/>
			</div>
			<div>
				<label for="email" class="mb-2 block text-sm font-black">Your email</label>
				<input
					bind:value={email}
					disabled={isSubmitting}
					type="email"
					id="email"
					class="input variant-form-material p-3 text-sm shadow-sm"
					placeholder="name@email.com"
					required
				/>
			</div>

			<div class="sm:col-span-2">
				<label for="message" class="mb-2 block text-sm font-black">Your message</label>
				<textarea
					bind:value={message}
					disabled={isSubmitting}
					id="message"
					rows="6"
					class="textarean variant-form-material block w-full p-2.5"
					placeholder="Let us know how we can help you"
					required
				/>
			</div>
			<button type="submit" class="variant-ghost-primary btn px-5 py-3 text-sm font-black">
				{#if isSubmitting}
					<Spinner /> Sending message
				{:else}
					Send message
				{/if}
			</button>
		</form>
	</div>
</section>
