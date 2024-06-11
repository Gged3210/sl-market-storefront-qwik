import { $, component$, useSignal } from '@builder.io/qwik';
import { Form, routeAction$, zod$ } from '@builder.io/qwik-city';
import { responseDataAdapter } from './common';
import { getDB } from './db';

export const useJokeVoteAction = routeAction$((props) => {
	// Leave it as an exercise for the reader to implement this.
	console.log('12!@!!!!!!!!!!!!!!!!!!!!!!!!!!!!VOTE', props);
});

export const useSubscribe = routeAction$(
	async ({ email }, { error, redirect, env }) => {
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
			throw redirect(302, '/');
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

export const NewsletterPopup = component$(() => {
	const showPopup = useSignal(true);
	const popupRef = useSignal<HTMLDivElement | null>(null);
	const subscribe = useJokeVoteAction();

	const handleBackdropClick = $((event: MouseEvent) => {
		if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
			showPopup.value = false;
		}
	});

	return (
		<div>
			{showPopup.value && (
				<div
					class="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center"
					onClick$={handleBackdropClick}
				>
					<div
						class="bg-white rounded-lg shadow-lg p-10 relative max-w-xl" // Increased padding and max-width
						ref={(el) => (popupRef.value = el)}
					>
						<button
							class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" // Adjusted top and right position
							onClick$={() => (showPopup.value = false)}
						>
							&times;
						</button>
						<h2 class="text-2xl font-bold mb-6">
							Sign up now to be among the first buyers or sellers on our marketplace!
						</h2>
						<Form action={subscribe}>
							<input
								type="email"
								name="email"
								required
								class="border border-gray-300 rounded-md py-3 px-4 w-full mb-6" // Increased padding and margin
								placeholder="Enter your email"
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
					</div>
				</div>
			)}
		</div>
	);
});
