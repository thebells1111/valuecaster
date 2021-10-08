<script>
	import { onMount } from 'svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import Header from './Header.svelte';
	import EpisodeListItem from './PodcastListItem.svelte';

	let listHeight = 500;
	let headerHeight = 80;
	let sectionHeight;
	let sectionWidth;
	let virtualList;
	let scrollToIndex;
	$: if (sectionHeight && headerHeight) {
		listHeight = sectionHeight - 60;
	}
	let filteredPodcastList = [];
	let storedPodcastList = [];

	onMount(async () => {
		const res = await fetch(`/api/queryindex?q=podcasts/bytag?podcast-value&pretty`, {
			credentials: 'same-origin'
		});
		let data = await res.json();
		let feeds = data.feeds;
		storedPodcastList = feeds;
		filteredPodcastList = feeds;
		console.log(feeds);
	});
</script>

<section bind:clientHeight={sectionHeight} bind:clientWidth={sectionWidth}>
	<Header bind:filteredPodcastList bind:scrollToIndex {storedPodcastList} />

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
		flex: 1;
		overflow: hidden;
	}
</style>
