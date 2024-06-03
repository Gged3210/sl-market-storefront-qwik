import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikInsights } from '@builder.io/qwik-labs/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(async (config) => {
	return {
		base: '/market',
		// Enable to analyze via source-map-explorer
		ssr: { target: 'webworker' },
		build: {
			sourcemap: config.mode === 'development',
		},
		server: {
			// proxy: {
			// 	'/': {
			// 		target: 'https://surplusloop.com/market/',
			// 	},
			// },
			host: '0.0.0.0', // Add this to force IPv4 only
			port: 5173,
		},
		plugins: [
			qwikInsights({
				publicApiKey: loadEnv('', '.', '').VITE_QWIK_INSIGHTS_KEY,
			}),
			qwikCity(),
			qwikVite(),
			tsconfigPaths(),
		],
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
