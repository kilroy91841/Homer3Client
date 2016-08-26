import React from 'react';
import Store from 'store';

import { getDraftDollar } from 'api/draftDollar';

import Row from 'ui/component/row';

export default React.createClass({
	draftDollarClicked: function() {
		getDraftDollar(this.props.draftDollarId, function(response) {
			Store.dispatch({
	            type: 'DISPLAY_DRAFT_DOLLAR',
	            draftDollar: response.data.data
	        });	
		}, function(error) {
			debugger;
			alert(error.data.message);
		});
		
	},

	render: function() {
		return (
			<Row onClick={this.draftDollarClicked}>
				{this.props.children}
			</Row>
		)
	}
});