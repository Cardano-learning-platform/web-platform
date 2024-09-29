<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck
	import type { getDrawerStore } from '@skeletonlabs/skeleton';
	import { toast } from 'svelte-sonner';
	import { Drawer as MobileDrawer } from 'vaul-svelte';

	import { page } from '$app/stores';
	import type { Database } from '$lib/database.types';
	import Skeleton from '$lib/UI/components/Skeleton/index.svelte';

	export let isMobileChapterDrawerOpen: boolean;

	type Chapters = Database['public']['Tables']['chapters']['Row'];
	let isLoading = false;
	export let contents: object[];
	export let openedChapterIds: number[];
	export let chapters: { chapters: Partial<Chapters> | null }[] | null | undefined;
	export let getLessonsTitleByChapterId;
	export let drawerStore: ReturnType<typeof getDrawerStore>;

	const showLesson = async (chapterId: number | undefined) => {
		isLoading = true;
		if (!openedChapterIds?.includes(chapterId)) {
			openedChapterIds = [...(openedChapterIds ?? []), chapterId];
			const contentChapters = await getLessonsTitleByChapterId(chapterId);
			contents = [...(contents ?? []), contentChapters.data];
			contents = contents.flat();
			isLoading = false;
		}
		isLoading = false;
		return openedChapterIds.find((id) => id === chapterId);
	};

	$: if (isLoading) {
		toast.loading('Loading lessons');
	} else {
		toast.dismiss();
	}

	const filterCurrentChapterCourse = (contents: object[], chapterId: number): boolean => {
		return contents?.filter((content) => content.chapter_id === chapterId);
	};
</script>

<MobileDrawer.Root shouldScaleBackground bind:open={isMobileChapterDrawerOpen}>
	<MobileDrawer.Portal>
		<MobileDrawer.Overlay class="fixed inset-0 bg-black/40" />
		<MobileDrawer.Content
			class="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[92%] flex-col  rounded-t-[10px] bg-surface-900"
		>
			<div style="will-change: transform;" class="flex-1 overflow-auto rounded-t-[10px] p-4">
				{#if chapters}
					<dl class="list-dl">
						{#each chapters as { chapters: chapter }, index (chapter.id)}
							<button
								id={`chapter-${index}`}
								class="variant-ghost-surface btn btn-sm w-full truncate text-clip rounded-md"
								on:click={() => showLesson(chapter?.id)}
							>
								<MobileDrawer.NestedRoot>
									<MobileDrawer.Trigger class="w-full">
										<div class="justify-start">
											<span class="badge bg-primary-500">
												<iconify-icon icon="line-md:list-3-twotone" />
											</span>
											<span class="flex-auto text-left">
												<dt>{chapter?.chapter_name}</dt>
											</span>
										</div>
									</MobileDrawer.Trigger>
									<MobileDrawer.Portal>
										<MobileDrawer.Overlay class="fixed inset-0 bg-black/40" />
										<MobileDrawer.Content
											class="fixed bottom-0 left-0 right-0 z-[200] mt-24 flex h-full max-h-[94%] flex-col rounded-t-[10px] bg-surface-900"
										>
											<div
												style="will-change: transform;"
												class="flex-1 overflow-auto rounded-t-[10px] bg-black/40 p-4"
											>
												<div
													class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-surface-900"
												/>
												{#if isLoading}
													<Skeleton length={2} placeholderCount={3} />
												{/if}

												<nav class="list-nav">
													<ul>
														{#each filterCurrentChapterCourse(contents, chapter?.id) as content, index}
															<li>
																<a
																	href={content.lessons?.slug}
																	on:click={() => drawerStore.close()}
																	id={`lesson-${index}`}
																	class={$page.url.pathname.includes(content.lessons?.slug)
																		? 'variant-soft-primary'
																		: ''}
																>
																	<span class="badge bg-primary-500">
																		<iconify-icon icon="line-md:arrow-right" />
																	</span>
																	<span class="flex-auto">{content.lessons.lesson_title}</span>
																</a>
															</li>
															<hr class="!border-t-1" />
														{/each}
													</ul>
												</nav>
											</div>
										</MobileDrawer.Content>
									</MobileDrawer.Portal>
								</MobileDrawer.NestedRoot>
							</button>
						{/each}
					</dl>
				{/if}
			</div>
		</MobileDrawer.Content>
	</MobileDrawer.Portal>
</MobileDrawer.Root>
