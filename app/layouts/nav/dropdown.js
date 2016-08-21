import React from 'react';

import NavLink from 'layouts/nav/link';

export default React.createClass({
	render: function() {
		return (
			<li className="dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					{this.props.label}
					<span className="caret" />
				</a>
				<ul className="dropdown-menu">
					{this.props.children}
				</ul>
			</li>
		)
	}
});