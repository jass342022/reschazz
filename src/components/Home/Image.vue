<template>
	<div class="Imaginarium__image">
		<img :src="imagePath" v-images-loaded:on.progress="imageProgress" draggable="false" />
		<div class="Imaginarium__imageTitle" v-html="image.title"></div>
	</div>
</template>

<script>
	import imagesLoaded from 'vue-images-loaded';

	export default {
		props: ['image', 'zIndex'],
		directives: {
			imagesLoaded
		},
		data() {
			return {
				isMouseDown: false,
				documentWidth: 0,
				documentHeight: 0,
				top: 0,
				left: 0,
				mouseX: 0,
				mouseY: 0,
				elementX: 0,
				elementY: 0,
				index: 0
			};
		},
		computed: {
			imagePath() {
				return `/images/imaginarium/${this.image.file}`;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.imageStyle();
				this.draggable(this.$el);

				window.bus.$emit('number', this.documentWidth);

				setTimeout(() => {
					this.imageStyle();
				}, 500);
			});
		},
		watch: {
			index(value) {
				this.$el.style.zIndex = `${value}`;
			},
			top(value) {
				this.$el.style.top = `${value}px`;
			},
			left(value) {
				this.$el.style.left = `${value}px`;
			}
		},
		methods: {
			imageProgress(instance, $el) {
				setTimeout(() => {
					$el.img.classList.add('is-visible');
				}, Math.random() * 1000);
			},
			imageStyle() {
				let imageWidth = this.$el.getBoundingClientRect().width;
				this.documentWidth = document.body.getBoundingClientRect().width;
				this.documentHeight = document.body.getBoundingClientRect().height;

				let left = Math.floor(Math.random() * this.documentWidth);
				let top = Math.floor(Math.random() * this.documentHeight);

				this.top = top < 0 ? 0 : top;
				this.left = left < 0 ? 0 : left;
				this.left = this.left + imageWidth > this.documentWidth ? this.left - imageWidth : this.left;

				this.elementX = this.left;
				this.elementY = this.top;
			},
			onMouseMove(event) {
				if (!this.isMouseDown) {
					return;
				}

				let deltaX = event.clientX - this.mouseX;
				let deltaY = event.clientY - this.mouseY;

				this.left = this.elementX + deltaX;
				this.top = this.elementY + deltaY;
			},
			onMouseUp() {
				this.isMouseDown = false;
			},
			onMouseDown(e) {
				this.index = this.zIndex + 1;
				window.bus.$emit('zIndex', this.index);

				this.isMouseDown = true;

				this.mouseX = e.clientX;
				this.mouseY = e.clientY;

				this.left = this.elementX;
				this.top = this.elementY;
			},
			onMouseExit() {
				this.isMouseDown = false;
				this.elementX = parseInt(this.$el.style.left) || 0;
				this.elementY = parseInt(this.$el.style.top) || 0;
			},
			onMouseOver() {},
			draggable(e) {
				e.addEventListener('mousedown', this.onMouseDown);
				e.addEventListener('mouseup', this.onMouseUp);
				e.addEventListener('mouseover', this.onMouseOver);

				document.addEventListener('mousemove', this.onMouseMove, this);
				document.addEventListener('mouseup', this.onMouseExit, this);
			}
		}
	};
</script>
