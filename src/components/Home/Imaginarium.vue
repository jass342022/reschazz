<template>
	<div class="Imaginarium" id="imaginarium">
		<div class="Imaginarium__header" :style="titleStyle">
			<div class="Imaginarium__title is-large">We are  inspired</div>
		</div>
		<div class="Imaginarium__content">
			<ImaginariumImage :image="image" :zIndex="zIndex" v-for="image in images" :key="image.id" />
		</div>
	</div>
</template>

<script>
	import mixin from '@/mixins';

	import ImaginariumImage from '@/components/Home/Image';

	import IMAGES from '@/data/images';

	const IMAGE_COUNT = 20;

	export default {
		components: {
			ImaginariumImage
		},
		mixins: [mixin],
		data() {
			return {
				images: [],
				width: 0,
				height: 0,
				zIndex: 0,
				// isMobile: false,
				titleStyle: undefined,
				contentStyle: undefined,
				selectedImages: []
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.selectedImages = this.shuffle(IMAGES).slice(0, IMAGE_COUNT);
				window.bus.$on('zIndex', this.onZIndex);
				this.bindEvents();
			});
		},
		methods: {
			onZIndex(index) {
				this.zIndex = index;
			},
			shuffle(array) {
				return array.sort(() => Math.random() - 0.5);
			},
			toggle(value) {
				value ? this.show() : this.hide();
			},
			show() {
				this.showTitle();
				this.showContent();
				this.$el.style = 'opacity: 1';
				this.images = this.selectedImages;
			},
			hide() {
				this.hideTitle();
				this.hideContent();
				this.$el.style = 'opacity: 0';
			},
			bindEvents() {
				window.bus.$on('imaginarium', this.toggle);
			},
			showTitle() {
				this.titleStyle = 'opacity: 1;';
			},
			showContent() {
				this.contentStyle = 'opacity:1; visibility: visible; pointer-events: auto;';
			},
			hideTitle() {
				this.titleStyle = 'opacity: 0;';
			},
			hideContent() {
				this.contentStyle = 'opacity:0; visibility: hidden; pointer-events: none;';
			}
		}
	};
</script>
