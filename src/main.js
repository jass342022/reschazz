// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import config from '../gridsome.config';

import DefaultLayout from '~/layouts/Default';
import ClientOnly from 'vue-client-only';
import VueMarkdown from 'vue-markdown';

import ServiceList from '~/components/ServiceList';

import 'prismjs/themes/prism.css';

import './assets/scss/app.scss';
import shareIt from 'vue-share-it';
export default function (Vue, { router, head, isClient }) {
	head.htmlAttrs = { id: 'web' };

	// Set default layout as a global component

	Vue.component('Layout', DefaultLayout);
	Vue.component('ClientOnly', ClientOnly);
	Vue.component('ServiceList', ServiceList);
	Vue.component('VueMarkdown', VueMarkdown);
	Vue.component('shareIt', shareIt);

	if (isClient) {

		const Home = require('~/components/Home/Home').default;
		Vue.component('Home', Home);

		const Carousel = require('/node_modules/vue-carousel/src/Carousel').default;
		Vue.component('Carousel', Carousel);

		const Slide = require('/node_modules/vue-carousel/src/Slide').default;
		Vue.component('Slide', Slide);

		//import Sharethis from 'vue-sharethis';
		const Sharethis = require('/node_modules/vue-sharethis').default;
		Vue.component('Sharethis', Sharethis);

		window.bus = new Vue();
	}

	if (config.keywords && config.keywords.length !== 0) {
		head.meta.push({
			key: 'keywords',
			name: 'keywords',
			content: config.keywords
		});
	}
}
