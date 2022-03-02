<template>
	<div class="service-view" >
		<div class="Services__success__stories--detail--title">
			<span class="Services__success__stories--detail--title--product"> {{ service.serviceType }} </span>
		</div>

		<div class="Services__success__stories--detail--subtitle">
			<h2 class="Services__success__stories--detail--subtitle--product">{{ service.title }} </h2>
		</div>

		<div class="Services__success__stories--detail--description">
			<p>{{ service.abstract }}</p>
		</div>

		<div class="Services__success__stories--detail--vector"></div>
		<div class="Services__success__stories--detail--content" v-if="service.sections && service.sections.length !== 0">
			<div class="Services__success__stories--detail--content--detailed" v-for="(sectionItem, sectionIndex) in service.sections" :key="sectionIndex">
				<div class="Services__success__stories--detail--content--detailed--title">
					{{ sectionItem.sectionTitle }}
				</div>
				<div class="Services__success__stories--detail--content--detailed--content">
					{{ sectionItem.sectionBody }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['service']
	};
</script>
