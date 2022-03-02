<template>
	<div class="Word" :class="className"><span class="Word__content" v-html="data" :style="style"></span></div>
</template>

<script>
	export default {
		props: ['data'],
		computed: {
			className() {
				if (this.disruptive) {
					return `is-disruptive`;
				}
				return undefined;
			},
			style() {
				let styles = [];

				if (this.disruptive) {
					styles.push(`transform: rotate(${this.disruption}deg)`);
				}

				return styles.join(';');
			}
		},
		data() {
			return {
				disruptive: false,
				disruption: 0
			};
		},
		mounted() {
			window.bus.$on('disruptive', this.onDisruptive);
		},
		methods: {
			onDisruptive(state) {
				let amount = Math.floor(-Math.random() * 360);
				this.disruptive = state;
				this.disruption = state ? amount : 0;
			}
		}
	};
</script>
