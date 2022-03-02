<template>
	<div class="Player" :class="className">
		<transition name="fade">
			<div class="Player__header">
				<button class="Player__close" v-if="showVideo" @click="onClickClose"></button>
			</div>
		</transition>

		<transition name="fade">
			<Spinner v-if="!showVideo" />
		</transition>

		<video class="Player__video" ref="video" preload allowfullscreen>
			<source :src="src" />
		</video>
	</div>
</template>

<script>
	import Spinner from './Spinner';

	export default {
		components: {
			Spinner
		},
		props: ['video'],
		data() {
			return {
				id: 0,
				showVideo: false,
				isPlaying: false
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.play(this.video);
			});
		},
		computed: {
			className() {
				return this.showVideo ? 'is-playing' : null;
			},
			src() {
				return `videos/video_${this.id}.mp4?r=${Math.random() * 1000}`;
			}
		},
		methods: {
			onClickClose() {
				window.bus.$emit('stop');
			},
			onCanPlay() {
				this.$refs.video.play();
				this.isPlaying = true;

				setTimeout(() => {
					this.showVideo = true;
					window.bus.$emit('toggle-overflow', true);
				}, 1000);
			},
			play(id) {
				if (!this.$refs.video) {
					return;
				}

				this.id = id;
				this.$refs.video.src = this.src;

				this.$refs.video.play();

				this.$refs.video.addEventListener('canplaythrough', this.onCanPlay);
			}
		}
	};
</script>
