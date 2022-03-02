import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const createReactClass = require('create-react-class');

/**
 * Create the control widget, this will add a form element to the cms UI
 */
const IdControlWidget = createReactClass({
	getInitialState: function () {
		return {};
	},
	componentDidMount: function () {
		// If this widget doesn't have an ID yet we create one using the UUID package
		if (!this.props.value) {
			this.props.onChange(uuidv4());
		}
	},
	handleChange() {
		this.props.onChange(uuidv4());
	},
	render: function () {
		return React.createElement('p', null, `${this.props.value}`);
	}
});

/**
 * Create the preview widget, this will display the widgets value in the NetlifyCMS preview pane
 */
const IdControlPreview = createReactClass({
	getInitialState: function () {
		return {};
	},
	render: function () {
		return React.createElement('p', null, `ID: ${this.props.value}`);
	}
});

export { IdControlWidget, IdControlPreview };
