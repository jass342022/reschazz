<template>
	<transition name="blur">
		<div class="Navigation" :class="className" v-if="show">
			<Link class="Navigation__link" :class="classNameLink(link.id)" @leave="onLeave" @click="onClickLink" :text="link.title" :description="link.description" :key="link.id" :id="link.id" v-for="link in links" />
		</div>
	</transition>
</template>

<script>
	import Link from './Link';

	const LINKS = [
		{ id: 0, selected: false, title: 'Doppo', description: 'Your car insurance made easy' },
		{ id: 1, selected: false, title: 'Hogami', description: 'Find the service you need' },
		{ id: 2, selected: false, title: 'iMentors', description: 'New ways of doing' },
		{ id: 3, selected: false, title: 'Chazz', description: 'A Global Design Studio' }
	];

	export default {
		components: {
			Link
		},
		computed: {
			className() {
				return this.hidden ? 'is-hidden' : null;
			}
		},
		data() {
			return {
				show: false,
				hidden: false,
				id: undefined,
				links: LINKS
			};
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
				window.bus.$on('toggle-navigation', this.onToggleNavigation);
				window.bus.$on('reset-navigation', this.showLinks);
			},
			onLeave() {
				this.$emit('select');
			},
			onToggleNavigation(state) {
				this.hidden = !state;
			},
			toggleLinks() {
				this.links.forEach((link) => {
					if (link.id !== this.id) {
						link.selected = false;
					}
				});

				this.links[this.id].selected = !this.links[this.id].selected;
			},
			hideLinks() {
				this.links.forEach((link) => (link.selected = true));
			},
			showLinks() {
				this.links.forEach((link) => (link.selected = false));
			},
			onClickLink(id) {
				this.id = id;

				this.toggleLinks();

				if (this.links[id].selected) {
					this.$emit('select', this.id);
				} else {
					this.showLinks();
					this.$emit('select', undefined);
				}
			},
			classNameLink(id) {
				let classes = [];

				if (this.links[id].selected) {
					classes.push('is-selected');
				}

				if (this.links[id].hidden) {
					classes.push('is-hidden');
				}

				return classes.join(' ');
			}
		}
	};
</script>
