import { partytownVite } from '@builder.io/partytown/utils';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikInsights } from '@builder.io/qwik-labs/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';
import Sitemap from 'vite-plugin-sitemap';
import tsconfigPaths from 'vite-tsconfig-paths';

const collections = [
	'kitchen-equipment-appliances',
	'machinery',
	'office-furniture',
	'hotel-furniture',
	'restaurant-cafe-furniture',
	'overstock-goods',
];
const dynamicCollectionsRoutes = collections.map((slug) => `/marketplace/collections/${slug}`);

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
			Sitemap({
				hostname: 'https://surplusloop.com',
				dynamicRoutes: [...dynamicCollectionsRoutes],
			}),
		],
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
