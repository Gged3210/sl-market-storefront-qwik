import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { Insights } from '@builder.io/qwik-labs';
import { DEFAULT_METADATA_TITLE } from '~/constants';
import { ENV_VARIABLES } from '~/env';
import { generateDocumentHead } from '~/utils';
import { QwikPartytown } from '../partytown/partytown';

export const Head = component$(() => {
	const documentHead = useDocumentHead();
	const head =
		documentHead.meta.length > 0 ? documentHead : { ...documentHead, ...generateDocumentHead() };
	const loc = useLocation();

	return (
		<head>
			<meta charSet="utf-8" />
			<QwikPartytown forward={['gtag', 'dataLayer.push']} />
			{/* Google Tag Manager */}
			<script
				async
				type="text/partytown"
				src="https://www.googletagmanager.com/gtag/js?id=G-8KSG59E7TC"
			/>
			<script
				type="text/partytown"
				dangerouslySetInnerHTML={`
					window.dataLayer = window.dataLayer || [];
					window.gtag = function() {
					dataLayer.push(arguments);
					}
					gtag('js', new Date());
					gtag('config', 'G-8KSG59E7TC');
				`}
			/>
			{/* MS Clarity */}
			<script
				type="text/partytown"
				dangerouslySetInnerHTML={`
					(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "mnlgw1uilh");
				`}
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#1D4ED8" />
			<title>{head.title || DEFAULT_METADATA_TITLE}</title>

			<link rel="shortcut icon" href="/marketplace/public/favicon.ico" />
			<link rel="manifest" href="/marketplace/public/manifest.json" />
			<link rel="apple-touch-icon" href="/marketplace/public/logo-192-192.png" />
			<link rel="preconnect" href="https://surplusloop.com" />
			{/* <link rel="preconnect" href="https://surplusloop.com" /> //todo */}
			<link rel="canonical" href={loc.url.toString()} />

			{head.meta.map((m, key) => (
				<meta key={key} {...m} />
			))}

			{head.links.map((l, key) => (
				<link key={key} {...l} />
			))}

			{head.styles.map((s, key) => (
				<style key={key} {...s.props} dangerouslySetInnerHTML={s.style} />
			))}

			<meta name="description" content="Vendure Qwik Storefront" />

			<Insights publicApiKey={ENV_VARIABLES.VITE_QWIK_INSIGHTS_KEY} />
		</head>
	);
});
