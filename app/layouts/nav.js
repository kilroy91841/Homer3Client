import React from 'react';
import { Link } from 'react-router';

import NavDropdown from 'layouts/nav/dropdown';
import NavLink from 'layouts/nav/link';
import PlayerSearch from 'ui/player-search';
import store from 'store';

export default React.createClass({
	getInitialState: function() {
		return {
			activeTab : "Home"
		}
	},
	changeTab: function(clickedTabName) {
		this.setState( { activeTab : clickedTabName } );
	},
	onPlayerClick: function(player) {
		if (player) {
			store.dispatch({
	            type: 'DISPLAY_PLAYER',
	            player: player
	        });
    	}
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
						<li className="navbar-right" style={{ paddingTop:"7px"}}>
							<PlayerSearch classProp={"navbar-right"} onChange={this.onPlayerClick}/>
						</li>
					</ul>
				</div>
				</div>
			</nav>
		)
	}
});