import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';

if (!process.env.API_KEY) {
	dotenv.config();
}

const { API_KEY, API_SECRET } = process.env;

export const get = async (request) => {
	try {
		// ======== Hash them to get the Authorization token ========

		var apiHeaderTime = Math.floor(Date.now() / 1000);
		var data4Hash = API_KEY + API_SECRET + apiHeaderTime;
		const hash = CryptoJS.SHA1(data4Hash);
		const hash4Header = hash.toString(CryptoJS.enc.Hex);

		let options = {
			method: 'get',
			headers: {
				// not needed right now, maybe in future:  "Content-Type": "application/json",
				'X-Auth-Date': '' + apiHeaderTime,
				'X-Auth-Key': API_KEY,
				Authorization: hash4Header,
				'User-Agent': 'CurioCaster'
			}
		};

		let baseUrl = 'https://api.podcastindex.org/api/1.0/';
		let q = request.query.get('q');
		var url = baseUrl + q;
		const res = await fetch(url, options);
		console.log(url);

		response = {
			status: res.status,
			body: await res.json()
		};

		if (response.status === 404) {
			// user hasn't created a todo list.
			// start with an empty array
			console.log(res.text());
			return { body: [] };
		}

		return response;
	} catch (err) {
		return {
			status: 500,
			body: { message: 'Server Error' }
		};
	}
};
