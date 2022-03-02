<template>
	<div class="cases_sucess" v-if="$static.allCase.totalCount !== 0" id="cases">
		<div class="cases_sucess__carousel">
			<div class="cases_sucess__carousel__header">
				<div class="cases__carousel__title is-large"><h1>We are proud of</h1></div>
			</div>
			<div class="cases_sucess__carousel__slide">
				<Carousel
					:perPageCustom="[
					[375, 1],
						[640, 1],
						[1024, 4],
						[2560, 6]
					]"
					:paginationEnabled="true"
					:mouse-drag="true">
					<Slide v-for="(item, index) in $static.allCase.edges" :key="index">
						<div class="cases_sucess__carousel__slide--case">
							<div class="cases_sucess__carousel__image-container">
								<img :src="item.node.image" alt="" />
							</div>
							<g-link :to="item.node.path" class="read">
								<div class="cases_sucess__carousel__detail">
									 <h3 class="cases_sucess__carousel__detail--title">{{ item.node.title }}</h3>
									<p class="cases_sucess__carousel__detail--content" v-html="item.node.abstract" />
								</div>
							</g-link>
						</div>
					</Slide>
				</Carousel>
			</div>
		</div>
	</div>
</template>
<static-query>
query {
  allCase {
	totalCount
    edges {
      node {
        id
        title
        path
		abstract
		image
      }
    }
  }
}
</static-query>
<script>
	import Sharethis from 'vue-sharethis';
	export default {
		name: 'image-three',
		components: { Sharethis },
		data() {
			return {
				isDark: true,
				active: false
			};
		},
		mounted() {},
		methods: {}
	};
</script>
