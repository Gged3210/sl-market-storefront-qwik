import { $, component$, useSignal } from '@builder.io/qwik';

export const NewsletterPopup = component$(() => {
	const showPopup = useSignal(true);
	const popupRef = useSignal<HTMLDivElement | null>(null);

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
						<form>
							<input
								type="email"
								class="border border-gray-300 rounded-md py-3 px-4 w-full mb-6" // Increased padding and margin
								placeholder="Enter your email"
							/>
							<button
								type="submit"
								class="btn-primary" // Increased padding
							>
								Join Us
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
});
