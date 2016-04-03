import React from 'react';

import { Link } from 'react-router';

export default React.createClass({
	render: function() {
		return (
			<Link to={"/team/" + this.props.team.id}>
            	{this.props.team.name}
            </Link>
		)
	}
})