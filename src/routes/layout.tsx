import {
	$,
	Slot,
	component$,
	useContextProvider,
	useOn,
	useSignal,
	useStore,
	useVisibleTask$,
} from '@builder.io/qwik';
import {
	Form,
	RequestHandler,
	routeAction$,
	routeLoader$,
	useLocation,
	zod$,
} from '@builder.io/qwik-city';
import { ImageTransformerProps, useImageProvider } from 'qwik-image';
import Menu from '~/components/menu/Menu';
import { responseDataAdapter } from '~/components/popup/common';
import { getDB } from '~/components/popup/db';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID, IMAGE_RESOLUTIONS } from '~/constants';
import { Order } from '~/generated/graphql';
import { getAvailableCountriesQuery } from '~/providers/shop/checkout/checkout';
import { getCollections } from '~/providers/shop/collections/collections';
import { getActiveOrderQuery } from '~/providers/shop/orders/order';
import { ActiveCustomer, AppState } from '~/types';
import { extractLang } from '~/utils/i18n';
import Cart from '../components/cart/Cart';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export const useCollectionsLoader = routeLoader$(async () => {
	return await getCollections();
});

export const useAvailableCountriesLoader = routeLoader$(async () => {
	return await getAvailableCountriesQuery();
});

export const onRequest: RequestHandler = ({ request, locale }) => {
	locale(extractLang(request.headers.get('accept-language'), request.url));
};

export default component$(() => {
	const imageTransformer$ = $(({ src, width, height }: ImageTransformerProps): string => {
		return `${src}?w=${width}&h=${height}&format=webp`;
	});

	// Provide your default options
	useImageProvider({
		imageTransformer$,
		resolutions: IMAGE_RESOLUTIONS,
	});

	const collectionsSignal = useCollectionsLoader();
	const availableCountriesSignal = useAvailableCountriesLoader();

	const state = useStore<AppState>({
		showCart: false,
		showMenu: false,
		customer: { id: CUSTOMER_NOT_DEFINED_ID, firstName: '', lastName: '' } as ActiveCustomer,
		activeOrder: {} as Order,
		collections: collectionsSignal.value || [],
		availableCountries: availableCountriesSignal.value || [],
		shippingAddress: {
			id: '',
			city: '',
			company: '',
			countryCode:
				availableCountriesSignal.value && availableCountriesSignal.value.length > 0
					? availableCountriesSignal.value[0].code
					: '',
			fullName: '',
			phoneNumber: '',
			postalCode: '',
			province: '',
			streetLine1: '',
			streetLine2: '',
		},
		addressBook: [],
	});

	useContextProvider(APP_STATE, state);

	useVisibleTask$(async () => {
		state.activeOrder = await getActiveOrderQuery();
	});

	useVisibleTask$(({ track }) => {
		track(() => state.showCart);
		track(() => state.showMenu);

		state.showCart || state.showMenu
			? document.body.classList.add('overflow-hidden')
			: document.body.classList.remove('overflow-hidden');
	});

	useOn(
		'keydown',
		$((event: unknown) => {
			if ((event as KeyboardEvent).key === 'Escape') {
				state.showCart = false;
				state.showMenu = false;
			}
		})
	);

	const location = useLocation();
	// console.log('12312312*****************', location);
	const isRootPath = location.url.pathname === '/marketplace/';

	return (
		<div>
			<Header />
			<Cart />
			<Menu />
			<main class="pb-12 bg-gray-50">
				<Slot />
			</main>
			<Footer />
			{isRootPath && <NewsletterPopup />}
		</div>
	);
});

export const useSubscribe = routeAction$(
	async ({ email }, { error, env }) => {
		const newsletter = env.get('NEWSLETTER_BLOG')!;
		const db = getDB();

		try {
			// Insert record
			await db.execute({
				sql: 'insert into newsletters(email, website) values(?, ?)',
				args: [email, newsletter],
			});
			const response = await db.execute({
				sql: 'select * from newsletters where email = ? and website = ?',
				args: [email, newsletter],
			});
			const subscriber = responseDataAdapter(response);
			if (!subscriber[0]) {
				throw error(400, "Sorry something isn't right, please retry!");
			}
			// Instead of redirecting, we return a success status
			return { success: true };
		} catch (err: any) {
			if (err.message) {
				throw error(500, err.message);
			}
			throw err;
		}
	},
	zod$((z) => ({
		email: z.string(),
	}))
);

export const NewsletterPopup = component$(() => {
	const showPopup = useSignal(true);
	const popupRef = useSignal<HTMLDivElement | null>(null);
	const subscribe = useSubscribe();

	// const handleBackdropClick = $((event: MouseEvent) => {
	// 	if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
	// 		showPopup.value = false;
	// 	}
	// });

	return (
		<div>
			{showPopup.value && (
				<div
					class="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center"
					// onClick$={handleBackdropClick}
				>
					<div
						class="bg-white rounded-lg shadow-lg p-10 relative max-w-xl" // Increased padding and max-width
						ref={(el) => (popupRef.value = el)}
					>
						<button
							class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" // Adjusted top and right position
							// onClick$={() => (showPopup.value = false)}
						>
							&times;
						</button>
						{/* <h2 class="text-2xl font-bold mb-6">
							Sign up now to be among the first buyers or sellers on our marketplace!
						</h2> */}
						<p class="text-2xl font-bold mb-6">
							Sign Up Today and be the <strong>FIRST</strong> to join Asia's Largest Surplus
							Network!
						</p>
						<Form action={subscribe}>
							<input
								type="email"
								name="email"
								required
								class="border border-gray-300 rounded-md py-3 px-4 w-full mb-6" // Increased padding and margin
								placeholder="your email here"
							/>
							<button
								aria-disabled={subscribe.isRunning}
								disabled={subscribe.isRunning}
								type="submit"
								class="btn-primary"
							>
								Join Us
							</button>
						</Form>
						<div>{subscribe.isRunning && <LoadingAnimation />}</div>
						{
							subscribe.value?.success && (showPopup.value = false)
							// <p class="text-base text-red-500 pt-2">Thank you, you may close this now</p>
						}
						<br />
						<p class="text-xs text-gray-400">
							By joining us, you acknowledge and agree to let us register an account for you, and
							you accept our general{' '}
							<a
								href="https://surplusloop.com/tnc.pdf"
								class="text-blue-500 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Terms & Conditions ("T&C")
							</a>{' '}
							and{' '}
							<a
								href="https://surplusloop.com/privacy_policy.pdf"
								class="text-blue-500 underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Privacy Policy
							</a>
							.
						</p>
					</div>
				</div>
			)}
		</div>
	);
});

export const LoadingAnimation = () => {
	return (
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 h-8 animate-spin">
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" />
			</svg>
		</div>
	);
};
