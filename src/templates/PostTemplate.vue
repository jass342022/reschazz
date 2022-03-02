<template>
	<Layout class="post-view--template">
		<div class="post-view--template-header" >
			<transition name="blur">
				<button class="Button Logo is-black" ref="logo" @click="onClicHome"></button>
			</transition>
			<Header @select="onClickHeaderLink" />
		
		</div>
			
			<PostView :post="$page.post"></PostView>
	
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
query Post ($id: ID!) {
	post: post (id: $id) {
		id
		title
		subtitle
		image
		abstract
		authorTwitter
		authorLinkedIn
		author
		date
		readTime
		categories {
			category
		}
		tags {
			tag
		}
		sections {
			sectionHeader
			sectionBody
		}
		recommendations {
			recommendationTitle
			recommendationType
			recommendationDescription
		}
		path
	}
}
</page-query>

<script>
	import PostView from './../components/PostView';
	import Header from './../components/Home/Header';
	import Footer from './../components/Home/Footer';

	export default {
		metaInfo() {
			let metaInfo = {};
			const siteUrl = this.$static.metadata.siteUrl;

			metaInfo = {
				title: this.$page.post.title,
				meta: [
					{ key: 'title', name: 'title', content: this.$page.post.title },
					{ key: 'description', name: 'description', content: this.$page.post.abstract },
					{ key: 'og:title', name: 'og:title', content: this.$page.post.title },
					{ key: 'og:description', name: 'og:description', content: this.$page.post.abstract },
					{ key: 'og:url', property: 'og:url', content: `${siteUrl}${this.$page.post.path}` },
					{ key: 'og:type', property: 'og:type', content: 'article' },
					{ key: 'twitter:title', property: 'twitter:title', content: this.$page.post.title },
					{ key: 'twitter:description', name: 'twitter:description', content: this.$page.post.abstract },
					{ key: 'twitter:card', name: 'twitter:card', content: this.$page.post.image ? 'summary_large_image' : 'summary' }
				]
			};

			if (this.$page.post.image) {
				metaInfo.meta.push({ key: 'og:image', property: 'og:image', content: `${siteUrl}${this.$page.post.image}` });
				metaInfo.meta.push({ key: 'og:image:alt', property: 'og:image:alt', content: this.$page.post.title });
				metaInfo.meta.push({ name: 'image', property: 'og:image', content: `${siteUrl}${this.$page.post.image}` });
				metaInfo.meta.push({ key: 'twitter:image', property: 'twitter:image', content: `${siteUrl}${this.$page.post.image}` });
			}

			let concatTags = [];
			if (this.$page.post.categories && this.$page.post.categories.length !== 0) {
				concatTags.push(
					this.$page.post.categories
						.map(function (item) {
							return item.category;
						})
						.join(',')
				);
			}

			if (this.$page.post.tags && this.$page.post.tags.length !== 0) {
				concatTags.push(
					this.$page.post.tags
						.map(function (item) {
							return item.tag;
						})
						.join(',')
				);
			}

			if (concatTags.length !== 0) {
				const postTags = concatTags.join(',');
				metaInfo.meta.push({ key: 'og:tag', property: 'og:tag', content: postTags }, { key: 'article:tag', property: 'article:tag', content: postTags });
			}

			if (this.$page.post.author) {
				metaInfo.meta.push({ key: 'author', name: 'author', content: this.$page.post.author });
				metaInfo.meta.push({ name: 'author', content: this.$page.post.author });
			}

			if (this.$page.post.authorTwitter) {
				metaInfo.meta.push({ key: 'twitter:creator', name: 'twitter:creator', content: this.$page.post.authorTwitter });
			}

			return metaInfo;
		},
		components: {
			PostView,
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
