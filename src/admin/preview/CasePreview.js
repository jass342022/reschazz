import React, { createElement } from 'react';
import createReactClass from 'create-react-class';

const CasePreview = createReactClass({
	render: function () {
		const { entry, getAsset, widgetsFor } = this.props;
		//const imagePath = entry.getIn(['data', 'image']);
		//const image = getAsset(imagePath);

		let casePreviewElement = createElement('div', { className: 'case-view' }, createElement('h1', { className: 'case-title' }, entry.getIn(['data', 'title'])), createElement('div', { className: 'case-header' }, entry.getIn(['data', 'header'])));

		return casePreviewElement;
	}
});

export { CasePreview };
