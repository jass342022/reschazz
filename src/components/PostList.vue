<template>
	<div class="Our_blog" id="blog">
		<div class="Our_blog--post">
			<div class="Our_blog--post--title is-large">Our blog</div>
			<div class="Our_blog--post--content" v-if="$static.allPost.totalCount !== 0">
				<div class="Our_blog--post--content--blogs" v-for="(postItem, postIndex) in pageOfItems" :key="postIndex">
					<div class="Our_blog--post--content--blogs-item">
						<div class="Our_blog--post--content--blogs--img">
							<g-link :to="postItem.node.path">
								<img :src="postItem.node.image" alt="" />
							</g-link>
						</div>
						<div class="Our_blog--post--content--blogs--content">
							<div class="Our_blog--post--content--blogs--content-title">
								<g-link :to="postItem.node.path"> {{ postItem.node.title }} </g-link>
							</div>
							<div class="Our_blog--post--content--blogs--content-text">
								<g-link :to="postItem.node.path">
									<VueMarkdown>{{ postItem.node.abstract }}</VueMarkdown>
								</g-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="paginator">
				<jw-pagination :items="$static.allPost.edges" @changePage="onChangePage" :pageSize="countPages()" :maxPages="4" :labels="customLabels" :styles="customStyles"></jw-pagination>
			</div>
		</div>
	</div>
</template>

<static-query>
query {
  allPost {
    totalCount
    edges {
      node {
        id
        title
        abstract
        image
		path
      }
    }
  }

}
</static-query>

<script>
	import JwPagination from 'jw-vue-pagination';

	const customLabels = {
		previous: '<',
		next: '>'
	};
	const customStyles = {
		li: {
			display: 'inline-block'
		}
	};

	export default {
		components: {
			JwPagination
		},
		data() {
			return {
				pageOfItems: [],
				customLabels,
				customStyles
			};
		},
		methods: {
			onChangePage(pageOfItems) {
				this.pageOfItems = pageOfItems;
			},
			countPages() {
				if (screen.width < 1200) {
					return 2;
				} 
				else {
					return 4;
				}
			}
		},
		mounted() {}
	};
</script>
