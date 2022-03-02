<template>
	<div class="Sentence is-large" :class="className" :style="style">
		
		<div class="Sentence__text"><span class="Sentence__we">We are </span> <Word data="a " /> <Slider :words="WORDS.adjectives" @quit="onQuit" /> <Word data=" design " /> <Word data="atelier that " /> <Slider class="is-2" :words="WORDS.verbs" @quit="onQuit" /> <Slider align="left" :words="WORDS.what" @quit="onQuit" /><br /><Word data="with " /> <Slider class="is-2" :words="WORDS.how" @quit="onQuit" /></div>
	</div>
</template>

<script>
	import Slider from './Slider';
	import Word from './Word';

	const WORDS = {
		adjectives: ['creative', 'diverse', 'disruptive'],
		verbs: ['ideates ', 'builds', 'shapes', 'enables', 'dreams'],
		what: [' meaningful experiences', ' new business models', ' innovative strategies'],
		how: ['care', 'passion', 'honesty']
	};

	const TIMEOUT = 2000;

	export default {
		components: {
			Slider,
			Word
		},
		data() {
			return {
				WORDS,
				balls: [],
				timeoutID: undefined,
				class: undefined,
				style: undefined
			};
		},
		computed: {
			className() {
				return this.class;
			}
		},
		mounted() {
			this.$nextTick(() => {
				if (process.isClient) {
					window.bus.$on('sentence-style', this.onSentenceStyle);
				}
			});
		},
		methods: {
			onSentenceStyle(style) {
				this.style = style ? style : undefined;
			},
			onQuit(word) {
				word = word.replace(/ /g, '');

				this.class = `is-${word}`;

				if (word === 'disruptive') {
					if (process.isClient) {
						window.bus.$emit('disruptive', true);
						setTimeout(() => {
							window.bus.$emit('disruptive', false);
						}, TIMEOUT);
					}
				}

				if (this.timeoutID) {
					clearTimeout(this.timeoutID);
				}

				this.timeoutID = setTimeout(() => {
					this.class = undefined;
				}, TIMEOUT);
			}
		}
	};
</script>
