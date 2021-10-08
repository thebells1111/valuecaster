<script>
	export let podcast;
	export let index;
</script>

<div class="container">
	<div class="row">
		<div class="artwork">
			<a href={'https://podcastindex.org/podcast/' + podcast.id}>
				<div class="image-container">
					<img draggable="false" src={podcast.artwork || podcast.image} />
				</div>
			</a>
		</div>
		<div>
			<a href={'https://podcastindex.org/podcast/' + podcast.id}>
				<h2>{podcast.title}</h2>
			</a>
			<p>by {podcast.author}</p>
			<div class="categories">
				<h4>Categories:</h4>
				<p>
					{Object.entries(podcast.categories).map(([key, value]) => {
						return value;
					})}
				</p>
			</div>
		</div>
	</div>
	<p>{podcast.description}</p>
	<p class="index">{index + 1}</p>
</div>

<style>
	.artwork {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px;
	}

	img {
		height: 140px;
		width: 140px;
		border-radius: 10px;
		border: 1px solid #d7d7d7;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	h2 {
		margin: 0 0 8px 0;
	}

	h4 {
		margin: 0;
		display: inline;
	}

	p {
		margin: 0 0 8px 8px;
	}

	h4 + p {
		display: inline;
	}

	.container {
		background: #fff;
		border: 1px solid #d6d6d6;
		border-radius: 6px;
		margin: 10px 20px;
		padding: 5px;
		height: 320px;
		position: relative;
	}

	.index {
		position: absolute;
		bottom: 0;
		right: 8px;
	}
</style>
