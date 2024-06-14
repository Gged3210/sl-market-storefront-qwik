import { partytownVite } from '@builder.io/partytown/utils';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikInsights } from '@builder.io/qwik-labs/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';
import Sitemap from 'vite-plugin-sitemap';
import tsconfigPaths from 'vite-tsconfig-paths';

const collections = [
	'live-auctions',
	'machinery',
	'office-furniture',
	'hotel-furniture',
	'restaurant-cafe-furniture',
	'overstock-goods',
	'kitchen-equipment-appliances',
	'computer',
	'property',
	'scrap',
	'waste',
	'services',
];
const dynamicCollectionsRoutes = collections.map((slug) => `/marketplace/collections/${slug}/`);

const products = [
	'solid-cool-counter-chiller-fridge--t1500l2tn.v',
	'beko-2-door-fridge-270l-pro-smart-inverter/',
	'hitachi-inverter-2-doors-fridge---335liters-r-v420p3m/',
	'bar-stool',
	'bar-stool-black',
	'round-stainless-steel-stool',
	'round-foldable-dining-table',
	'bar-chair-orange',
	'bar-chair-grey',
	'bar-chair',
	'bar-chair-red',
	'glass-lazy-susan',
	'6ft-banquet-table',
	'5ft-banquet-table',
	'metal-dining-chair',
	'haworth-dining-chair',
	'divider',
	'dining-chair',
	'barber-chair',
	'marquee-bar-stool',
	'wooden-dining-chair',
	'dining-table',
	'bar-table',
	'ikea-dining-table-model-linnmon-adils',
	'nu-vu-oven-poofer-model-sub-123pi',
	'700mm-dining-table-bar-table',
	'single-bowl-basin-stainless-steel',
	'double-bowl-basin-stainless-steel',
	'grease-trap',
	'square-high-table',
	'6ft-single-bowl-basin-stainless-steel',
	'4ft-single-bowl-basin-stainless-steel',
	'automatic-meat-slicer-machine',
	'lakes-wine-cooler-model-jc-188-a23',
	'lakes-wine-chiller-black-model-jc2-118l-3',
	'cube-ice-maker',
	'commercial-rotating-red-bean-pancake-maker',
	'commercial-ice-cream-machine',
	'teppanyaki-griller',
	'solid-cool-cake-chiller',
	'luxury-dining-room-c-w-mirror',
	'6-seater-canteen-table-set-knock-down-frame',
	'2-tier-working-table-stainless-steel',
	'3v-5ft-banquet-table',
	'plan-hanger-stand',
	'display-rack',
	'cambro-adjustable-dish-caddy',
	'chrome-plated-tray-stand',
	'ikea-outdoor-table',
	'stall-kiosk',
	'wingkin-espresso-coffee-machine-model-350b',
	'earth-coffee-machine-rt2',
	'saeco-royal-cappuccino-coffee-machine',
	'jura-impressa-f50-classic-coffee-machine',
	'krups-dolce-gusto-genio-2-automatic-coffee-machine',
	'lacimbali-m39-eccellenza-italiana-dal-1912-espresso-coffee-machine',
	'tea-amp-coffee-brewer-machine',
	'bunn-automatic-coffee-machine-urn',
	'saeco-aulika-coffee-machine',
	'freser-espresso-coffee-machine',
	'double-deep-fryer-model-fryh18c',
	'vacuum-meat-marinator-machine',
	'white-45-5cm-h-metal-stool',
	'rational-combi-oven-model-scc-we-61',
	'sinmag-2-tier-display-chiller-open-showcase',
	'faber-built-in-oven',
	'sinmag-single-door-retarder-proofer',
	'square-bar-table',
	'stool-grey-fabric-seat-wooden-leg',
	'dining-chair-walnut-pvc',
	'60d-rubber-wood-lotus-flower-shape-table-top-walnut-color',
	'60d-rubber-wood-round-table-top-walnut-color',
	'60d-rubber-wood-wavey-square-shape-table-top-walnut-color',
	'600-terrazzo-square-table-top',
	'1200-700-plywood-table-top-bevel-edge-solid-wood-veneer',
	'600d-plywood-round-table-top-bevel-edge-solid-wood-veneer',
	'700-plywood-square-table-top-bevel-edge-solid-wood-veneer',
	'1200-700-plywood-table-top-5cm-thick-edge-solid-wood-veneer',
	'600-plywood-round-table-top-5cm-thick-edge-solid-wood-veneer',
	'700-plywood-square-table-top-5cm-thick-edge-solid-wood-veneer',
	'round-dining-table',
	'4-tier-stainless-steel-rack',
	'snow-7ft-chest-freezer',
	'solid-cool-chest-freezer',
	'5ft-round-banquet-table',
	'gas-steamer',
	'bar-stool-red-pvc-seat-chrome-leg-promotion-nett',
	'berjaya-4-door-upright-freezer',
	'bar-stool-brown-black-fabric-seat-metal-leg-promotion-nett',
	'solid-cool-display-chiller-cooler',
	'outdoor-dining-chair-teslin-mesh-alumnium-alloy-frame',
	'executive-mesh-high-back-chair',
	'ergonomic-mesh-chair',
	'haworth-manager-guest-chair',
	'student-chair',
	'banquet-chair-dining-chair',
	'executive-high-back-chair-chrome-leg',
	'wooden-coffee-table',
	'director-chair',
	'visitor-chair',
	'mesh-high-back-chair',
	'luxury-royal-king-throne-chair',
	'1-seater-sofa',
	'sofa-bed-c-w-pillow',
	'single-seater-arm-chair',
	'executive-high-back-chair-metal-leg',
	'executive-medium-back-chair-chrome-leg',
	'medium-back-chair-chrome-leg',
	'low-back-visitor-chair',
	'executive-visitor-chair',
	'netting-medium-back-chair',
	'medium-back-chair',
	'low-back-chair',
	'3-seater-link-chair',
	'4-seater-link-chair',
	'luggage-rack',
	'artmatrix-low-back-chair',
	'exeucutive-high-back-chair-chrome-base',
	'high-back-chair',
	'dark-brown-director-chair-with-footrest-pu-seat-5-star-chrome-base',
	'grey-mesh-high-back-chair-chrome-base-nett',
	'grey-mesh-fabric-visitor-chair',
	'black-mesh-fabric-mesh-high-back-chair-5-star-nylon-base',
	'black-mesh-fabric-medium-back-chair-chrome-base',
	'black-mesh-fabric-mesh-visitor-chair-epoxy-base',
	'black-mesh-back-visitor-chair-chrome-base',
	'grey-mesh-netting-high-back-chair-nylon-base',
	'black-mesh-mesh-visitor-chair-epoxy-frame',
	'black-mesh-high-back-chair-chrome-base-nett',
	'bristol-netting-low-back-chair-black-chrome-leg-model-como-promotion-nett',
	'black-pu-executive-high-back-chair-chrome-base',
	'black-mesh-fabric-mesh-visitor-chair-chrome-base',
	'euro-medium-back-chair',
	'seminar-traning-chair',
	'dark-brown-executive-visitor-chair-pu-seat-chrome-base',
	'blue-student-chair-come-with-writting-table',
	'black-executive-director-chair-pu-seat-chrome-base',
	'chesterfield-3-seater-sofa',
	'executive-netting-high-back-chair',
	'3-seater-sofa',
	'stool',
	'blue-student-chair-come-with-writing-table',
	'2-seater-long-bench-booth-sofa',
	'black-student-chair-come-with-writting-table',
	'netting-low-back-chair',
	'stool-2',
	'ikea-netting-high-back-chair',
	'sofa-bed',
	'medium-back-chair-2',
	'euro-low-back-chair',
	'netting-medium-back-chair-2',
	'executive-mesh-high-back-chair-2',
	'red-banquet-chair-gold-color-metal-frame-nett',
	'milly-h-mesh-high-back-chair-fabric-seat-5-star-nylon-base',
	'tria-h-ergonomic-full-mesh-high-back-chair-with-footrest-5-star-aluminium-base',
	'robbin-h-ergonomic-fabric-high-back-chair-5-star-chrome-base',
	'euro-visitor-chair',
	'1-seater-sofa-2',
	'medium-back-chair-3',
	'artmatrix-netting-medium-back-chair',
	'7ft-director-table',
	'3000-4800mm-boat-shape-conference-table',
	'12ft-oval-conference-table',
	'900-1200mm-round-conference-table',
	'1800-2400mm-oval-conference-table',
	'1800-2400mm-rectangular-conference-table',
	'1500mm-lshape-table',
	'1500mm-lshape-table-3',
	'1500mm-lshape-table-2',
	'1800mm-lshape-table',
	'1200-1500mm-standard-table',
	'1200-1800mm-standard-table',
	'1200mm-boat-shape-conference-table',
	'1200mm-oval-shape-conference-table',
	'1800mm-curve-managerial-table',
	'1800mm-arch-managerial-table',
	'1800mm-oval-shape-managerial-table',
	'1800mm-curve-arch-managerial-table',
	'executive-director-table',
	'4ft-reception-counter',
	'5ft-standard-table-c-w-pedestal-side-cupboard-right',
	'3ft-standard-table',
	'4-5ft-standard-table-c-w-pedestal',
	'5ft-standard-table-c-w-pedestal',
	'4ft-study-table',
	'6ft-study-table',
	'4ft-standard-table',
	'6ft-lshape-table-c-w-pedestal-side-cupboard',
	'2400mm-executive-director-table-set',
	'4ft-round-conference-table',
	'8ft-boat-shape-conference-table-wooden-base',
	'10ft-boat-shape-conference-table-wooden-base',
	'1200-1200-conference-extension-for-table-cbs2412-3012-3612',
	'8ft-boat-shape-conference-table-wooden-base-2',
	'12ft-boat-shape-conference-table-wooden-base',
	'10ft-boat-shape-conference-table-wooden-base-2',
	'6ft-standard-table-c-w-pedestal',
	'6ft-lshape-table-c-w-pedestal',
	'almond-oak-white-1800mm-director-table-c-w-side-cupboard-amp-1d1f-mobile-pedestal-metal-leg',
	'sabble-brown-matte-grey-1800mm-director-table-c-w-side-cupboard-amp-1d1f-mobile-pedestal-metal-leg',
	'sabble-brown-matte-grey-1200mm-standard-table-c-w-3d-attach-pedestal-matte-black-metal-leg',
	'6-5ft-rectangular-conference-table-metal-base',
	'6ft-reception-counter',
	'4ft-reception-table',
	'3ft-reception-table',
	'cur-executive-table',
	'1-seater-workstation-table',
	'1-seater-workstation',
	'reception-counter-table',
	'2-seater-workstation',
	'2400mm-8ft-director-table-come-with-side-cupboard',
	'ikea-4-5ft-conference-table-white-metal-leg',
	'lshape-1-seater-workstation-c-w-pedestal-white-table-red-partition-board',
	'2400mm-executive-director-table-come-with-side-cupboard',
	'2000mm-executive-managerial-table-come-with-side-cupboard',
	'3000mm-executive-director-table-come-with-side-cupboard',
	'2400mm-executive-conference-table',
	'4-seater-workstation-come-with-drawer',
	'2ft-printer-table',
	'6ft-lshape-table-c-w-attached-pedestal-2',
	'6ft-standard-table',
	'6ft-reception-counter-2',
	'6ft-lshape-table-c-w-attach-pedestal-2',
	'6ft-lshape-table-c-w-pedestal-2',
	'6ft-lshape-table-c-w-attached-pedestal',
	'6ft-standard-table-c-w-pedestal-side-cupboard',
	'3600mm-executive-conference-table',
	'4ft-table',
	'left-1698mm-lshape-reception-table-come-with-attached-pedestal-nett',
	'1200mm-reception-table-come-with-attached-drawer-nett',
	'2000mm-reception-table-come-with-attached-drawer',
	'2000mm-reception-table-come-with-3-drawer-mobile-pedestal',
	'2020mm-reception-table-with-attached-drawer',
	'10ft-conference-table',
	'dark-oak-black-jh-4-jh-c01-30-3000mm-10ft-executive-conference-table',
	'dark-walnut-dark-grey-881-3000mm-10ft-executive-conference-table',
	'6ft-lshape-table-c-w-attach-pedestal',
	'used-office-study-table-to-let-go',
	'office-table',
	'meja-office',
	'office-table-total-3-units',
	'steel-office-table',
	'4ft-maple-office-table-tc199',
	'kerusi-meja-pejabat-untuk-di-jual-di-denai-alam',
	'office-table-reception-table',
	'office-partition-table',
	'custom-made-office-workstation-table',
	'boss-director-manager-table-l-shape-office-desk-5',
	'l-shape-l-shape-table-meja-pejabat-office-desk',
	'black-hitam-table-meja-pejabat-office-desk-ikea-2',
	'boss-director-manager-table-desk-l-shape-office-6',
	'black-l-shape-l-shape-table-meja-office-desk-2',
	'100cm-white-table-meja-pejabat-office-desk-home-1',
	'l-shape-l-shape-table-meja-director-desk-pejabat-8',
	'company-big-meeting-table-long-desk-meja-office-4',
	'table-l-shape-boss-office-director-manager-desk-4',
	'dark-brown-table-meja-pejabat-study-office-ikea-3',
	'white-table-ikea-meja-pejabat-office-desk-4',
	'brown-meja-table-pejabat-desk-office-study-big-2',
	'white-table-ikea-meja-pejabat-office-desk-6',
	'grey-desk-table-meja-pejabat-big-office-pejabat-1',
	'dark-brown-table-meja-pejabat-study-office-ikea-4',
	'100x55-black-hitam-table-meja-pejabat-ikea-desk-6',
	'brown-table-desk-office-meja-big-wooden-good-6',
	'white-grey-table-meja-pejabat-study-office-ikea-2',
	'black-meja-table-pejabat-desk-office-study-big-2',
	'brown-desk-table-meja-pejabat-big-office-pejabat-1',
	'link-work-ikea-table-meja-pejabat-office-desk-5',
	'boss-director-manager-table-l-shape-office-desk-26',
	'work-table-link-ikea-meja-pejabat-office-desk-28',
	'work-table-link-ikea-meja-pejabat-office-desk-12',
	'boss-director-manager-table-l-shape-office-desk-8',
	'work-table-link-meja-pejabat-office-ikea-desk-1',
	'boss-director-manager-table-l-shape-office-desk-23',
	'boss-director-l-shape-manager-table-office-desk-10',
	'l-shape-l-shape-table-meja-pejabat-office-desk-1',
	'office-table-large-2-drawer-4-feet-grey-like-new',
	'office-table-meja-pejabat-study-desk-meja',
	'4ft-maple-wooden-office-table-ta696',
	'3ft-maple-wooden-office-table-tq163',
	'3ft-grey-office-table-wt-drawer-tz477',
	'grey-5ft-office-table-tb878',
	'office-workstation-table-for-4-pax-with-solid-wood',
	'meja-pejabat-kayu',
	'office-table-wooden',
	'sit-stand-office-table',
	'5ft-grey-l-shape-office-table-wt-drawer-tc410',
	'kitchencabinet-almirah-office-table-stone-tabletop',
	'of-series-office-table-grey',
	'office-table-code-ot-48',
	'meja-office-terpakai-dari-singapore',
	'office-computer-table',
	'office-table-l-shape-and-partition-divider',
	'8pax-office-meeting-room-table',
	'standing-table-desk-office-table-portable-table',
	'table-office',
	'study-table-office-table',
	'meja-office-2',
	'office-chair-table-cabinet-1-set-for-sale',
	'office-director-table-c-w-metal-leg',
	'study-office-table-a',
	'office-chair-with-mini-table-clearance',
	'large-office-table',
	'brown-2-5ft-steel-leg-office-table-tz240',
	'5ft-grey-office-table-wt-drawer-tb332',
	'5ft-grey-office-table-wt-drawer-ta285',
	'3ft-maple-office-table-wt-drawer-ta770',
	'6ft-grey-office-table-ta308',
	'4ft-grey-office-table-tc233',
	'white-soild-4ft-office-table-tn515',
	'5ft-grey-office-table-wt-drawer-tc230',
	'4ft-grey-office-table-tc425',
	'5ft-grey-office-table-tc435',
	'pejabat-kerusi-meja',
	'5ft-office-table',
	'l-shape-5ft-office-table',
	'office-table-foldable',
	'preloved-office-table-with-drawer',
	'black-kerusi-chair-pejabat-roda-roller-ikea-6',
	'office-chair',
	'office-visitor-chair-aphros',
	'office-chair-new-ready-stock',
	'kerusi-office',
	'office-chair-mesh-back',
	'black-steel-leg-office-chair-ta755',
	'black-brown-high-back-office-chair-tb589',
	'office-chair-m-81011-28-5',
	'ergotune-supreme-12-ergonomic-office-chair',
	'black-net-back-roller-office-chair-tc416',
	'black-net-back-roller-office-chair-tc418',
	'director-high-back-office-chair',
	'mesh-mediumback-kerusi-office-chairs-2-types',
	'kerusi-pejabat-komputer',
	'various-type-of-office-chair',
	'kerusi-office-second-hand',
	'office-chair-rollable',
	'ready-stock-mesh-office-chair',
	'adjustable-office-chair',
	'kerusi-pejabat-baru-murah',
	'study-chair-office-chair',
	'herman-miller-office-chair',
	'fabric-office-chair',
	'office-massage-chair',
	'cheap-branded-high-back-ergonomic-office-chair',
	'chair-office',
	'forsale-office-chair',
	'office-chair-6',
	'office-chair-special-wheel',
	'office-chair-5',
	'office-chair-table-cabinet-1-set-for-sale-2',
	'office-chair-kerusi-pejabat',
	'office-chair-with-mini-table-clearance-2',
	'adjustable-executive-kerusi-office-chair-footrest',
	'ikea-office-chair',
	'office-chair-4',
	'high-back-office-chair',
	'office-chair-3',
	'ikea-office-chair-2-units',
	'black-office-chair',
	'black-mid-back-roller-office-chair-tn825',
	'pink-roller-mid-high-back-office-chair-tq412',
	'pink-high-back-roller-office-chair-tz127',
	'blue-roller-office-chair-tz120',
	'black-roller-cushion-office-chair-tz962',
	'grey-fabric-mid-high-back-office-chair-ta552',
	'steel-leg-yellow-office-chair-tb352',
	'green-roller-cushion-office-chair-tb342',
	'black-net-back-office-chair-tc200',
	'rocker-cushion-office-chair',
	'black-roller-office-chair-tc430',
	'red-roller-office-chair-tc438',
	'pejabat-kerusi-meja-2',
	'kerusi-pejabat',
	'office-chair-2',
	'office-chair-swivelling',
	'manager-s-office-chair',
	'caterpillar-cat950-wheel-loader',
	'caterpillar-950-wheel-loader',
	'cat-950-wheel-loader',
	'cat-950-wheel-loader-2',
	'caterpillar-930-wheel-loader-shovel-case',
	'caterpiliar-cat950-wheel-loader',
	'caterpillar-wheel-loader-shovel',
	'komatsu-wheel-loader-530-shovel-backhoe-forklift-2',
	'toyota-forklift-5-ton',
	'japan-direct-imported-toyota-3-ton-diesel-forklift',
	'toyota-4-ton-diesel-forklift',
	'japan-direct-import-recond-3-ton-toyota-forklift',
	'toyota-4-5-ton-7fd450-diesel-forklift',
	'toyota-forklift',
	'japan-direct-imported-toyota-3-ton-forklift',
	'japan-import-recond-toyota-forklift-3-ton',
	'toyota-diesel-forklift-recon-3-ton-new-model',
	'japan-direct-import-toyota-shovel-loader-forklift',
	'new-baoli-3ton-forklift-for-sales',
	'manitou-rough-terrain-forklift-jcb-926-4x4',
	'toyota-forklift-7fd-diesel-2023-4ton-japan-geran',
	'toyota-3-ton-8-series-latest-diesel-forklift-5m',
	'japan-imported-bobcat-skid-steer-loader-forklift-2',
	'toyota-forklift-4-5-ton',
	'toyota-6-ton-5fdm60-diesel-forklift',
	'imow-new-battery-forklift-3-0-ton',
	'toyota-forklift-8fd35n-latest-model-3-5-ton',
	'japan-direct-import-toyota-4-5-ton-diesel-forklift',
	'japan-imported-bobcat-skid-steer-loader-forklift',
	'japan-direct-import-toyota-5-ton-diesel-forklift',
	'toyota-forklift-3-ton-paper-roll-clamp-full-loan',
	'japan-direct-imported-toyota-4-ton-diesel-forklift',
	'toyota-forklift-8fd50n-diesel-new-model-5-ton',
	'direct-japan-import-komatsu-shovel-loader-forklift',
	'japan-direct-import-tcm-forklift-diesel-7-ton',
	'japan-direct-imported-nissan-7-ton-diesel-forklift',
	'japan-direct-imported-toyota-7-ton-diesel-forklift',
	'direct-imported-japan-toyota-7-ton-diesel-forklift',
	'7-tonne-gas-engine-forklift',
	'japan-imported-toyota-11-5-ton-diesel-forklift',
	'imported-jcb-532-120-telescopic-forklift-12meter',
	'imported-recond-jcb-telescopic-forklift-5m-17m',
	'imported-used-jcb-telescopic-forklift-540-140',
	'direct-japan-import-recond-15-ton-toyota-forklift',
	'japan-direct-import-toyota-15-ton-diesel-forklift',
	'direct-import-linde-lansing-40-ton-laden-forklift',
	'japan-mitsubishi-fd210-21-ton-spreader-forklift',
	'hino-isuzu-fuso-17ft-lorry-crane-year-2024',
	'isuzu-npr85-crane-cargo',
	'isuzu-hino-lorry-arm-crane-bdm7500kg-unregister',
	'hino-isuzu-lorry-crane-5-boom-bdm7500kg-unregister',
	'isuzu-npr-lorry-arm-crane-bdm-7500kg-unregister',
	'hino-double-cab-lorry-crane-isuzu-crew-cab-crane',
	'hino-lorry-crane-17ft-isuzu-lorry-crane-bdm7500kg',
	'lorry-crane',
	'isuzu-crane-tipper-hino-tipper-crane-unregister',
	'hino-crane-tipper-bdm7500kg-unregister',
	'xzc730l-new-tipper-crane',
	'hino-new-xzc730l-cargo-crane',
	'xzc730l-new-cargo-crane-tadano-tm-ze290-18ft',
	'xzc730r-wkfrl3-18ft-side-wooden-tipper-crane',
	'hino-isuzu-fuso-lorry-arm-crane-17ft-bdm7500kg',
	'isuzu-npr-lorry-arm-crane-bdm7500kg-unregistered',
	'lorry-crane-isuzu-hino-lorry-arm-crane-unregiste',
	'hino-isuzu-lorry-arm-crane-17ft-register-yr-2024',
	'lori-crane',
	'lori-crane-recon-hino-xzu411-dan-tadano-2-6-tan',
	'hino-xzu-lorry-crane-tipper-bdm7500kg-unregister',
	'isuzu-pro-crane-tipper',
	'hino-tipper-crane-3ton',
	'hino-500-rebuild-lorry-crane',
	'hino-fc-crane-rebuild-wooden-body-18fit',
	'new-rebuild-isuzu-npr75-cargo-with-crane',
	'volvo-crane-2019',
	'crane-kato-nk-350-nissan',
	'hino-nissan-lorry-crane-self-loader-cargo',
	'kato-13t-crane',
	'crane-tadano-25t-m5',
	'mobile-crane-kobelco',
	'25t-kato-crane',
	'nissan-cd48-rebuild-lorry-crane',
	'hino-profia-lorry-crane-with-wooden-body',
	'mobile-crane-25ton',
	'26t-crane',
	'50t-rough-terrain-crane',
	'150t-crawler-crane',
	'caterpillar-bulldozer-d6d-direct-injection-di',
	'caterpillar-bulldozer-d6d',
	'mini-and-long-arm-excavator-bulldozer',
	'used-excavator-l-bulldozer-l-compactor-for-sell',
	'komatsu-wheel-loader-530-shovel-backhoe-forklift',
	'backhoe-580f',
	'jcb-case-580g-backhoe',
	'used-jcb-backhoe-for-sale-in-kuching-sarawak',
	'case-backhoe-super-e',
	'backhoe-case-580g',
	'backhoe-jcb-case-580-k-2010',
	'backhoe',
	'backhoe-580e-untuk-di-jual',
	'backhoe-jcb-case-580-super-k-last-model',
	'backhoe-loader-model-caterpillar-416d',
	'backhoe-case-580-k',
	'backhoe-case-k3-2010',
	'backhoe-case-580e',
	'backhoe-case-jcb-214-super-3cx-full-cabin-2019',
	'backhoe-jcb-case-580-l2',
	'2011-17-import-hitachi-backoe-loader-excavator',
	'580-super-n-case-backhoe-loader-4-5cc-2011-2wd',
	'backhoe-loader-jcb-3cx-2wd-eco',
	'kubota-excavator-kx033-11225',
	'sales-for-excavator-komatsu-pc15-2',
	'hitachi-excavator-uh07-07',
	'fully-recon-imported-komatsu-mini-excavator',
	'mini-excavator-1ton',
	'mini-excavator',
	'hanix-h27-mini-excavator-japan-import',
	'airman-traktor-excavator-ax40u',
	'komatsu-pc30-5-excavator',
	'excavator',
	'imported-used-kubota-excavator-kh021',
	'mini-excavator-hitachi-ex30-1',
	'hitachi-excavator-uh10-07',
	'fully-recond-imported-japan-mini-excavator-pc10-6',
	'japan-recond-kubota-kx012-excavator-1-5-tonnes',
	'excavator-jengkaut',
	'fully-recon-imported-kubota-mini-excavator-kh027',
	'imported-used-hanix-excavator-h30',
	'imported-used-komatsu-excavator-pc05',
	'japan-recond-kubota-kh31-mini-excavator',
	'mini-excavator-pc25',
	'fully-recond-imported-japan-mini-excavator-pc20-3',
	'excavator-hitachi-uh-081',
	'kubota-u30-mini-excavator',
	'fully-recond-imported-japan-mini-excavator-mm20r',
	'excavator-ms120-2',
	'fully-recon-imported-japan-mini-excavator-kx021',
	'recond-kobelco-excavator',
	'fully-recond-imported-japan-mini-excavator-ex30u',
	'imported-used-yanmar-excavator-b37',
	'excavator-for-sell',
	'mini-excavator-jengkaut-doosan-dh55-5-5tan',
	'fully-recon-imported-hitachi-mini-excavator-uh35',
	'kubota-u30-mini-excavator-japan-import',
	'hitachi-excavator-083-used',
	'used-excavator-hitachi-uh083-for-sell',
	'imported-used-komatsu-excavator-pc30-7',
	'fully-recond-imported-japan-mini-excavator-pc50u',
	'excavator-sumitomo-265-ej',
	'fully-recon-imported-japan-kobelco-mini-excavator',
	'japan-imported-hitachi-wheel-excavator',
	'recond-hitachi-excavator',
	'excavator-sumitomo-265-fj-2',
	'hitachi-excavator-uh063-for-sale',
	'excavator-hitachi-ex120-1',
	'compact-excavator-sany-sy60c-for-sale',
	'hitachi-excavator-ex200-5',
	'sh100-c2-sumitomo-excavator',
	'sumitomo-excavator-sh-300-3',
	'excavator-kobelco',
	'japan-direct-imported-hitachi-10-tons-excavator',
	'komatsu-pc-138us-2-excavator',
	'imported-used-hitachi-excavator-ex60-3',
	'excavator-sh120-a3',
	'2011-17-import-hitachi-backoe-loader-excavator-2',
	'sumitomo-sh100a1-excavator',
	'imported-sumitomo-sh120-c2-excavator-for-sales',
	'excavator-sumitomo-sh120a3-unregister',
	'hitachi-ex200-1-excavator-for-sale',
	'used-recond-excavator',
	'sumitomo-sh200a1-excavator',
	'volvo-ec210b-excavator',
	'sumitomo-sh200-c2-excavator-imported-unregistered',
	'excavator-mesin-import-komatsu-pc200-7',
	'volvo-ec300dl-excavator',
	'hitachi-excavator-semi-long-arm-120-5-recond',
	'hitachi-excavator-zx240lc-3',
	'komatsu-pc-350-7-excavator',
	'hitachi-ex120-5-excavator',
	'sumitomo-sh330-5-excavator',
	'hitachi-excavator-ex100-1',
	'excavator-sumitomo-sh-200-a3-for-sale',
	'imported-japan-hitachi-zx120-e-excavator-12-ton',
	'doosan-dx-220-excavator-recond',
	'volvo-ec460blc-excavator',
	'caterpillar-336d2l-excavator',
	'komatsu-excavator-pc300lc-7l-ready-unit',
	'sumitomo-excavator-sh330-5-for-sale',
	'sumitomo-2800fj2-telescopic-dipper-arm-excavator',
	'imported-japan-kobelco-sk200-8-excavator-for-sale',
	'japan-imported-sumitomo-sh200-5-excavator-20-ton',
	'harga-menarik-sumitomo-sh200-5-excavator-20-ton',
	'volvo-ec350dl-excavator',
];
const dynamicProductsRoutes = products.map((slug) => `/marketplace/products/${slug}/`);

export default defineConfig(async (config) => {
	return {
		// publicDir: '/marketplace',
		base: '/marketplace',
		ssr: { target: 'webworker' },
		build: {
			// sourcemap: config.mode === 'development',
		},
		server: {
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
				basePath: '/marketplace',
				dynamicRoutes: [...dynamicCollectionsRoutes, ...dynamicProductsRoutes],
			}),
		],
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
