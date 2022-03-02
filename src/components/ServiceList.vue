<template>
	<div class="Services_resourceful">
		<div class="Services__header">
			<div class="Services__title is-large">We are resourceful</div>
		</div>

		<div class="service-list">
			<div class="Services__service">
				<div class="Services__service__childs" id="services" v-if="$static.allService.totalCount !== 0">
					<div class="slide" v-for="(serviceTypeItem, serviceTypeIndex) in getServicesTypeList($static.allService)" :key="serviceTypeIndex" :data-service-type="generateTypeSelector(serviceTypeItem)"></div>
				</div>
			</div>
			<div class="Services__success__stories">
				<div id="detail" class="services-list" v-if="$static.allService.totalCount !== 0">
					<div class="Services__success__stories--detail" v-for="serviceItem in $static.allService.edges" :key="serviceItem.node.id" :data-service-type="generateTypeSelector(serviceItem.node.serviceType.name)" v-bind:id="getIdServices(serviceItem.node.serviceType, false)">
						<ServiceView :service="serviceItem.node"></ServiceView>
						<div class="Services__success__stories--stories">
							<div id="stories" v-for="caseItem in getCaseOfService(serviceItem.node.belongsTo.edges, $static.allCase)" :key="caseItem.node.id">
								<g-link :to="caseItem.node.path"> #{{ caseItem.node.title }}</g-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<static-query>
query {
  allService {
    totalCount
    edges {
      node {
        id
        title
		serviceType
        abstract
        sections {
          sectionTitle
          sectionBody
        }
		belongsTo {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
  allCase {
    edges {
      node {
        id
        title
        path
      }
    }
  }
}
</static-query>

<script>
	import ServiceView from './../components/ServiceView';
	export default {
		components: {
			ServiceView
		},
		data() {
			return {
				servicesSucessAll: [],
				storiesSucess: []
			};
		},
		methods: {
			getIdServices: function (typeService, isIdButton) {
				return isIdButton ? `${typeService}` : `Services__detail--${typeService}`;
			},
			addButtonServices: function (services) {
				var typeService = services;
				if (screen.width > 640) {
					services.forEach(function (service, index) {
						typeService.push(service);
					});
				}
				let divService = document.getElementById('services');
				let divServiceNow = document.getElementById('services');

				typeService.forEach((element, index) => {
					divServiceNow = document.getElementById('services');
					if (divServiceNow != null) {
						let newElementDivService = document.createElement('div');
						newElementDivService.className = 'slide';
						let newElementService = document.createElement('a');
						newElementService.id = element;
						newElementService.onclick = this.activeService;

						newElementService.className = element === typeService[0] ? 'Services__service--tag service-active' : 'Services__service--tag';
						newElementService.innerText = element;
						newElementDivService.appendChild(newElementService);
						divService.appendChild(newElementDivService);
					}
				});
			},
			activeService: function (event) {
				this.servicesSucessAll.forEach((service) => {
					let serviceSelect = document.querySelectorAll(`#${service}`);
					if (service === event.target.id || service === event.id) {
						document.getElementById(`Services__detail--${service}`).style.display = 'grid';
					} else {
						document.getElementById(`Services__detail--${service}`).style.display = 'none';
					}
					serviceSelect.forEach((select) => {
						if (select.id === event.target.id || select.id === event.id) {
							select.className = select.className + ' service-active';
						} else {
							select.classList.remove('service-active');
						}
					});
				});
			},
			getServicesTypeList: function (allService) {
				let serviceTypeList = [];
				if (allService && allService.edges.length !== 0) {
					allService.edges.forEach((service) => {
						if (service.node.serviceType && service.node.serviceType.length !== 0 && !serviceTypeList.includes(service.node.serviceType)) {
							serviceTypeList.push(service.node.serviceType);
						}
					});
				}
				this.servicesSucessAll = serviceTypeList;
				return serviceTypeList;
			},
			getCaseOfService: function (caseEdges, allCase) {
				let caseList = [];
				if (caseEdges && caseEdges.length !== 0) {
					caseEdges.forEach((caseEdge) => {
						if (caseEdge.node.id && caseEdge.node.id.length !== 0 && allCase && allCase.edges.length !== 0) {
							caseList = allCase.edges.filter((caseItem) => {
								return caseItem.node.id === caseEdge.node.id;
							});
						}
					});
				}

				return caseList;
			},
			generateCaseLink: function (caseName) {
				let caseLink = '';
				if (caseName && caseName.length !== 0) {
					caseLink = '/cases/' + caseName.toLowerCase().replace(' ', '-');
				}
				return caseLink;
			},
			generateTypeSelector: function (serviceType) {
				let serviceTypeProcessed = serviceType;
				if (serviceType && serviceType.length !== 0) {
					serviceTypeProcessed = encodeURI(serviceTypeProcessed.toLowerCase());
				}
				return serviceTypeProcessed;
			},
			getCasesSucess: function (cases) {
				if (!this.storiesSucess.includes(cases)) {
					this.storiesSucess.push(cases);
				}
				return this.storiesSucess;
			}
		},
		mounted() {
			this.addButtonServices(this.servicesSucessAll);
			let fistService = document.getElementById(this.servicesSucessAll[0]);
			this.activeService(fistService);
		}
	};
</script>
