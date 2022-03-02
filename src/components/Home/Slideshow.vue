<template>
	<div id="slider" class="Section">
		<transition-group tag="div" :name="transitionName" class="slides-group">
			<div v-if="show" :key="current" class="Carousel__slide" :class="slides[current].className" v-images-loaded:on.progress="imageProgress">
				<img class="Carousel__image" :alt="slides[current].title" :src="path(slides[current].src)" @click="onClickImage(slides[current])" />
				<div class="Loader" ref="loader"></div>
				<div class="Images__header">
					<div class="Images__headerTitle" v-html="slides[current].title"></div>
					<div class="Images__headerSubtitle" v-html="slides[current].subtitle"></div>
				</div>
			</div>
		</transition-group>
		<div class="left" @click="slide(-1)">
			<div class="btn btn-prev" aria-label="Previous slide"></div>
		</div>
		<div class="right" @click="slide(1)">
			<div class="btn btn-next" aria-label="Next slide"></div>
		</div>

		<div class="Pagination">
			<button class="Dot" :class="paginationClass(slide)" v-for="slide in slides" :key="slide.id" @click="onClicClickDot(slide)"></button>
		</div>
	</div>
</template>

<script>
	import config from '@/config';
	import imagesLoaded from 'vue-images-loaded';

	export default {
		props: ['id', 'images'],
		directives: {
			imagesLoaded
		},
		data() {
			return {
				current: 0,
				direction: 1,
				transitionName: 'fade',
				show: true,
				slides: [
					{ color: 'black', id: 0, video: 0, src: 'wabi.jpg', className: 'yellow', title: 'Wabi', subtitle: 'Improving people’s lives by simplifying the relationship with their vehicles.' },
					{ color: 'black', id: 1, video: 1, src: 'doppo.jpg', className: 'white', title: 'doppo', subtitle: 'Rethinking car insurance by empowering customers.' },
					{ color: 'black', id: 2, video: 2, src: 'hogami.jpg', className: 'green', title: 'Hogami', subtitle: 'Designing a new relationship model for a Home Services platform.' },
					{ color: 'black', id: 3, video: 3, src: 'tuio.jpg', className: 'white', title: 'Tuio', subtitle: 'Tuio. Revamping a neobank for the new context.' }
				]
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.show = true;
				if (process.isClient) {
					setTimeout(() => {
						window.bus.$emit('set-color', this.slides[this.current].color);
					}, 500);
				}
			});
		},
		methods: {
			imageProgress(instance, $el) {
				$el.img.classList.add('is-visible');
				this.$refs.loader.classList.add('is-hidden');
			},
			paginationClass(slide) {
				return slide.id == this.current ? 'is-selected' : undefined;
			},
			path(src) {
				return `${config.PROJECT_IMAGE_PATH}${src}`;
			},
			onClickImage(image) {
				this.$emit('select', image.video);
			},
			onClicClickDot(slide) {
				let current = slide.id;
				let dir = current < this.current ? -1 : 1;
				this.direction = dir;

				if (dir === 1) {
					this.transitionName = 'slide-next';
				} else {
					this.transitionName = 'slide-prev';
				}

				this.current = current;
			},
			slide(dir) {
				this.direction = dir;
				if (dir === 1) {
					this.transitionName = 'slide-next';
				} else {
					this.transitionName = 'slide-prev';
				}
				var len = this.slides.length;
				this.current = (this.current + (dir % len) + len) % len;
				if (process.isClient) {
					window.bus.$emit('set-color', this.slides[this.current].color);
				}
			}
		}
	};
</script>
