import React from 'react';

import NavLink from 'layouts/nav/link';

export default React.createClass({
	render: function() {
		return (
			<li className="dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					Teams 
					<span className="caret" />
				</a>
				<ul className="dropdown-menu">
					{ 
						this.props.teams.map(function(team) {
							return (
								<NavLink key={team.id} to={"/team/" + team.id} text={team.name + " (" + team.owner1 + ")"} />
							)
						})
					}
				</ul>
			</li>
		)
	}
});