<template>
	<button class="Button" :class="className" @click="onClick" :style="style(color)">
		<div class="Button__text">
			<span class="Button__textTitle" :data-title="description" v-html="text"></span>
		</div>
		<span class="Button__icon"></span>
	</button>
</template>

<script>
	export default {
		props: ['id', 'text', 'name', 'description'],
		data() {
			return {
				show: true,
				colorClass: undefined,
				color: undefined
			};
		},
		computed: {
			className() {
				let classes = [`is-${this.name}`];
				if (this.colorClass) {
					classes.push(`is-${this.colorClass}-mobile`);
				} else {
					classes.push(`is-white-mobile`);
				}
				return classes.join(' ');
			}
		},
		mounted() {
			this.$nextTick(() => {
				window.bus.$on('set-color', this.onSetColor);
				setTimeout(() => {
					this.show = true;
				}, 800);
			});
		},
		methods: {
			onClick() {
				this.$emit('click', this.id);
			},
			style(color) {
				if (color) {
					return `color: ${color};`;
				}
			},
			onSetColor(color) {
				if (color === 'black') {
					this.color = '#000000';
				} else if (color === 'gray') {
					this.color = '#191919';
				} else if (color === 'white') {
					this.color = '#ffffff';
				} else if (color === 'pink') {
					this.color = '#FF82A3';
				} else {
					this.color = color;
				}
				this.colorClass = color;
			},
			onMouseEnter() {
				this.$emit('onmouseenter', this.id);
			},
			onMouseLeave() {
				this.$emit('onmouseleave', this.id);
			},
			onLeave() {
				this.$emit('leave');
			}
		}
	};
</script>
