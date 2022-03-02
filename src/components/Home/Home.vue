<template>
	<div class="Home" :class="className" id="home"> 
		<transition name="blur">
			<button class="Button Logo is-black" ref="logo" @click="onClickLogo"></button>
		</transition>
		<Header @select="onClickHeaderLink" />

		<VideoPlayer />

		<!--	<Slideshow @select="onNavigation" /> !-->
		<Sliderchess />
		<transition name="blur">
			<Content ref="weare" />
		</transition>

		<Cases ref="cases" />

		<transition name="blur">
			<Studios ref="studios" />
		</transition>

		<Imaginarium ref="imaginarium" />

		<Clients ref="friends" />

		<ServiceList ref="services" />

		<PostList ref="blog" />

		<transition name="blur">
			<Footer />
		</transition>
	</div>
</template>

<script>
	import smoothscroll from 'smoothscroll-polyfill';

	import mixin from '@/mixins';
	import Header from './Header';
	import Slideshow from './Slideshow';
	import Content from './Content';
	import Studios from './Studios';
	import Footer from './Footer';
	import Imaginarium from './Imaginarium';
	import Clients from './Clients';
	import VideoPlayer from './VideoPlayer';

	import Cases from './Cases';
	import PostList from '../PostList.vue';
	import PostView from '../PostView';
	import Sliderchess from './Sliderchess.vue';
	import ServiceList from '../ServiceList';

	const IN_UP = 0;
	const OUT_DOWN = 1;
	const OUT_UP = 2;
	const IN_DOWN = 3;

	export default {
		mixins: [mixin],
		components: {
			Clients,
			Content,
			Footer,
			Header,
			Imaginarium,
			Slideshow,
			Studios,
			VideoPlayer,
			ServiceList,
			Cases,
			PostList,
			PostView,
			Sliderchess
		},
		data() {
			return {
				intersection: {
					home: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					clients: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					studios: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					weare: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					imaginarium: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					services: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					postList: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					},
					cases: {
						currentRatio: 0,
						currentY: 0,
						isIntersecting: undefined,
						previousRatio: 0,
						previousY: 0,
						scrollDirection: undefined
					}
				},
				number: 0,
				intersectionRatioHome: 0,
				isSnapping: true,
				isPlaying: false,
				isTeam: false
			};
		},
		watch: {
			intersectionRatioHome(value) {
				if (value > 0.2) {
					window.bus.$emit('set-color', 'gray');
					this.setLogo('white');
				} else {
					this.setWebBackgroundTo('gray');
					this.setWeColor('color: #000; opacity: 1');
					this.setLogo('white');
					window.bus.$emit('set-color', 'white');
				}
				window.bus.$emit('toggle-navigation', value > 0.9);
			}
		},
		computed: {
			className() {
				let classes = [];

				if (this.isTeam) {
					classes.push('is-team');
				}

				if (this.isPlaying) {
					classes.push('is-playing');
				}

				if (this.isSnapping) {
					classes.push('is-snapping');
				}

				if (classes.length) {
					return classes.join(' ');
				} else {
					return null;
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.bindEvents();

				this.start();
				this.emitResize();
			});
			window.bus.$emit('set-color', 'white');
		},
		methods: {
			start() {
				setTimeout(() => {
					this.bindIntersectionObserver();
				}, 500);
			},
			setLogo(color) {
				if (this.$refs.logo) {
					if (color === 'black') {
						this.$refs.logo.classList.add('is-black');
					} else {
						this.$refs.logo.classList.remove('is-black');
					}
				}
			},
			bindEvents() {
				smoothscroll.polyfill();
				window.bus.$on('number', this.onNumber);
				window.bus.$on('toggle-overflow', this.onToggleOverflow);
				window.bus.$on('scroll-to', this.onScrollTo);
				window.bus.$on('scroll-by', this.onScrollBy);
				window.bus.$on('stop', this.stopVideo);
				window.bus.$on('logo', this.setLogo);

				window.addEventListener('resize', this.emitResize, false);
				window.addEventListener('keyup', this.onKeyUp, false);
			},
			onKeyUp() {
				window.bus.$emit('stop');
			},
			emitResize() {
				let box = document.body.getBoundingClientRect();
				this.browserWidth = box.width;
				window.bus.$emit('resize', this.browserWidth, this.isMobile);
			},
			onClickLogo() {
				if (this.isPlaying) {
					this.stopVideo();
					return;
				}
				if (this.isTeam) {
					window.bus.$emit('close-playground');
					return;
				}
				window.bus.$emit('scroll-to', 0);
				window.bus.$emit('set-color', 'white');
			},
			onScrollBy(top) {
				const home = document.querySelector('.Home');
				window.scrollBy({
					top,
					behavior: 'smooth'
				});
				home.scrollBy({
					top,
					behavior: 'smooth'
				});
			},
			onScrollTo(top) {
				const home = document.querySelector('.Home');
				window.scrollTo({
					top,
					behavior: 'smooth'
				});
				home.scrollTo({
					top,
					behavior: 'smooth'
				});
			},
			onNumber(number) {
				this.number = number;
			},
			onToggleOverflow(state) {
				this.toggleOverflow(state);
			},
			toggleOverflow(state) {
				this.isTeam = state;
				document.body.style = state ? 'overflow:hidden' : 'overflow:visible';
			},
			map(value, start1, stop1, start2, stop2) {
				return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
			},
			onClickHeaderLink(id) {
				let val;
				if (id === -1) {
					window.bus.$emit('scroll-to', 0);
				} else if (id === 0) {
					val = this.$refs.weare.$el.getBoundingClientRect().top; //- this.MARGIN_TOP + 200;
				} else if (id === 1) {
					val = this.$refs.cases.$el.getBoundingClientRect().top;
				} else if (id === 2) {
					val = this.$refs.studios.$el.getBoundingClientRect().top;
				} else if (id === 3) {
					val = this.$refs.imaginarium.$el.getBoundingClientRect().top;
				} else if (id === 4) {
					val = this.$refs.friends.$el.getBoundingClientRect().top;
				} else if (id === 5) {
					val = this.$refs.services.$el.getBoundingClientRect().top;
				} else if (id === 6) {
					val = this.$refs.blog.$el.getBoundingClientRect().top;
				}
				window.bus.$emit('scroll-by', val);
			},
			onNavigation(id) {
				if (id !== undefined && id !== null) {
					window.bus.$emit('play', id);
					this.isPlaying = true;
					this.toggleOverflow(this.isPlaying);
					window.bus.$emit('toggle-header', false);
				} else {
					this.stopVideo();
				}
			},
			stopVideo() {
				window.bus.$emit('play');
				window.bus.$emit('reset-navigation');
				window.bus.$emit('toggle-header', true);
				this.isPlaying = false;

				setTimeout(() => {
					window.bus.$emit('toggle-overflow', false);
				}, 900);
			},
			setWeColor(color) {
				window.bus.$emit('color-we', color);
			},
			setWebBackgroundTo(color) {
				let style = `background-color: rgba(255, 175, 196);`;

				if (color === 'pink') {
					style = `background-color: rgba(255, 175, 196);`;
				} else if (color === 'gray') {
					style = `background-color: #191919;`;
				} else if (color === 'dark-gray') {
					style = `background-color: rgba(51, 51, 51);`;
				} else if (color === 'light-gray') {
					style = `background-color: rgb(229, 229, 229);`;
				} else if (color === `white`) {
					style = `background-color: rgba(255, 255, 255, 1);`;
				}

				document.querySelector('#web').style = style;
			},
			bindIntersectionObserver() {
				let threshold = [];

				for (let i = 0; i < 100; i++) {
					threshold.push(i / 100);
				}

				let options = {
					root: null,
					threshold
				};

				let observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						let className = entry.target.className;
						let value = entry.intersectionRatio.toFixed(2);

						if (className.includes('Home')) {
							this.intersectionRatioHome = value;
						} else if (className.includes('Content')) {
							this.handleWeAreIntersection(entry);
						} else if (className === 'Imaginarium') {
							this.handleImaginariumIntersection(entry);
						} else if (className === 'Studios__container') {
							this.handleStudiosIntersection(entry, value);
						} else if (className === 'cases_sucess') {
							this.handleCasesIntersection(entry, value);
						} else if (className === 'Our_blog') {
							this.handleBlogIntersection(entry, value);
						} else if (className === 'Services_resourceful') {
							this.handleServiceIntersection(entry, value);
						}
					});
				}, options);

				if (this.$refs.studios && this.$refs.studios.$el) {
					observer.observe(this.$refs.studios.$el);
				}

				if (this.$refs.imaginarium && this.$refs.imaginarium.$el) {
					observer.observe(this.$refs.imaginarium.$el);
				}

				if (this.$refs.weare && this.$refs.weare.$el) {
					observer.observe(this.$refs.weare.$el);
				}

				if (this.$el) {
					observer.observe(this.$el);
				}

				if (this.$refs.friends && this.$refs.friends.$el) {
					observer.observe(this.$refs.friends.$el);
				}
				if (this.$refs.cases) {
					observer.observe(this.$refs.cases.$el);
				}
				if (this.$refs.blog) {
					observer.observe(this.$refs.blog.$el);
				}
				if (this.$refs.services) {
					observer.observe(this.$refs.services.$el);
				}
			},

			handleCasesIntersection(entry) {
				let type = 'cases';
				let intersection = this.intersection[type];

				intersection.currentY = entry.boundingClientRect.y;
				intersection.currentRatio = entry.intersectionRatio;
				intersection.isIntersecting = entry.isIntersecting;

				let currentRatio = intersection.currentRatio;
				let currentY = intersection.currentY;
				let isIntersecting = intersection.isIntersecting;
				let previousRatio = intersection.previousRatio;
				let previousY = intersection.previousY;

				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						this.intersection[type].scrollDirection = 0;
					} else {
						this.intersection[type].scrollDirection = 1;
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						this.intersection[type].scrollDirection = 2;
					} else {
						this.intersection[type].scrollDirection = 3;
					}
				}
				if (isIntersecting && entry.target._prevClass === 'cases_sucess') {
					let scrollDirection = intersection.scrollDirection;
					let currentRatio = intersection.currentRatio;

					if (scrollDirection === IN_UP || scrollDirection === OUT_UP) {
						window.bus.$emit('number', currentRatio);
						if (currentRatio > 0.021 && currentRatio < 0.5) {
							this.setWebBackgroundTo('white');
							this.setWeColor('color: #000; opacity: 1');
							this.setLogo('black');
							window.bus.$emit('set-color', 'gray');
							window.bus.$emit('intersection-ratio', 1);
						} /* else {
							this.setWeColor('color: transparent; opacity: 0');
						}*/
					}

					if (scrollDirection === OUT_UP || scrollDirection === IN_DOWN) {
						if (currentRatio > 0.3 && currentRatio < 0.7) {
							window.bus.$emit('set-color', 'gray');
							this.setLogo('black');
						} else {
							this.setWeColor('color: transparent; opacity: 0');
							this.setWebBackgroundTo('white');
							window.bus.$emit('intersection-ratio', 0);
						}
					}
				}

				this.intersection[type].previousY = this.intersection[type].currentY;
				this.intersection[type].previousRatio = this.intersection[type].currentRatio;
			},
			handleStudiosIntersection(entry) {
				let type = 'studios';

				let intersection = this.intersection[type];

				intersection.currentY = entry.boundingClientRect.y;
				intersection.currentRatio = entry.intersectionRatio;
				intersection.isIntersecting = entry.isIntersecting;

				let currentRatio = intersection.currentRatio;
				let currentY = intersection.currentY;
				let isIntersecting = intersection.isIntersecting;
				let previousRatio = intersection.previousRatio;
				let previousY = intersection.previousY;

				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						this.intersection[type].scrollDirection = 0;
					} else {
						this.intersection[type].scrollDirection = 1;
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						this.intersection[type].scrollDirection = 2;
					} else {
						this.intersection[type].scrollDirection = 3;
					}
				}

				if (isIntersecting && entry.target._prevClass == 'Studios__container') {
					let scrollDirection = intersection.scrollDirection;
					let currentRatio = intersection.currentRatio;
					if (scrollDirection === IN_UP || scrollDirection === IN_DOWN) {
						window.bus.$emit('number', currentRatio);
						if (currentRatio > 0.43 && currentRatio <= 0.85) {
							this.setWebBackgroundTo('pink');
							this.setWeColor('color: #000; opacity: 1');
							this.setLogo('black');
							window.bus.$emit('set-color', 'black');
							window.bus.$emit('open-first-studio');
							window.bus.$emit('intersection-ratio', 1);
							window.bus.$emit('show-studios', true);
							document.getElementById('weAre').hidden = false;
						}
					}

					if (scrollDirection === OUT_DOWN) {
						if (currentRatio < 0.7) {
							window.bus.$emit('close-studios', true);
						}
					}

					if (scrollDirection === OUT_UP) {
						if (currentRatio < 0.3) {
							window.bus.$emit('close-studios', true);
							window.bus.$emit('set-color', 'pink');
							document.getElementById('weAre').hidden = false;
							this.setLogo('white');
						}

						if (currentRatio <= 0.5) {
							window.bus.$emit('sentence-style', 'opacity: 1;');

							window.bus.$emit('show-studios', false);
							window.bus.$emit('intersection-ratio', 0);
							this.setWeColor('color: unset; opacity: 1');
						}
						if (currentRatio <= 0.7) {
							document.getElementById('weAre').hidden = false;
							window.bus.$emit('close-studios', true);
						}
					}
				}

				this.intersection[type].previousY = this.intersection[type].currentY;
				this.intersection[type].previousRatio = this.intersection[type].currentRatio;
			},
			handleImaginariumIntersection(entry) {
				let type = 'imaginarium';
				let intersection = this.intersection[type];
				intersection.currentY = entry.boundingClientRect.y;
				intersection.currentRatio = entry.intersectionRatio;
				intersection.isIntersecting = entry.isIntersecting;

				let currentRatio = intersection.currentRatio;
				let currentY = intersection.currentY;
				let isIntersecting = intersection.isIntersecting;
				let previousRatio = intersection.previousRatio;
				let previousY = intersection.previousY;
				
				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						this.intersection[type].scrollDirection = 0;
					} else {
						this.intersection[type].scrollDirection = 1;
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						this.intersection[type].scrollDirection = 2;
					} else {
						this.intersection[type].scrollDirection = 3;
					}
				}

				if (isIntersecting && entry.target._prevClass == 'Imaginarium') {
					let scrollDirection = intersection.scrollDirection;
					let currentRatio = intersection.currentRatio;

					if (scrollDirection === IN_UP) {
						if (currentRatio > 0.63) {
							this.setLogo('black');
							window.bus.$emit('set-color', 'black');
						}
						if (currentRatio > 0.15) {
							this.setWeColor('color: transparent; opacity: 0');
							document.getElementById('weAre').hidden = true;
							window.bus.$emit('imaginarium', true);
							//this.setWebBackgroundTo('light-gray');
						}
					}

					if (scrollDirection === OUT_DOWN) {
						if (currentRatio < 0.4) {
							this.setWebBackgroundTo('gray');
							this.setWeColor('color: #fff; opacity: 1');
							this.setLogo('white');

							window.bus.$emit('set-color', 'white');
							window.bus.$emit('friends', true);
							window.bus.$emit('intersection-ratio', 0);
							window.bus.$emit('imaginarium', false);
						}
					}

					if (scrollDirection === IN_DOWN) {
						if (currentRatio > 0.4) {
							this.setLogo('black');
							window.bus.$emit('set-color', 'black');
							window.bus.$emit('friends', false);
							//this.setWebBackgroundTo('light-gray');
							this.setWeColor('opacity: 1; color: #000');

							this.$refs.imaginarium.$el.style = 'opacity: 1;';
							window.bus.$emit('intersection-ratio', 1);
							window.bus.$emit('imaginarium', true);
						}
					}

					if (scrollDirection === OUT_UP) {
						if (currentRatio < 0.5) {
						//	this.setWebBackgroundTo('pink');
							window.bus.$emit('imaginarium', false);
						}
					}
				}

				this.intersection[type].previousY = this.intersection[type].currentY;
				this.intersection[type].previousRatio = this.intersection[type].currentRatio;
			},

			handleBlogIntersection(entry) {
				let type = 'postList';
				let intersection = this.intersection[type];

				intersection.currentY = entry.boundingClientRect.y;
				intersection.currentRatio = entry.intersectionRatio;
				intersection.isIntersecting = entry.isIntersecting;

				let currentRatio = intersection.currentRatio;
				let currentY = intersection.currentY;
				let isIntersecting = intersection.isIntersecting;
				let previousRatio = intersection.previousRatio;
				let previousY = intersection.previousY;

				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						this.intersection[type].scrollDirection = 0;
					} else {
						this.intersection[type].scrollDirection = 1;
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						this.intersection[type].scrollDirection = 2;
					} else {
						this.intersection[type].scrollDirection = 3;
					}
				}

				if (isIntersecting && entry.target._prevClass === 'Our_blog') {
					window.bus.$emit('close-studios', true);

					let scrollDirection = intersection.scrollDirection;
					let currentRatio = intersection.currentRatio;

					if (scrollDirection === IN_UP || scrollDirection === OUT_UP) {
						window.bus.$emit('number', currentRatio);

						if (currentRatio > 0.7 && currentRatio < 0.9) {
							this.setWebBackgroundTo('white');
							this.setWeColor('color: #000; opacity: 0');
							this.setLogo('black');
							window.bus.$emit('set-color', 'gray');
						} else {
							this.setWeColor('color: transparent; opacity: 0');
							window.bus.$emit('set-color', 'gray');
							this.setLogo('black');
						}
					}

					if (scrollDirection === OUT_UP || scrollDirection === IN_DOWN) {
						if (currentRatio > 0.3 && currentRatio < 0.7) {
							this.setWebBackgroundTo('white');
							window.bus.$emit('set-color', 'gray');
						} else {
							this.setWebBackgroundTo('white');
							this.setWeColor('color: transparent; opacity: 0');
						}
					}
				}

				this.intersection[type].previousY = this.intersection[type].currentY;
				this.intersection[type].previousRatio = this.intersection[type].currentRatio;
				this.setWeColor('color: transparent; opacity: 0');
			},
			handleWeAreIntersection(entry) {
				let type = 'weare';
				let intersection = this.intersection[type];

				intersection.currentY = entry.boundingClientRect.y;
				intersection.currentRatio = entry.intersectionRatio;
				intersection.isIntersecting = entry.isIntersecting;

				let currentRatio = intersection.currentRatio;
				let currentY = intersection.currentY;
				let isIntersecting = intersection.isIntersecting;
				let previousRatio = intersection.previousRatio;
				let previousY = intersection.previousY;

				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						this.intersection[type].scrollDirection = 0;
					} else {
						this.intersection[type].scrollDirection = 1;
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						this.intersection[type].scrollDirection = 2;
					} else {
						this.intersection[type].scrollDirection = 3;
					}
				}

				if (isIntersecting && entry.target._prevClass == 'Content Section') {
					let scrollDirection = intersection.scrollDirection;
					let currentRatio = intersection.currentRatio;

					if (scrollDirection === IN_UP || scrollDirection === IN_DOWN) {
						if (currentRatio > 0.2) {
							window.bus.$emit('set-color', 'pink');
							this.setLogo('white');
						}
					}

					if (scrollDirection === OUT_UP || scrollDirection === OUT_DOWN) {
						if (currentRatio > 0.9) {
							window.bus.$emit('set-color', 'pink');
							this.setLogo('white');
						} /*else if (currentRatio < 0.9) {
							window.bus.$emit('set-color', '#000');
							this.setLogo('white');
							window.bus.$emit('set-color', 'pink');
							this.setWeColor('color: #fff; ');
						}*/
					} else if (scrollDirection === IN_DOWN || scrollDirection === OUT_DOWN) {
						this.setWebBackgroundTo('gray');
					}
				}

				this.intersection[type].previousY = this.intersection[type].currentY;
				this.intersection[type].previousRatio = this.intersection[type].currentRatio;
			},
			handleServiceIntersection(entry) {
				let type = 'services';
				let intersection = this.intersection[type];

				intersection.currentY = entry.boundingClientRect.y;
				intersection.currentRatio = entry.intersectionRatio;
				intersection.isIntersecting = entry.isIntersecting;

				let currentRatio = intersection.currentRatio;
				let currentY = intersection.currentY;
				let isIntersecting = intersection.isIntersecting;
				let previousRatio = intersection.previousRatio;
				let previousY = intersection.previousY;

				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						this.intersection[type].scrollDirection = 0;
					} else {
						this.intersection[type].scrollDirection = 1;
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						this.intersection[type].scrollDirection = 2;
					} else {
						this.intersection[type].scrollDirection = 3;
					}
				}
				if (isIntersecting && entry.target._prevClass === 'Services_resourceful') {
					let scrollDirection = intersection.scrollDirection;
					let currentRatio = intersection.currentRatio;

					if (scrollDirection === IN_UP || scrollDirection === OUT_UP) {
						window.bus.$emit('number', currentRatio);
						if (currentRatio > 0.45 && currentRatio < 0.7) {
							this.setWebBackgroundTo('gray');
							this.setWeColor('color: #000; opacity: 1');
							this.setLogo('white');
							window.bus.$emit('set-color', 'white');
						} else {
							this.setWeColor('color: transparent; opacity: 0');
						}
					}

					if (scrollDirection === OUT_UP || scrollDirection === IN_DOWN) {
						if (currentRatio > 0.45 && currentRatio < 0.7) {
							window.bus.$emit('set-color', 'gray');
						} else {
							this.setWeColor('color: transparent; opacity: 0');
							this.setWebBackgroundTo('gray');
							this.setLogo('white');
							window.bus.$emit('set-color', 'white');
							this.setWeColor('color: #000; opacity: 1');
						}
					}
				}

				this.intersection[type].previousY = this.intersection[type].currentY;
				this.intersection[type].previousRatio = this.intersection[type].currentRatio;
			}
		}
	};
</script>
