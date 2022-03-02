<template>
	<div class="Content Section" id="weare">
	<!--	<div class="We Content__title is-large" :class="classNameWe" :style="titleStyle" v-if="show && mode === undefined">We are</div> !-->

		<transition name="fade">
			<Sentence class="Content__item" />
		</transition>
	</div>
</template>

<script>
	import Sentence from './Sentence';

	export default {
		components: {
			Sentence
		},
		data() {
			return {
				show: false,
				titleStyle: undefined,
				isDark: false,
				video: null,
				mode: undefined
			};
		},
		mounted() {
			window.bus.$on('play', this.onPlay);
			window.bus.$on('toggle-we', this.onToggleWe);
			window.bus.$on('color-we', this.updateTitleStyle);

			setTimeout(() => {
				this.show = true;
			}, 3000);
		},
		computed: {
			classNameWe() {
				return this.isDark ? 'is-dark' : undefined;
			}
		},
		methods: {
			updateTitleStyle(style) {
				if (style) {
					this.titleStyle = style;
				} else {
					this.titleStyle = '';
				}
			},
			onToggleWe(state) {
				this.isDark = state;
			},
			onPlay(id) {
				this.mode = id;
			}
		}
	};
</script>
