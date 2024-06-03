import type { CodegenConfig } from '@graphql-codegen/cli';

// let GRAPHQL_API = import.meta.env.VITE_IS_DEV
// 	? DEV_API
// 	: import.meta.env.VITE_IS_LOCAL
// 		? LOCAL_API
// 		: PROD_API;
// GRAPHQL_API = `${GRAPHQL_API}/admin-api`;

// const baseUrl =
// 	import.meta.env.VITE_IS_DEV == true
// 		? import.meta.env.VITE_BASE_DEV
// 		: import.meta.env.VITE_BASE_PROD;
// const adminApi = `${baseUrl}` + import.meta.env.VITE_ADMIN_API;

const adminApi = 'https://surplusloop.com/admin-api';
console.log('**adminApiadminApiadminApiadminApi***********adminApi***** adminApi', adminApi);

const config: CodegenConfig = {
	schema: [adminApi, 'type Mutation { createStripePaymentIntent: String }'],
	documents: ['"src/providers/admin/**/*.{ts,tsx}"', '!src/generated/*'],
	generates: {
		'src/generated/graphql-admin.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'src/generated/schema-admin.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
