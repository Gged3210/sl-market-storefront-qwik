import type { CodegenConfig } from '@graphql-codegen/cli';

// let GRAPHQL_API = import.meta.env.VITE_IS_DEV
// 	? DEV_API
// 	: import.meta.env.VITE_IS_LOCAL
// 		? LOCAL_API
// 		: PROD_API;

// GRAPHQL_API = `${GRAPHQL_API}/shop-api`;

// const path = import.meta.env.VITE_IS_DEV == true ? import.meta.env.VITE_PATH_DEV : import.meta.env.VITE_PATH_PROD ;
const baseUrl =
	import.meta.env.VITE_IS_DEV == true
		? import.meta.env.VITE_BASE_DEV
		: import.meta.env.VITE_BASE_PROD;
const shopApi = `${baseUrl}` + import.meta.env.VITE_SHOP_API;

console.log('**shopApishopApishopApishopApishopApi***********SHOP***** SHOP', shopApi);

const config: CodegenConfig = {
	schema: [
		shopApi,
		'type Mutation { createStripePaymentIntent: String }',
		'type Query { generateBraintreeClientToken(orderId: ID, includeCustomerId: Boolean): String }',
	],
	documents: ['"src/providers/shop/**/*.{ts,tsx}"', '!src/generated/*'],
	generates: {
		'src/generated/graphql-shop.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'src/generated/schema-shop.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
