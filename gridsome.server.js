// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api, options) {
	api.onCreateNode((node) => {
		console.log('\nCreated: ' + JSON.stringify(node, null, 2));
	});

	api.loadSource((actions) => {
		// Use the Data Store API here: https://gridsome.org/docs/data-store-api/

		actions.addSchemaTypes(`
			type Tag implements Node @infer {
				tag: String!,
				path: String
			}

			type Category implements Node @infer {
				category: String!,
				path: String
			}

			type Post_Recommendations {
				recommendationTitle: String!,
				recommendationType: String,
				recommendationDescription: String!
			}

			type Post_Sections {
				sectionHeader: String!,
				sectionBody: String
			}

			type Post implements Node @infer {
				title: String!,
				subtitle: String,
				image: Image,
				abstract: String,
				author: String,
				authorTwitter: String,
				authorLinkedIn: String,
				date: Date,
				readTime: Int,
				categories: [Category],
				tags: [Tag],
				sections: [Post_Sections],
				recommendations: [Post_Recommendations],
				path: String
			}

			type Service_Sections {
				sectionTitle: String,
				sectionBody: String
			}

			type Service implements Node @infer {
				title: String!,
				serviceType: String,
				abstract: String,
				sections: [Service_Sections],
			}

			type Case_Section1_Bullets {
				bulletTitle: String,
				bulletText: String,
				bulletImage: Image
			}

			type Case_Section1 {
				header: String,
				bullets: [Case_Section1_Bullets],
				body: String
			}

			type Case_Section2_BannerKpi_Kpis {
				kpiTitle: String,
				kpiText: String,
				kpiUnit: String
			}

			type Case_Section2_BannerKpi {
				title: String,
				kpis: [Case_Section2_BannerKpi_Kpis]
			}

			type Case_Section2 {
				header: String,
				bannerKpi: Case_Section2_BannerKpi
			}

			type Case_Section3_CarruselImages {
				carruselImage: Image
			}

			type Case_Section3 {
				carruselImages: [Case_Section3_CarruselImages],
				header: String,
				body: String,
				quote: String
			}

			type Case_Section4 {
				content: String
			}

			type Case implements Node @infer {
				title: String!,
				abstract: String,
				image: Image,
				brand: String,
				service: [Service],
				tags: [Tag],
				header: String,
				section1: Case_Section1,
				section2: Case_Section2,
				section3: Case_Section3,
				section4: Case_Section4,
				relatedCase: [Case]
			}`);
	});

	api.createPages(async ({ graphql, createPage }) => {
		const { data } = await graphql(`
			{
				allCase {
					edges {
						node {
							id
							path
						}
					}
				}
				allPost {
					edges {
						node {
							id
							path
						}
					}
				}
			}
		`);

		data?.allCase.edges.forEach(({ node }) => {
			createPage({
				path: `${node.path}`,
				component: './src/templates/CaseTemplate.vue',
				context: {
					id: node.id,
					path: node.path
				}
			});
		});

		data?.allPost.edges.forEach(({ node }) => {
			createPage({
				path: `${node.path}`,
				component: './src/templates/PostTemplate.vue',
				context: {
					id: node.id,
					path: node.path
				}
			});
		});
	});
};
