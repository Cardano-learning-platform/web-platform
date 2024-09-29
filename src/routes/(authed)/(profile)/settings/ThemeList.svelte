<script lang="ts">
	export let handleThemeChange: (theme: string | undefined) => void;

	const handleThemeClick = (e: MouseEvent) => {
		const theme = (e.currentTarget as HTMLElement).dataset.theme;
		handleThemeChange(theme);
	};
</script>

<nav class="flex flex-col gap-3">
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(36, 44, 70);"
		on:click={handleThemeClick}
		data-theme="Skeleton"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">💀 Skeleton</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(15, 186, 129);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(79, 70, 229);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(14, 165, 233);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(132, 204, 22);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(234, 179, 8);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(212, 25, 118);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(17, 24, 39);"
		on:click={handleThemeClick}
		data-theme="Wintry"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">🌨️ Wintry</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(59, 130, 246);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(79, 70, 229);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(14, 165, 233);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(132, 204, 22);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(234, 179, 8);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(212, 25, 118);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(49, 50, 118);"
		on:click={handleThemeClick}
		data-theme="Modern"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">🤖 Modern</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(236, 72, 153);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(6, 182, 212);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(20, 184, 166);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(132, 204, 22);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(234, 179, 8);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(239, 68, 68);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(49, 57, 68);"
		on:click={handleThemeClick}
		data-theme="Rocket"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">🚀 Rocket</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(6, 182, 212);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(59, 130, 246);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(168, 85, 247);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(76, 203, 21);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(244, 193, 42);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(181, 44, 85);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(18, 102, 104);"
		on:click={handleThemeClick}
		data-theme="Seafoam"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">🧜‍♀️ Seafoam</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(134, 208, 203);"
				></li>
				<li class="aspect-square w-3 rounded-full xl:w-4" style="background: rgb(33, 51, 85);"></li>
				<li class="aspect-square w-3 rounded-full xl:w-4" style="background: rgb(255, 61, 0);"></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(6, 229, 162);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(234, 229, 87);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(210, 70, 70);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(31, 27, 24);"
		on:click={handleThemeClick}
		data-theme="Vintage"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">📺 Vintage</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(234, 134, 26);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(151, 206, 165);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(6, 182, 212);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(132, 203, 93);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(242, 172, 35);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(213, 126, 120);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(107, 38, 49);"
		on:click={handleThemeClick}
		data-theme="Sahara"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">🏜️ Sahara</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(236, 170, 54);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(58, 203, 186);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(187, 223, 134);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(132, 204, 22);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(229, 193, 87);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(219, 92, 156);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(49, 58, 80);"
		on:click={handleThemeClick}
		data-theme="Hamlindigo"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">👔 Hamlindigo</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(168, 190, 241);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(164, 142, 91);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(97, 151, 163);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(71, 148, 125);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(218, 169, 62);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(162, 97, 117);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(18, 11, 24);"
		on:click={handleThemeClick}
		data-theme="Gold Nouveau"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">💫 Gold Nouveau</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(116, 74, 161);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(6, 114, 229);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(127, 120, 221);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(114, 197, 133);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(231, 127, 8);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(143, 15, 34);"
				></li>
			</ul>
		</div>
	</button>
	<button
		class="card card-hover cursor-pointer space-y-4 p-4 text-white hover:ring-surface-500/50"
		style="background: rgb(21, 23, 31);"
		on:click={handleThemeClick}
		data-theme="Crimson"
	>
		<div class="flex items-center justify-between gap-4">
			<span class="text-center font-bold">⭕ Crimson</span>
			<ul class="flex items-center justify-center -space-x-1">
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(212, 22, 60);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(70, 133, 175);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(192, 182, 180);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(193, 221, 151);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(228, 194, 94);"
				></li>
				<li
					class="aspect-square w-3 rounded-full xl:w-4"
					style="background: rgb(210, 127, 129);"
				></li>
			</ul>
		</div>
	</button>
</nav>
