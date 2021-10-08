importScripts('helpers/localforage.js');
const podcastDB = localforage.createInstance({
	name: 'podcastDB'
});

const podcastStateDB = localforage.createInstance({
	name: 'podcastStateDB'
});

self.onmessage = processPodcast;

async function processPodcast(event) {
	let mainPodcastList = event.data;
	let promises = [];

	for (const podcast of mainPodcastList) {
		promises.push(getEpisodes(podcast));
	}

	let podcasts = await Promise.all(promises);

	postMessage({ podcasts: podcasts });
}

async function getEpisodes(podcast) {
	try {
		let urls = [
			'/api/queryindex?q=podcasts/byfeedid?id=' + podcast.id,
			'/api/queryindex?q=episodes/byfeedid?' +
				encodeURIComponent(`id=${podcast.id}&max=1000&fulltext&since=${podcast.lastUpdateTime}`)
		];
		let feeds = urls.map((url) => fetch(url).then((response) => response.json()));
		let dbs = podcastStateDB.getItem(`${podcast.id}`);
		let data = await Promise.all([dbs, ...feeds]);

		const [dbState, channel, episodes] = data;

		if (channel.status) {
			let feed = channel.feed;
			let newEpisodes = episodes.items;
			let seenState = dbState?.seen || new Set();
			let allEpisodes = newEpisodes.concat(podcast.episodes);
			allEpisodes.splice(Math.min(1000, allEpisodes.length, feed.episodeCount));
			feed.episodes = allEpisodes;
			let intersection = new Set();

			allEpisodes.forEach((v) => {
				if (seenState.has(v.id)) {
					intersection.add(v.id);
				}
			});

			let newState = dbState || {};
			newState.seen = intersection;
			postMessage({ count: { id: podcast.id, state: newState } });
			podcastDB.setItem(`${podcast.id}`, podcast);
			return feed;
		}

		podcastDB.setItem(`${podcast.id}`, podcast);
		return podcast;
	} catch (err) {
		console.log(err);
	}
}
