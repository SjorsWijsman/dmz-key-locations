import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$assets: './src/assets',
			$components: './src/components',
			$data: './src/data',
			$scripts: './src/scripts',
			$store: './src/store.js'
		}
	}
};

export default config;
