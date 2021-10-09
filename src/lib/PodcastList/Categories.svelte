<script>
	export let podcast;
	export let handleSearch;
</script>

<div class="categories">
	{#each Object.entries(podcast.categories)
		.map(([key, value]) => value)
		.concat(podcast.provider)
		.filter((v) => v) as cat}
		<span class="tag" on:click={handleSearch.bind(null, cat)}>{cat}</span>
	{/each}
</div>

<style>
	.tag {
		padding: 2px 8px;
		border-radius: 20px;
		background-color: rgb(0, 117, 212);
		color: rgb(245, 245, 245);
		margin: 2px;
		cursor: pointer;
		display: inline-block;
	}
</style>
