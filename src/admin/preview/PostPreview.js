import { createElement } from 'react';
import createReactClass from 'create-react-class';

const PostPreview = createReactClass({
	render: function () {
		const { entry, getAsset, widgetsFor } = this.props;
		//const imagePath = entry.getIn(['data', 'image']);
		//const image = getAsset(imagePath);

		return '';
	}
});

export { PostPreview };
