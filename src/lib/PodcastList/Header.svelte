<script>
	export let filteredPodcastList;
	export let scrollToIndex;
	export let storedPodcastList;

	function searchCats(cats, term) {
		const catMap = Object.entries(cats).map(([key, value]) => value);
		for (let c of catMap) {
			if (c.toLowerCase().includes(term)) {
				return true;
			}
		}
		return false;
	}

	function handleSearch(e) {
		console.log(storedPodcastList);
		let s = e.target.value;
		filteredPodcastList = storedPodcastList.filter(
			(v) =>
				v.title.toLowerCase().includes(s.toLowerCase()) ||
				v.author.toLowerCase().includes(s.toLowerCase()) ||
				searchCats(v.categories, s.toLowerCase()) ||
				v.description.toLowerCase().includes(s.toLowerCase())
		);
	}
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
	<input type="search" on:input={handleSearch} placeholder="filter podcasts" />
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
