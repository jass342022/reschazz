<template>
	<div class="case-view">
		<section>
			<div class="case-view--header">
				<div class="case-view--header-left">
					<div class="case-view--header--back">
						<a href="javascript:history.back(-1);" id="back">← <span class="color--back"> Back</span> </a>
					</div>
					<div class="case-view--header--left-title">
						<h2 class="case-view--header--brand">{{ caseItem.brand }}</h2>
						<h1 class="case-view--header--title">{{ caseItem.title }}</h1>
					</div>
				</div>
				<div class="case-view--header-rigth">
					<TagsService :caseSucces="caseItem" />
				</div>
			</div>
			<div>
				<article class="case-view--header-img">
					<div class="case-view--header--multimedia">
						<VueMarkdown>{{ caseItem.header }}</VueMarkdown>
					</div>
				</article>
			</div>
		</section>
		<section>
			<div class="case-view--section1" v-if="caseItem.section1">
				<div class="case-view--section1--did">
					<h2>What we <span class="case-view--section1--did-span"> did </span></h2>
				</div>
				<div class="case-view--section1--content1">
					<VueMarkdown>{{ caseItem.section1.header }}</VueMarkdown>
				</div>
				<div class="case-view--section1--bullets">
					<div class="case-view--section1--bullets--data">
						<div class="case-view--section1--bullets--data--content" v-for="bullet in caseItem.section1.bullets" :key="bullet.bulletTitle">
							<div class="case-view--section1--bullets--data--content--details">
								<img class="case-view--section1--bullets--data--content--details--img" v-bind:src="bullet.bulletImage" alt="" />
								<p class="case-view--section1--bullets--data--content--details--title">bullet {{ bullet.bulletTitle }}</p>
								<p class="case-view--section1--bullets--data--content--details--text">bullet {{ bullet.bulletText }}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="case-view--section1--content2">
					<VueMarkdown>{{ caseItem.section1.body }}</VueMarkdown>
				</div>
			</div>
			<div class="case-view--section2" v-if="caseItem.section2">
				<div class="case-view--section2--header">
					<VueMarkdown>{{ caseItem.section2.header }}</VueMarkdown>
				</div>
				<div class="case-view--section2--bannerKpi">
					<div class="case-view--section2--bannerKpi--title">
						<h3>
							<VueMarkdown>{{ caseItem.section2.bannerKpi.title }}</VueMarkdown>
						</h3>
					</div>
					<div class="case-view--section2--bannerKpi--kpis-content">
						<div class="case-view--section2--bannerKpi--kpis" v-for="bannerKpi in caseItem.section2.bannerKpi.kpis" :key="bannerKpi.title">
							<div class="case-view--section2--bannerKpi--kpis--title">
								<VueMarkdown class="case-view--section2--bannerKpi--kpis--title-kpi">{{ bannerKpi.kpiTitle }}</VueMarkdown>
								<VueMarkdown class="case-view--section2--bannerKpi--kpis--title-unit">{{ bannerKpi.kpiUnit }}</VueMarkdown>
							</div>
							<div class="case-view--section2--bannerKpi--kpis--text">
								<VueMarkdown>{{ bannerKpi.kpiText }} </VueMarkdown>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="case-view--section3" v-if="caseItem.section3">
				<div class="case-view--section3--header">
					<VueMarkdown>{{ caseItem.section3.header }} </VueMarkdown>
				</div>
				<div class="case-view--section3--carousel">
					<Carousel
						:perPageCustom="[
							[375, 1],
							[640, 1],
							[768, 2],
							[1024, 3],

							[1800, 3]
						]"
						:mouse-drag="true">
						<Slide v-for="(item, index) in caseItem.section3.carruselImages" :key="index">
							<img :src="item.carruselImage" alt="" />
						</Slide>
					</Carousel>
				</div>
				<div class="case-view--section3--content">
					<VueMarkdown>{{ caseItem.section3.body }} </VueMarkdown>
				</div>
				<div class="case-view--section3--qoute">
					<h3 class="case-view--section3--qoute-h3">
						<VueMarkdown>{{ caseItem.section3.quote }} </VueMarkdown>
					</h3>
				</div>
			</div>
			<div class="case-view--section4" v-if="caseItem.section4">
				<div class="case-view--section4--header">
					<VueMarkdown>{{ caseItem.section4.content }} </VueMarkdown>
				</div>
			</div>
			<div class="case-view--blog">
				<Project :projects="caseItem.relatedCase" />
			</div>
		</section>
	</div>
</template>

<script>
	import TagsService from './CasesSucces/TagsService';
	import Project from './CasesSucces/Project';
	export default {
		props: ['caseItem'],
		components: {
			TagsService,
			Project
		},
		data() {
			return {
				imageHeader: []
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.start();
			});
		},
		methods: {
			start() {
				setTimeout(() => {
					window.bus.$emit('set-color', 'gray');
				}, 2000);
			},
		}
	};
</script>
