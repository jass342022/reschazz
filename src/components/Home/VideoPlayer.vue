<template>
	<div class="VideoPlayer" :class="className">
		<Player class="Content__item" :key="0" :video="0" v-if="mode == 0" />
		<Player class="Content__item" :key="1" :video="1" v-else-if="mode == 1" />
		<Player class="Content__item" :key="2" :video="2" v-else-if="mode == 2" />
		<Player class="Content__item" :key="3" :video="3" v-else-if="mode == 3" />
		<Player class="Content__item" :key="4" :video="4" v-else-if="mode == 4" />
	</div>
</template>

<script>
	import Player from './Player';

	export default {
		components: {
			Player
		},
		data() {
			return {
				mode: undefined
			};
		},
		computed: {
			className() {
				if (this.mode === undefined) {
					return 'is-hidden';
				}
				return undefined;
			}
		},
		mounted() {
			window.bus.$on('play', this.onPlay);
		},
		methods: {
			onPlay(id) {
				this.mode = id;
			}
		}
	};
</script>
