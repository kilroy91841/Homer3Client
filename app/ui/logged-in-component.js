import React from 'react';
import { withRouter } from 'react-router';
import { isLoggedIn } from 'auth';

const LoggedInComponent = React.createClass({
	componentWillMount: function() {
		if (!isLoggedIn()) {
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

export default withRouter(LoggedInComponent);