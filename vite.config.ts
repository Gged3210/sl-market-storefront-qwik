import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikInsights } from '@builder.io/qwik-labs/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { partytownVite } from '@builder.io/partytown/utils';
import { join } from 'path';

export default defineConfig(async (config) => {
	return {
		publicDir: '/marketplace/public/',
		base: '/marketplace',
		// Enable to analyze via source-map-explorer
		ssr: { target: 'webworker' },
		build: {
			sourcemap: config.mode === 'development',
		},
		server: {
			// proxy: {
			// 	'/': {
			// 		target: 'https://surplusloop.com/marketplace/',
			// 	},
			// },
			host: '0.0.0.0', // Add this to force IPv4 only
			port: 5173,
			hmr: {
				overlay: false,
			},
		},
		plugins: [
			qwikInsights({
				publicApiKey: loadEnv('', '.', '').VITE_QWIK_INSIGHTS_KEY,
			}),
			qwikCity(),
			qwikVite({
				devTools: {
					clickToSource: false,
				},
			}),
			tsconfigPaths(),
			partytownVite({ dest: join(__dirname, 'dist', '~partytown') }),
		],
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
