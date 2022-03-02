<template>
	<div class="related-proyect">
		<div class="related-proyect--tile">
			<h3>Related projects</h3>
		</div>
		<div class="related-proyect--carousel">
			<Carousel
				:perPageCustom="[
					[375, 1],
					[640, 1],
					[748, 2],
					[1024, 3]
				]"
				:mouse-drag="true">
				<Slide v-for="(item, index) in projects" :key="index">
					<div class="cases_sucess__carousel__slide--case">
						<div class="cases_sucess__carousel__image-container">
							<img :src="item.image" alt="" />
						</div>
						<g-link :to="item.path" class="read">
							<div class="cases_sucess__carousel__detail">
								<h3 class="cases_sucess__carousel__detail--title">{{ item.title }}</h3>
								<p class="cases_sucess__carousel__detail--content" v-html="item.abstract" />
							</div>
						</g-link>
					</div>
				</Slide>
			</Carousel>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['projects']
	};
</script>
