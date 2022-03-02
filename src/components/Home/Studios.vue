<template>
	<div class="Studios__container" id="studio">
		<div class="Studios__picture" ref="picture">
			<img :src="image" alt="city" />
		</div>

		<div class="Studios" :class="className" ref="studios">
			<ul class="Studios__list">
				<div class="Studios-we" :style="titleStyle" v-if="show && mode === undefined" >We are</div>

				<div class="We Content__title is-large is-dark" :style="titleStyle" v-if="show && mode === undefined" id="weAre">We are</div>
				<Studio :data-id="studio.id" :data="studio" @show="onShow" @select="onSelect" v-for="studio in studios" :key="studio.id" />
			</ul>
		</div>
		<Playground :city="city" :title="title" :filenames="filenames" :names="names" @exit="closePlayground" v-if="showPlayground" />
	</div>
</template>

<script>
	import Vue from 'vue';
	import Studio from './Studio';
	import Playground from './Playground';

	import mixin from '@/mixins';
	import STUDIOS from '@/data/studios';

	export default {
		mixins: [mixin],
		components: {
			Playground,
			Studio
		},
		mounted() {
			this.$nextTick(() => {
				this.bindEvents();

				this.mobile = this.isMobile;

				if (this.mobile) {
					let height = document.body.getBoundingClientRect().height;
					if (height) {
						this.$refs.studios.style.height = `${height + 100}px`;
					}
				}
			});
		},
		computed: {
			className() {
				return this.visible ? 'is-visible' : undefined;
			},
			classNameWe() {
				return this.isDark ? 'is-dark' : undefined;
			},
			image() {
				if (this.currentId !== undefined && this.studios[this.currentId]) {
					return `images/${this.studios[this.currentId].cover}`;
				}
				return undefined;
			}
		},
		data() {
			return {
				titleStyle: undefined,
				show: true,
				mode: undefined,
				currentId: 0,
				canvas: undefined,
				names: [],
				ctx: undefined,
				filenames: [],
				visible: false,
				positions: [],
				selectedStudioId: undefined,
				showPlayground: false,
				started: false,
				studios: STUDIOS,
				ticking: false,
				city: undefined,
				title: undefined,
				mobile: undefined
			};
		},
		methods: {
			bindEvents() {
				window.bus.$on('show-studios', this.onToggle);
				window.bus.$on('close-playground', this.closePlayground);
				window.bus.$on('close-studios', this.closeImage);
				window.bus.$on('open-first-studio', this.openFirstStudio);
				window.bus.$on('resize', this.onResize);
				window.addEventListener('keyup', this.closePlayground, false);
			},
			onToggle(state) {
				this.visible = state;
			},
			onResize(v, mobile) {
				this.mobile = mobile;

				if (this.mobile) {
					this.closeStudios();
				}
			},
			closePlayground() {
				this.showPlayground = false;
				//  window.bus.$emit('logo', 'white')
				window.bus.$emit('toggle-we', false);
				window.bus.$emit('toggle-overflow', false);
			},
			onShow(id) {
				window.bus.$emit('toggle-we', true);
				window.bus.$emit('logo', 'black');
				window.bus.$emit('color-we', 'color: #000');
				window.bus.$emit('toggle-overflow', true);

				this.selectedStudioId = id;
				let photosCount = this.studios[this.selectedStudioId].photosCount;
				this.title = this.studios[id].title;
				this.city = this.studios[id].id;
				this.names = this.studios[id].names;

				let filenames = [];

				for (let i = 0; i < photosCount; i++) {
					filenames.push(`${this.city}_${i}.gif`);
				}

				this.filenames = filenames;
				this.showPlayground = true;
			},
			closeStudio(i) {
				this.currentId = undefined;
				Vue.set(this.studios[i], 'open', false);
				Vue.set(this.studios[i], 'selected', false);
			},
			openStudio(i) {
				Vue.set(this.studios[i], 'open', true);
				Vue.set(this.studios[i], 'selected', true);
			},
			changePicture(id) {
				if (id === this.currentId) {
					return;
				}

				this.$refs.picture.style = 'opacity: 0;';

				setTimeout(() => {
					this.currentId = id;
					this.$refs.picture.style = 'opacity: 1;';
				}, 700);
			},
			openFirstStudio() {
				this.closeStudios();
				Vue.set(this.studios[0], 'open', true);
				Vue.set(this.studios[0], 'selected', true);

				this.currentId = 0;
				if (this.$refs && this.$refs.picture) {
					this.$refs.picture.style = 'opacity: 1;';
				}
			},
			closeImage() {
				this.currentId = undefined;

				if (this.$refs.picture && this.$refs.picture.style) {
					this.$refs.picture.style = 'opacity: 0;';
				}
			},
			closeStudios() {
				return new Promise((resolve) => {
					let studioWasClosed = undefined;

					this.studios.forEach((studio) => {
						studioWasClosed = studio.index;
						Vue.set(this.studios[studio.index], 'open', false);
						Vue.set(this.studios[studio.index], 'selected', false);
					});

					resolve(studioWasClosed);
				});
			},
			onSelect(id) {
				this.selectedStudioId = id;

				if (!this.mobile) {
					this.closeStudios().then((studioId) => {
						let timeOut = studioId === undefined ? 0 : 200;

						this.changePicture(id);
						setTimeout(() => {
							Vue.set(this.studios[id], 'open', true);
							Vue.set(this.studios[id], 'selected', true);
							this.navigateTo(id, timeOut);
						}, 100);
					});
				} else {
					this.closeStudios();
					Vue.set(this.studios[id], 'open', !this.studios[id].open);
					Vue.set(this.studios[id], 'selected', true);
				}
			},
			navigateTo(id, timeOut) {
				return new Promise((resolve) => {
					setTimeout(() => {
						let $el = this.$el.querySelector(`[data-id='${this.studios[id].id}']`);
						let value = Math.round($el.getBoundingClientRect().top);

						window.bus.$emit('scroll-by', -this.MARGIN_TOP + value + 30);
					}, timeOut);
					return resolve(true);
				});
			},
			onIntersectionRationChange(intersectionRatio) {
				this.$el.style = `background-color: rgba(255, 175, 196, ${intersectionRatio});`;
			}
		}
	};
</script>
