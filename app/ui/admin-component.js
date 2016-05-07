import React from 'react';
import { withRouter } from 'react-router';
import { isAdmin } from 'auth';

const AdminComponent = React.createClass({
	componentWillMount: function() {
		if (!isAdmin()) {
			this.props.router.push("/");
		}
	},
	render: function() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
});

export default withRouter(AdminComponent);