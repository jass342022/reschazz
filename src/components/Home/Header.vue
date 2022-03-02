<template>
	<transition name="blur">
		<div class="Header" v-if="show">
			<Link class="Header__link" @click="onClickLink" :text="link.title" :id="link.id" :name="link.name" :key="link.id" v-for="link in links" />
		</div>
	</transition>
</template>

<script>
	import Link from './Link';

	const LINKS = [
		{ id: 0, name: 'weare', title: 'We are' },
		{ id: 1, name: 'case', title: 'Cases' },
		{ id: 2, name: 'studios', title: 'Studios & People' },
		{ id: 3, name: 'imaginarium', title: 'Imaginarium' },
		{ id: 4, name: 'clients', title: 'Clients' },
		{ id: 5, name: 'services', title: 'Services' },
		{ id: 6, name: 'blog', title: 'Blog' }
	];

	export default {
		components: {
			Link
		},
		data() {
			return {
				i: 0,
				show: false,
				links: LINKS
			};
		},
		computed: {
			style_() {
				let r = 255 * (1 - this.i);
				let g = 130 * (1 - this.i);
				let b = 166 * (1 - this.i);

				return `color: rgb(${r}, ${g}, ${b});`;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.bindEvents();

				setTimeout(() => {
					this.show = true;
				}, 800);
			});
		},
		methods: {
			bindEvents() {
				window.bus.$on('intersection-ratio', this.onIntersectionRationChange);
				window.bus.$on('toggle-header', this.onToggleHeader);
			},
			onToggleHeader(state) {
				this.show = state;
			},
			onClickLink(id) {
				this.$emit('select', id);
			},
			onIntersectionRationChange(i) {
				this.i = i;
			}
		}
	};
</script>
