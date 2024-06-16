import { component$ } from '@builder.io/qwik';
import Image from '/public/logo.webp?jsx';

export default component$(() => {
	return (
		<div>
			<Image alt="SurplusLoop Logo" style={{ width: '80px', height: '35px' }} />
		</div>
	);
});
