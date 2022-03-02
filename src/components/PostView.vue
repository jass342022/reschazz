<template>
	<div class="post" id="blog">
		<div class="post--view">
			<div class="post--view__header">
				<div class="post--view__header--back">
					<a href="javascript:history.back(-1);" class="link" id="back">← <span class="color--back"> Back</span> </a>
				</div>
				<div class="post--view__header--content">
					<h1 class="post--view__header--content--title">{{ post.title }}</h1>
					<h2 class="post--view__header--content--subtitle">{{ post.subtitle }}</h2>
				</div>
				<div class="post--view__header--author">
					<div class="post--view__header--author--name">
						<p v-if="post.author && post.author.length !== 0">{{ post.author }}</p>
					</div>
					<div class="post--view__header--author--data">
						<a class="post--view__header--author--authorTwitter" v-if="post.authorTwitter && post.authorTwitter.length !== 0" :href="'https://twitter.com/' + post.authorTwitter"></a>
						<a class="post--view__header--author--authorLinkedIn" v-if="post.authorLinkedIn && post.authorLinkedIn.length !== 0" :href="'https://www.linkedin.com/in/' + post.authorLinkedIn"></a>

						<p class="post--view__header--author--date" v-if="post.date">{{ moment(post.date).format('DD/MM/YYYY') }}</p>
						<span class="post--view__tag--group--category--vertical--line"></span>
						<a class="post--view__header--author--read-time-icon"></a>
						<p class="post--view__header--author--read-time" v-if="post.readTime">{{ post.readTime }}</p>
					</div>
				</div>
			</div>
			<div class="post--view__tag">
				<div class="post--view__tag--tags" v-if="post.tags && post.tags.length !== 0">
					<div class="slide" v-for="(tags, tagIndex) in post.tags" :key="tagIndex">
						<a class="post--view__tag--tags--slide">{{ tags.tag }}</a>
					</div>
				</div>
				<div class="post--view__tag--group" v-if="post.categories && post.categories.length !== 0">
					<div class="post--view__tag--group--hashtag"></div>
					<div class="post--view__tag--group--category">
						<div class="post--view__tag--group--category--vertical" v-for="(categories, categoriesIndex) in post.categories" :key="categoriesIndex">
							<p class="post--view__tag--group--category--vertical--text">{{ categories.category }}</p>
							<span class="post--view__tag--group--category--vertical--line"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="post--view__blog">
				<div class="post--view__blog--img">
					<img :src="post.image" alt="" />
				</div>
				<div class="post--view__blog--abstract">
					<VueMarkdown>{{ post.abstract }}</VueMarkdown>
				</div>
			</div>
		</div>
		<div class="post__sections" v-if="post.sections && post.sections.length !== 0">
			<div v-for="(section, sectionIndex) in post.sections" :key="sectionIndex">
				<div class="post__sections--header">
					<div class="post__sections--header--data">
						<p class="post__sections--header--quote"><img src="/images/comillas.svg" alt="" /></p>
						<h3>{{ section.sectionHeader }}</h3>
					</div>
				</div>
				<div class="post__sections--body">
					<VueMarkdown> {{ section.sectionBody }} </VueMarkdown>
				</div>
			</div>
		</div>
		<div class="post__recommendation" v-if="post.recommendations">
			<div class="post__recommendation--title">
				<h3>La Autora / El Autor Recomienda</h3>
			</div>
			<div class="post__recommendation--recommendations" v-for="(recommendation, recommendationIndex) in post.recommendations" :key="recommendationIndex">
				<div class="post__recommendation--recommendations--title">
					<span :class="recommendationsType(recommendation.recommendationType)"></span>
					<h4>“{{ recommendation.recommendationTitle }}”</h4>
				</div>
				<div class="post__recommendation--recommendations--description">
					{{ recommendation.recommendationDescription }}
				</div>
			</div>
		</div>
		<div class="post__share">
			<div class="post__share--title">
				<p>Do you want to share this?</p>
			</div>
			<div class="post__share--icon">
				<Sharethis share-this-embed-url="//platform-api.sharethis.com/js/sharethis.js#property=6203d8df803dd7001adc726f&product=sticky-share-buttons&cms=sop" />
				<div class="sharethis-inline-share-buttons"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	export default {
		props: ['post'],
		data() {
			return {
				shareIcon: ['sharethis', 'pinterest', 'twitter', 'linkedin']
			};
		},
		components: {
			moment
		},
		methods: {
			moment,
			start() {
			setTimeout(() => {
				window.bus.$emit('set-color', 'gray');
			}, 3000);
		},
			recommendationsType(type) {
				return `post__recommendation--recommendations--title--${type}`;
			},
			filterIcon(altImg) {
				let iconsShares;
				this.shareIcon.map(function (icon) {
					if (altImg.includes(icon)) {
						iconsShares = icon;
					}
				});

				return iconsShares;
			},
			iconsShare() {
			var share = document.getElementsByClassName('sharethis-inline-share-buttons');	
				var node = share[0].getElementsByTagName('img');
				var span = share[0].getElementsByTagName('span');

				for (let i = 0; i < node.length; i++) {
					if (node[i].alt != '') {
						let icon = this.filterIcon(node[i].alt);
						if (icon != '') {
							node[i].src = `/images/icons/${icon}.svg`;
						}
					}
				}
				for (let i = 0; i < span.length; i++) {
					if(span[0].innerHTML =="Share" )
					{
						span[i].innerHTML = "Copy link";
					}else if(span[i].innerHTML =="Share")
					{
						span[i].innerHTML = "Linkedin";
					}
					console.log(span[i].innerHTML)
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.start();
					this.iconsShare();
				}, 2000);
			});
		},
		updated() {
			this.iconsShare();
		},
		
	};
</script>
