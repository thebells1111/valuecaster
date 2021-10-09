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
			min="0"
			max={filteredPodcastList?.length}
			placeholder="Item #"
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

	input {
		border-radius: 20px;
	}

	input[type='number'] {
		width: 100px;
		text-align: center;
		padding-left: 16px;
	}

	input[type='search'] {
		width: 50%;
		padding-left: 16px;
	}

	@media (max-width: 649px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		input[type='number'] {
			width: 75px;
			text-align: center;
		}

		input[type='search'] {
			width: 100%;
		}
	}
</style>
