<template>
	<Layout class="case-view" id="case-View">

		<div class="case-view--template-header"  @click="onClicHome">
			<transition name="blur">
				<button class="Button Logo is-black" ref="logo"  ></button>
			</transition>
			<Header @select="onClickHeaderLink" />
		</div>
		<CaseView :caseItem="$page.caseItem"></CaseView>
		<transition name="blur">
			<Footer />
		</transition>
		
	</Layout>
</template>

<static-query>
query {
	metadata {
		siteName
		siteDescription
		siteUrl
	}
}
</static-query>

<page-query>
query Case ($id: ID!) {
	caseItem: case (id: $id) {
		id
		title
		image
		abstract
		brand
		services {
			title
		}
		tags {
			tag
		}
		header
		section1 {
			header
			bullets {
				bulletTitle
				bulletText
				bulletImage
			}
			body
		}
		section2 {
			header
			bannerKpi {
				title
				kpis {
					kpiTitle
					kpiText
					kpiUnit
				}
			}
		}
		section3 {
			header
			carruselImages {
				carruselImage
			}
			body
			quote
		}
		section4 {
			content
		}
		relatedCase {
			title
			path,
			image,
			abstract


		}
		path
	}
}
</page-query>

<script>
	import CaseView from './../components/CaseView';
	import Header from './../components/Home/Header';
	import Footer from './../components/Home/Footer';

	export default {
		metaInfo() {
			let metaInfo = {};
			const siteUrl = this.$static.metadata.siteUrl;

			metaInfo = {
				title: this.$page.caseItem.title,
				meta: [
					{ key: 'title', name: 'title', content: this.$page.caseItem.title },
					{ key: 'description', name: 'description', content: this.$page.caseItem.abstract },
					{ key: 'author', name: 'author', content: '' },
					{ name: 'author', content: '' },
					{ key: 'og:title', name: 'og:title', content: this.$page.caseItem.title },
					{ key: 'og:description', name: 'og:description', content: this.$page.caseItem.abstract },
					{ key: 'og:url', property: 'og:url', content: `${siteUrl}${this.$page.caseItem.path}` },
					{ key: 'og:type', property: 'og:type', content: 'article' },
					{ key: 'twitter:title', property: 'twitter:title', content: this.$page.caseItem.title },
					{ key: 'twitter:description', name: 'twitter:description', content: this.$page.caseItem.abstract },
					{ key: 'twitter:card', name: 'twitter:card', content: this.$page.caseItem.image ? 'summary_large_image' : 'summary' }
				]
			};

			if (this.$page.caseItem.image) {
				metaInfo.meta.push({ key: 'og:image', property: 'og:image', content: `${siteUrl}${this.$page.caseItem.image}` });
				metaInfo.meta.push({ key: 'og:image:alt', property: 'og:image:alt', content: this.$page.caseItem.title });
				metaInfo.meta.push({ name: 'image', property: 'og:image', content: `${siteUrl}${this.$page.caseItem.image}` });
				metaInfo.meta.push({ key: 'twitter:image', property: 'twitter:image', content: `${siteUrl}${this.$page.caseItem.image}` });
			}

			let concatTags = [];
			if (this.$page.caseItem.tags && this.$page.caseItem.tags.length !== 0) {
				concatTags.push(
					this.$page.caseItem.tags
						.map(function (item) {
							return item.tag;
						})
						.join(',')
				);
			}

			if (concatTags.length !== 0) {
				const caseTags = concatTags.join(',');
				metaInfo.meta.push({ key: 'og:tag', property: 'og:tag', content: caseTags }, { key: 'article:tag', property: 'article:tag', content: caseTags });
			}

			return metaInfo;
		},
		components: {
			CaseView,
			Header,
			Footer
		},
		methods: {
			onClickHeaderLink(id) {
				let val;
				if (id === -1) {
					window.bus.$emit('scroll-to', 0);
				} else if (id === 0) {
					this.$router.push('/#weare');
				} else if (id === 1) {
					this.$router.push('/#cases');
				} else if (id === 2) {
					this.$router.push('/#studio');
				} else if (id === 3) {
					this.$router.push('/#imaginarium');
				} else if (id === 4) {
					this.$router.push('/#clients');
				} else if (id === 5) {
					this.$router.push('/#services');
				} else if (id === 6) {
					this.$router.push('/#blog');
				}
				window.bus.$emit('scroll-by', val);
			},
			onClicHome(){
				this.$router.push('/#home');
			}

		}
	};
</script>
