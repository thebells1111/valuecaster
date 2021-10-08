/** @type {import('@sveltejs/kit').Config} */
import path from 'path';
import vercel from '@sveltejs/adapter-vercel';

const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
		ssr: true,
		vite: {
			resolve: {
				alias: {
					// these are the aliases and paths to them
					$functions: path.resolve('functions'),
					$: path.resolve('stores')
				}
			}
		}
	}
};

export default config;
