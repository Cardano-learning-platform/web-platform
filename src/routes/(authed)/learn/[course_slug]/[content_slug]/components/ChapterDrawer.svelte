<script lang="ts">
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck
	import { TreeView, ProgressBar, TreeViewItem, type getDrawerStore } from '@skeletonlabs/skeleton';

	import type { Database } from '$lib/database.types';
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

	const filterCurrentChapterCourse = (contents: object[], chapterId: number): boolean => {
		return contents?.filter((content) => content.chapter_id === chapterId);
	};
</script>

<div class="m-3 h-auto">
	<div class="relative max-w-md">
		{#if isLoading}
			<ProgressBar label="Progress Bar" class="absolute top-0" height="h-1" value={undefined} />
		{/if}
		<TreeView selection>
			{#if chapters}
				{#each chapters as { chapters: chapter }, index}
					<div id={`chapter-${index}`}>
						<TreeViewItem on:click={() => showLesson(chapter?.id)}>
							<div class="flex">
								{chapter?.chapter_name}
							</div>
							<svelte:fragment slot="children">
								{#each filterCurrentChapterCourse(contents, chapter?.id) as content, index}
									<a
										href={content.lessons?.slug}
										on:click={() => drawerStore.close()}
										id={`lesson-${index}`}
									>
										<TreeViewItem>
											<p>
												{content.lessons.lesson_title}
											</p>
										</TreeViewItem>
									</a>
								{/each}
							</svelte:fragment>
						</TreeViewItem>
					</div>
				{/each}
			{/if}
		</TreeView>
	</div>
</div>
