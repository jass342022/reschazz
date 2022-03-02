<template>
	<div class="Slider" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" :class="className" :style="style">
		<input type="range" min="0" :max="words.length - 1" step=".1" v-model="value" class="Slider__range" @change="onChangeRange" @touchend="onEnd" @mouseup="onEnd" v-if="isSlider" />
		<transition name="blur">
			<span class="Slider__placeholder is-large" :class="wordClassName" v-html="placeholder" v-if="loaded && isSlider"></span>
		</transition>

		<span class="Slider__word" :class="wordClassName" v-html="word" @click="onClickWord"></span>

		<span class="Slider__cover"></span>
	</div>
</template>

<script>
	import config from '@/config';

	const SPACE = 10;
	const TIME_OUT = 100;

	const MODES = {
		slider: 0,
		clickable: 1
	};

	const CURRENT_MODE = MODES.clickable;
	import mixin from '@/mixins';

	export default {
		mixins: [mixin],
		props: ['words', 'align'],
		watch: {
			value(val) {
				this.hide();
				this.sliding = true;
				this.placeholderIndex = Math.floor(val);
				this.width = this.getWidth(this.words[this.placeholderIndex]);
			}
		},
		data() {
			return {
				MODES,
				disruptive: false,
				disruption: 0,
				canvas: undefined,
				CURRENT_MODE,
				loaded: false,
				value: 0,
				wordIndex: 0,
				placeholderIndex: 0,
				hover: false,
				visible: false,
				minWidth: 0,
				width: 100,
				mobile: undefined,
				sliding: false
			};
		},
		computed: {
			wordStyle() {
				return this.isSlider ? 'pointer-events: none;' : '';
			},
			wordClassName() {
				return this.align === 'left' ? 'is-left' : undefined;
			},
			v() {
				return this.wordIndex; // Math.floor(this.value)
			},
			placeholder() {
				return this.words[this.placeholderIndex].replace(/ /g, '&nbsp;');
			},
			isSlider() {
				return this.CURRENT_MODE === MODES.slider;
			},
			word() {
				return this.isSlider ? this.words[this.wordIndex].replace(/ /g, '&nbsp;') : this.words[this.wordIndex];
			},
			style() {
				let styles = [];

				if (this.disruptive) {
					styles.push(`transform: rotate(${this.disruption}deg)`);
				}

				if (this.width && !this.isMobile) {
					styles.push(`width: ${this.width}px`);
				} else if (this.width) {
					styles.push(`width: auto`);
				}

				return styles.join(';');
			},
			className() {
				let classes = [this.visible ? 'is-visible' : null];

				if (this.hover) {
					classes.push('is-hover');
				}

				if (this.isSlider) {
					classes.push('is-slider');

					if (this.sliding) {
						classes.push('is-sliding');
					}
				} else {
					classes.push('is-clickable');
				}

				return classes.join(' ');
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getMinWidth();
				this.selectWordByIndex(this.wordIndex);
				this.width = this.getWidth(this.words[0]);
				this.loaded = true;
				this.mobile = this.isMobile;
				this.CURRENT_MODE = this.mobile ? MODES.clickable : MODES.slider;

				window.bus.$on('resize', this.onResize);
				window.bus.$on('disruptive', this.onDisruptive);
			});
		},
		methods: {
			onDisruptive(state) {
				let amount = Math.floor(Math.random() * 360);
				this.disruptive = state;
				this.disruption = state ? amount : 0;
			},
			onClickWord() {
				this.wordIndex = (this.wordIndex + 1) % this.words.length;
				this.$emit('quit', this.words[this.wordIndex]);
			},
			onResize(v, mobile) {
				this.mobile = mobile;
				this.width = '';
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;
				this.CURRENT_MODE = this.mobile ? MODES.clickable : MODES.slider;
			},
			onEnd() {
				this.sliding = false;
				this.wordIndex = Math.floor(this.value);
				this.selectWordByIndex(this.wordIndex);
				this.$emit('quit', this.words[this.wordIndex]);
			},
			loadSaved() {
				let selectedId = localStorage[`${config.KEY}_${this.wordIndex}`];

				if (selectedId !== undefined) {
					this.value = +selectedId;
					this.selectWordByIndex(+selectedId);
				}
			},
			getMinWidth() {
				let minWidth = 10000;

				this.words.forEach((word) => {
					let width = this.getWidth(word);
					if (width < minWidth) {
						minWidth = width;
					}
				});

				this.minWidth = minWidth;
			},
			getMaxWidth() {
				let maxWidth = 0;

				this.words.forEach((word) => {
					let width = this.getWidth(word);

					if (width > maxWidth) {
						maxWidth = width;
					}
				});

				this.width = maxWidth;
			},
			getWidth(text) {
				if (!text) {
					return;
				}
				this.canvas = document.createElement('canvas');
				let context = this.canvas.getContext('2d');
				this.canvas.width = window.innerWidth;
				this.canvas.height = window.innerHeight;

				text = text.replace('&nbsp;', ' ');
				context.font = Math.round(window.innerWidth / 20) + 'px Circular';

				let metrics = context.measureText(text);
				return metrics.width + SPACE;
			},
			onMouseEnter() {
				this.hover = true;
			},
			onMouseLeave() {
				this.hover = false;
			},
			onChangeRange() {
				this.hide();
				this.selectWordByIndex(this.wordIndex);
			},
			selectWordByIndex(id) {
				let word = this.words[id];
				this.width = this.getWidth(word);

				localStorage[`${config.KEY}_${this.wordIndex}`] = this.wordIndex;

				setTimeout(() => {
					this.show();
					this.wordIndex = id;
				}, TIME_OUT);
			},
			hide() {
				this.visible = false;
			},
			show() {
				this.visible = true;
			}
		}
	};
</script>
