<template>
	<div class="Clients" id="clients">
		<div class="Clients__logos">
			<a :href="logo.url" class="Client__logo"
			 target="__blank" :class="logoClassName(logo)" 
			 :data-name="logo.name" :key="logo.name"
			  v-for="logo in CLIENTS"></a>
		</div>
	</div>
</template>

<script>
	const CLIENTS = [
		{ name: 'correos', url: 'https://www.correos.es' },
		{ name: 'zurich', url: 'https://www.zurich.es/' },
		{ name: 'renfe', url: 'http://renfe.es' },
		{ name: 'edp', url: 'https://www.edpenergia.es/es/' },
		{ name: 'abbott', url: 'https://www.abbott.com/' },
		{ name: 'globosat', url: 'https://globosatplay.globo.com/globosat/' },
		{ name: 'vivo', url: 'https://www.vivo.com.br/para-voce' },
		{ name: 'gpa', url: 'https://www.gpabr.com/en/' },
		{ name: 'comgas', url: 'https://www.comgas.com.br/' },
		{ name: 'bancobce', url: 'https://www.bice.cl/' },
		{ name: 'bankinter', url: 'https://www.bankinter.com/banca/en/home' },
		{ name: 'santander', url: 'https://www.bancosantander.es/es/particulares' },
		{ name: 'nttdata', url: 'https://us.nttdata.com/en' },
		{ name: 'leroy', url: 'https://www.leroymerlin.es' },
		{ name: 'inbevab', url: 'https://www.ab-inbev.com' },
		{ name: 'embraer', url: 'https://embraer.com/global/en' },
		{ name: 'vidacaixa', url: 'https://www.vidacaixa.es' }
	];

	export default {
		data() {
			return {
				CLIENTS,
				showLogos: false,
				titleStyle: undefined
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.bindEvents();
			});
		},
		methods: {
			bindEvents() {
				window.bus.$on('friends', this.toggle);
				window.bus.$on('logos', this.toggleLogos);
			},
			logoClassName(logo) {
				return `is-${logo.name}`;
			},
			toggleLogos(value) {
				this.showLogos = value;
			},
			toggle(value) {
				value ? this.show() : this.hide();
			},
			show() {
				this.$el.style = 'opacity: 1';
			},
			hide() {
				this.$el.style = 'opacity: 0';
			}
		}
	};
</script>
