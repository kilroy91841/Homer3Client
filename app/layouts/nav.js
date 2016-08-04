import React from 'react';
import { Link } from 'react-router';

import NavDropdown from 'layouts/nav/dropdown';
import NavLink from 'layouts/nav/link';
import PlayerSearch from 'ui/player-search';
import store from 'store';

import { isLoggedIn, teamId, removeUser, isAdmin } from 'auth';

export default React.createClass({
	getInitialState: function() {
		return {
			activeTab : "Home"
		}
	},
	changeTab: function(clickedTabName) {
		this.setState( { activeTab : clickedTabName } );
	},
	logout: function() {
		this.setState( { activeTab : "Home" } );
		removeUser();
	},
	onPlayerClick: function(player) {
		if (player) {
			store.dispatch({
	            type: 'DISPLAY_PLAYER',
	            playerId: player.id
	        });
    	}
	},
	render: function() {
		const loggedIn = isLoggedIn();
		const admin = isAdmin();
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">Homer At The Bat</Link>
					</div>
				<div id="navbar" className="navbar-collapse collapse">
					<ul className="nav navbar-nav">
						<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Home"} to="/" text="Home"/>
						{
							loggedIn ?
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "My Team"} to={"/team/" + teamId()} text="My Team"/>
							: null
						}
						<NavDropdown teams={this.props.teams}/>
						{
							loggedIn ?
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Vulture"} to="/vulture" text="Vulture"/>
							: null
						}
						{
							loggedIn ?
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Draft"} to="/minorLeagueDraft" text="Draft"/>
							: null
						}
						{
							loggedIn ?
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Auction"} to="/freeAgentAuction" text="Auction"/>
							: null
						}
					</ul>
					<ul className="nav navbar-nav navbar-right">
						{ 
							loggedIn ?
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Profile"} to="/profile" text="Profile"/>
							: null

						}
						{ 
							admin ?
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Admin"} to="/admin" text="Admin"/>
							: null

						}
						{
							loggedIn 
							?
							<NavLink changeTab={this.logout} active={ this.state.activeTab == "Logout"} to="/" text="Logout"/>
							:
							<NavLink changeTab={this.changeTab} active={ this.state.activeTab == "Login"} to="/login" text="Login"/>
						}
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