<script>
	import { onMount } from 'svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import Header from './Header.svelte';
	import EpisodeListItem from './PodcastListItem.svelte';

	let searchBar;
	let listHeight = 500;
	let headerHeight = 80;
	let sectionHeight;
	let sectionWidth;
	let virtualList;
	let scrollToIndex;
	$: if (sectionHeight && headerHeight) {
		listHeight = sectionHeight - (sectionWidth > 649 ? 60 : 100);
	}
	let filteredPodcastList = [];
	let storedPodcastList = [];

	onMount(async () => {
		const res = await fetch(`/api/queryindex?q=podcasts/bytag?podcast-value&pretty`, {
			credentials: 'same-origin'
		});
		let data = await res.json();
		let feeds = data.feeds.map((feed) => {
			for (const d of feed.value.destinations) {
				if (d.address.substr(0, 6) === '03c457') {
					feed.provider = 'Satoshis Stream';
				}
				return feed;
			}
		});

		storedPodcastList = feeds;
		filteredPodcastList = feeds;
		console.log(feeds);
	});

	function searchCats(cats, term) {
		const catMap = Object.entries(cats).map(([key, value]) => value);
		for (let c of catMap) {
			if (c.toLowerCase().includes(term)) {
				return true;
			}
		}
		return false;
	}

	function handleSearch(s) {
		searchBar.value = s;
		filteredPodcastList = storedPodcastList.filter(
			(v) =>
				v?.title.toLowerCase().includes(s.toLowerCase()) ||
				v?.author.toLowerCase().includes(s.toLowerCase()) ||
				searchCats(v.categories, s.toLowerCase()) ||
				v?.description.toLowerCase().includes(s.toLowerCase()) ||
				v?.provider?.toLowerCase()?.includes(s.toLowerCase())
		);
		scrollToIndex = 0;
		setTimeout(() => (scrollToIndex = undefined), 0);
	}
</script>

<section bind:clientHeight={sectionHeight} bind:clientWidth={sectionWidth}>
	<Header {filteredPodcastList} {handleSearch} bind:scrollToIndex bind:searchBar />

	{#if filteredPodcastList && filteredPodcastList?.length}
		<div class="list-height">
			<VirtualList
				bind:this={virtualList}
				bind:height={listHeight}
				width="100%"
				{scrollToIndex}
				itemCount={filteredPodcastList.length}
				itemSize={sectionWidth > 649 ? 330 : 480}
				overscanCount={5}
			>
				<div slot="item" let:index let:style {style} class="row">
					<EpisodeListItem
						podcast={filteredPodcastList?.[index]}
						{index}
						{handleSearch}
						{sectionWidth}
					/>
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
	@media (max-width: 649px) {
		:global(.virtual-list-wrapper) {
			overflow-x: hidden !important;
			-ms-overflow-style: none; /* IE and Edge */
			scrollbar-width: none; /* Firefox */
		}

		:global(.virtual-list-wrapper::-webkit-scrollbar) {
			display: none;
		}
	}
</style>
