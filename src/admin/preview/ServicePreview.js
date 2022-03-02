import { createElement } from 'react';
import createReactClass from 'create-react-class';

const ServicePreview = createReactClass({
	render: function () {
		const { entry, getAsset, widgetsFor } = this.props;
		//const imagePath = entry.getIn(['data', 'image']);
		//const image = getAsset(imagePath);

		return '';
	}
});

export { ServicePreview };
