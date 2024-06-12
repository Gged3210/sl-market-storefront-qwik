import { createContextId } from '@builder.io/qwik';
import { AppState } from './types';

export const APP_STATE = createContextId<AppState>('app_state');
export const AUTH_TOKEN = 'authToken';
export const CUSTOMER_NOT_DEFINED_ID = 'CUSTOMER_NOT_DEFINED_ID';
export const HEADER_AUTH_TOKEN_KEY = 'vendure-auth-token';
export const IMAGE_RESOLUTIONS = [1000, 800, 600, 400];
export const HOMEPAGE_IMAGE = '/marketplace/homepage.jpeg';
export const DEFAULT_METADATA_URL = 'https://surplusloop.com';
export const DEFAULT_METADATA_TITLE = 'SurplusLoop Platform & Marketplace';
export const DEFAULT_METADATA_DESCRIPTION = "Asia's Largest Surplus Network";
export const DEFAULT_METADATA_IMAGE = 'https://surplusloop.com/marketplace/logo.webp';
export const DEFAULT_LOCALE = 'en';
// TODO: replace DEV_API and PROD_API with your dev and prod API urls.
// export const DEV_API = 'https://readonlydemo.vendure.io';
// export const PROD_API = 'https://readonlydemo.vendure.io';
export const DEV_API = import.meta.env.VITE_DEV_URL;
export const PROD_API = import.meta.env.VITE_PROD_URL;
export const LOCAL_API = import.meta.env.VITE_DEV_URL;
export const HERO_TITLE = 'SurplusLoop Marketplace';
export const HERO_SUBTITLE = 'Where Businesses Buy & Sell Surplus, Smarter';

export const BASE_PROD = import.meta.env.VITE_BASE_PROD;
export const BASE_DEV = import.meta.env.VITE_BASE_DEV;

export const PATH_PROD = import.meta.env.VITE_PATH_PROD;
export const PATH_DEV = import.meta.env.VITE_PATH_DEV;

export const SHOP_API = import.meta.env.VITE_SHOP_API;
export const ADMIN_API = import.meta.env.VITE_ADMIN_API;
