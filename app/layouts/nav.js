import React from 'react';
import { Link } from 'react-router';

import NavDropdown from 'layouts/nav/dropdown';
import NavLink from 'layouts/nav/link';
import PlayerSearch from 'layouts/nav/player-search';

export default React.createClass({
	getInitialState: function() {
		return {
			activeTab : "Home"
		}
	},
	changeTab: function(clickedTabName) {
		this.setState( { activeTab : clickedTabName } );
	},
	render: function() {
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">Homer At The Bat</Link>
					</div>
				<div id="navbar" className="navbar-collapse collapse">
					<ul className="nav navbar-nav">
						<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Home"} to="/" text="Home"/>
						<NavDropdown teams={this.props.teams}/>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<PlayerSearch />
					</ul>
				</div>
				</div>
			</nav>
		)
	}
});