<template>
	<div class="Playground">
		<div class="Playground__header">
			<div class="Playground__we">We are</div>
			<div class="Playground__title" v-html="title"></div>
		</div>
		<canvas class="Playground__canvas" ref="canvas"></canvas>
		<button @click="exit" class="Playground__arrow"></button>
		<MarqueeText class="Marquee" :duration="SPEED">{{ people }}</MarqueeText>
	</div>
</template>

<script>
	import MarqueeText from 'vue-marquee-text-component';

	const SPEED = 50;

	export default {
		props: ['title', 'city', 'filenames', 'names'],
		components: {
			MarqueeText
		},
		data() {
			return {
				SPEED,
				canvas: undefined,
				p: 0,
				i: 0,
				images: []
			};
		},
		computed: {
			people() {
				let names = this.names;

				if (names.length < 5) {
					Array(3)
						.fill()
						.map(() => {
							names = names.concat(names);
						});
				}

				return names.join(' · ') + ' · ';
			}
		},
		mounted() {
			this.loadImages();
			this.initCanvas();
			this.loadEvents();
		},
		methods: {
			loadEvents() {
				if (this.filenames.length > 0) {
					window.addEventListener('resize', this.resizeCanvas, false);
					this.canvas.addEventListener('touchmove', this.mobileDraw, false);
					this.canvas.addEventListener('mousemove', this.draw, false);
				}
			},
			loadImages() {
				this.filenames.forEach((file) => {
					let image = new Image();

					image.onload = () => {
						this.images.push(image);
					};

					image.src = `/images/studios/${this.city}/${file}`;
				});
			},
			resizeCanvas() {
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
			},
			initCanvas() {
				this.canvas = this.$refs.canvas;
				this.context = this.canvas.getContext('2d');
				this.resizeCanvas();
			},
			exit() {
				this.$emit('exit');
			},
			mobileDraw(e) {
				let width = this.images[this.i].width;
				let height = this.images[this.i].height;

				let r = Math.random();
				r = r < 0.1 ? 0.1 : r;

				width = width * r;
				height = (height / width) * width * r;

				let x = e.touches[0].clientX - width / 2;
				let y = e.touches[0].clientY - height / 2;

				this.context.drawImage(this.images[this.i], x, y, width, height);

				if (this.p > 1) {
					this.i = (this.i + 1) % this.images.length;
					this.p = 0;
				}

				this.p++;
			},
			draw(e) {
				let width = this.images[this.i].width;
				let height = this.images[this.i].height;

				let r = Math.random();
				r = r < 0.1 ? 0.1 : r;

				width = width * r;
				height = (height / width) * width * r;

				let x = e.clientX - width / 2;
				let y = e.clientY - height / 2;

				this.context.drawImage(this.images[this.i], x, y, width, height);

				if (this.p > 1) {
					this.i = (this.i + 1) % this.images.length;
					this.p = 0;
				}

				this.p++;
			}
		}
	};
</script>
