import z from 'zod';

const envVariables = z.object({
	VITE_VENDURE_PUBLIC_URL: z.string(),
	VITE_VENDURE_LOCAL_URL: z.string(),
	VITE_SHOW_PAYMENT_STEP: z.string(),
	VITE_SHOW_REVIEWS: z.string(),
	VITE_SECURE_COOKIE: z.string(),
	VITE_STRIPE_PUBLISHABLE_KEY: z.string(),
	VITE_QWIK_INSIGHTS_KEY: z.string(),
	VITE_IS_LOCAL: z.string(),
	VITE_IS_DEV: z.string(),
	VITE_DEV: z.string(),
});

export const ENV_VARIABLES = envVariables.parse(import.meta.env);
