<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<section class="variant-glass-surface relative z-50 backdrop-blur-3xl">
	<div class="mx-auto max-w-screen-xl px-4 pb-8 lg:px-6 lg:pb-24">
		<h2 class="py-7 text-center text-6xl font-black">Frequently Asked Questions</h2>
		<div class="variant-glass-surface mx-auto max-w-7xl rounded-md font-normal">
			<Accordion autocollapse>
				<AccordionItem open>
					<svelte:fragment slot="summary">What is Cardano blockchain?</svelte:fragment>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							Cardano is a third-generation blockchain platform that aims to provide a more
							sustainable, scalable, and interoperable alternative to other blockchain networks. It
							uses a proof-of-stake consensus mechanism called Ouroboros.
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						>Why is Haskell used in Cardano development?</svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							Haskell is used in Cardano development because of its strong type system, which helps
							prevent errors and ensures code reliability. Its functional programming paradigm also
							aligns well with formal verification methods used in Cardano's development.
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						>What is Plutus and how does it relate to Cardano?</svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							Plutus is the smart contract platform for Cardano. It allows developers to write
							applications that interact with the Cardano blockchain. Plutus smart contracts are
							written in Haskell and then compiled to Plutus Core.
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						>Do I need prior programming experience to learn Cardano development?</svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							While prior programming experience can be helpful, it's not strictly necessary. Our
							courses are designed to accommodate beginners. However, familiarity with programming
							concepts will make the learning process smoother.
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						>How long does it take to become proficient in Cardano development?</svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							The time it takes to become proficient varies depending on your background and
							dedication. Generally, with consistent study and practice, you can gain a solid
							understanding within 3-6 months. Mastery may take a year or more.
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						>Are there any prerequisites for learning Cardano development?</svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							While not strictly required, a basic understanding of blockchain technology, some
							programming experience (especially in functional programming), and familiarity with
							cryptography concepts can be beneficial.
						</p>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary"
						>How can I practice what I learn about Cardano development?</svelte:fragment
					>
					<svelte:fragment slot="content">
						<p class="font-extralight">
							Our platform provides numerous hands-on exercises and projects. Additionally, you can
							participate in Cardano's testnet, contribute to open-source projects, or build your
							own applications to apply your knowledge in real-world scenarios.
						</p>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</section>
