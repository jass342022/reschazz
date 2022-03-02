<template>

	<div class="tags-service">
		<div class="slide" v-for="(service , serviceIndex) in caseSucces.tags" :key="serviceIndex">
			<a class="tags-service--tag">{{ service.tag }}</a>
		</div>
         
	</div>

</template>
<script>
	export default {
		props: ['caseSucces']
	};
</script>
