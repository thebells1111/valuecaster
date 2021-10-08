<script>
	export let filteredPodcastList;
	export let scrollToIndex;
	export let searchBar;
	export let handleSearch;
</script>

<div class="container">
	<div class="index">
		<input
			type="number"
			placeholder="Scroll to index..."
			class="input"
			bind:value={scrollToIndex}
		/>
		of {filteredPodcastList?.length} Value Enabled Podcasts
	</div>
	<input
		bind:this={searchBar}
		type="search"
		on:input={(e) => handleSearch(e.target.value)}
		placeholder="filter podcasts"
	/>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		margin: 8px 0;
		width: 100%;
	}

	input[type='search'] {
		width: 50%;
	}
</style>
