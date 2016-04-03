import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
	linkClicked: function() {
		if (this.props.changeTab)
		{
			this.props.changeTab(this.props.text);
		}
	},

	render: function() {
		return (
			<li onClick={this.linkClicked} className={ this.props.active ? "active" : ""}>
				<Link to={this.props.to}>{this.props.text}</Link>
			</li>
		)
	}
});
