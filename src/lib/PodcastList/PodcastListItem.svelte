<script>
	import Categories from './Categories.svelte';
	export let podcast;
	export let index;
	export let handleSearch;
	export let sectionWidth;
</script>

<div class="container">
	<div class="row">
		<div class="artwork">
			<a href={'https://curiocaster.com/#fastfollow-podcast:' + podcast.guid}>
				<div class="image-container">
					<img draggable="false" src={podcast.artwork || podcast.image} />
				</div>
			</a>
		</div>
		<div class="data-container">
			<a href={'https://curiocaster.com/#fastfollow-podcast:' + podcast.podcastGuid}>
				<h2>{podcast.title}</h2>
			</a>
			<p>by {podcast.author}</p>
			{#if sectionWidth > 649}
				<Categories {handleSearch} {podcast} />
			{/if}
		</div>
	</div>
	{#if sectionWidth < 650}
		<Categories {handleSearch} {podcast} />
	{/if}
	<p class="description">{podcast.description}</p>
	<p class="index">{index + 1}</p>
</div>

<style>
	.container {
		background: #fff;
		border: 1px solid #d6d6d6;
		border-radius: 6px;
		margin: 10px 12px 10px 20px;
		padding: 5px;
		height: 320px;
		position: relative;
		width: calc(100% - 40px);
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.artwork {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px;
	}

	.data-container {
		width: calc(100% - 106px);
	}

	img {
		height: 140px;
		width: 140px;
		border-radius: 10px;
		border: 1px solid #d7d7d7;
	}

	h2 {
		margin: 0 0 8px 0;
	}

	p {
		margin: 0 0 8px 8px;
	}

	.index {
		position: absolute;
		bottom: 0;
		right: 8px;
	}

	@media (max-width: 649px) {
		.container {
			background: #fff;
			border: 1px solid #d6d6d6;
			border-radius: 6px;
			margin: 10px 10px 10px 10px;
			padding: 5px;
			height: 470px;
			position: relative;
			width: calc(100% - 20px);
		}
		img {
			height: 100px;
			width: 100px;
			margin-right: 6px;
			border-radius: 6px;
			border: 1px solid #d7d7d7;
		}

		.artwork {
			padding: 0px;
		}

		.description {
			margin-top: 4px;
		}
	}
</style>
