// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path');
const vueSrc = './src';

module.exports = {
	siteName: 'A Global Desing Studio',
	siteDescription: '',
	siteUrl: `${process.env.GRIDSOME_SITE_URL}`,
	outputDir: 'public',
	keywords: [],
	templates: {
		Case: '/cases/:title',
		Post: '/posts/:title'
	},
	plugins: [
		{
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Case',
				path: './src/content/cases/**/*.md',
				refs: {
					tags: 'Tag',
					services: 'Service',
					relatedCase: 'Case'
				}
			}
		},
		{
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Service',
				path: './src/content/services/**/*.md'
			}
		},
		{
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Post',
				path: './src/content/posts/**/*.md',
				refs: {
					tags: 'Tag'
				}
			}
		},
		{
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Tag',
				path: './src/content/tags/**/*.md'
			}
		},
		{
			use: '@gridsome/source-filesystem',
			options: {
				typeName: 'Category',
				path: './src/content/categories/**/*.md'
			}
		},
		{
			use: 'gridsome-plugin-netlify-cms',
			options: {
				configPath: 'static/admin/config.yml',
				publicPath: '/admin',
				htmlPath: 'src/admin/index.html',
				modulePath: 'src/admin/index.js'
			}
		}
	],
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, vueSrc)
			},
			extensions: ['.js', '.vue', '.json']
		},
		module: {
			rules: [
				// this will apply to both plain `.scss` files
				// AND `<style lang="scss">` blocks in `.vue` files
				{
					test: /\.scss$/,
					use: ['sass-loader']
				},
				{
					test: /\.md$/,
					use: ['raw-loader']
				}
			]
		}
	},
	transformers: {
		//Add markdown support to all file-system sources
		remark: {
			externalLinksTarget: '_blank',
			externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
			anchorClassName: 'icon icon-link',
			plugins: ['@gridsome/remark-prismjs']
		}
	}
};
