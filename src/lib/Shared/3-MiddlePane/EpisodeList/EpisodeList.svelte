<script>
	import { onMount } from 'svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import EpisodeListItem from './EpisodeListItem.svelte';
	import EpisodeListLoadingItems from './EpisodeListLoadingItems.svelte';

	let listHeight = 500;
	let headerHeight = 80;
	let sectionHeight;
	let sectionWidth;
	let virtualList;
	let scrollToIndex;
	$: if (sectionHeight && headerHeight) {
		listHeight = sectionHeight - 45;
	}
	let filteredPodcastList = [];

	onMount(async () => {
		const res = await fetch(`/api/queryindex?q=podcasts/bytag?podcast-value&pretty`, {
			credentials: 'same-origin'
		});
		let data = await res.json();
		let feeds = data.feeds;
		filteredPodcastList = feeds;
		console.log(feeds);
	});
</script>

<section bind:clientHeight={sectionHeight} bind:clientWidth={sectionWidth}>
	<div class="index">
		<input
			type="number"
			placeholder="Scroll to index..."
			class="input"
			bind:value={scrollToIndex}
		/>
		of {filteredPodcastList?.length} Value Enabled Podcasts
	</div>

	{#if filteredPodcastList && filteredPodcastList?.length}
		<div class="list-height">
			<VirtualList
				bind:this={virtualList}
				bind:height={listHeight}
				width="100%"
				{scrollToIndex}
				itemCount={filteredPodcastList.length}
				itemSize={330}
				overscanCount={5}
			>
				<div slot="item" let:index let:style {style} class="row">
					<EpisodeListItem podcast={filteredPodcastList?.[index]} {index} />
				</div>
			</VirtualList>
		</div>
	{:else}
		{#each [1, 2, 3, 4, 5] as podcast}
			<EpisodeListLoadingItems />
		{/each}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	:global(.virtual-list-wrapper) {
		overflow-x: hidden !important;
	}

	.list-height {
		height: calc(100% - 45px);
		overflow: hidden;
	}
</style>
