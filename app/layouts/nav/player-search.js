import React from 'react';
import store from 'store';

import { getPlayers } from 'api/player';

const PlayerSelect = React.createClass({
	playerClicked: function() {
		this.props.playerClicked(this.props.player);
	},
	render: function() {
		return (
			<li className="clickable" onClick={this.playerClicked}><a>{this.props.player.name}</a></li>
		)
	}
});

export default React.createClass({
	getInitialState: function() {
		return {
			open: "",
			allPlayers: [],
			players: [],
			searchText: ''
		}
	},
	onChange: function(e) {
		var enoughText = e.target.value.length > 2;
		var players = [];
		if (enoughText) {
			var re = new RegExp(e.target.value, 'gi');
			players = this.state.allPlayers.filter(
				function(player) {
					return player.name.match(re);
				}
			);
		}
		this.setState({ 
			players : players,
			open : enoughText ? "open" : "", 
			searchText : e.target.value
		});
	},
	componentWillMount: function() {
		var _this = this;
		getPlayers().then(function(response) {
			_this.setState({ allPlayers : response.data });
		});

		document.addEventListener('click', function(e) {
			var open = "";
			if ($(e.target).closest("." + _this.props.inputClasses).length > 0 && _this.state.searchText.length > 2) {
				open = "open";
			}
			_this.setState( { open: open } );
		}, false);
	},
	playerClicked: function(player) {
		store.dispatch({
            type: 'DISPLAY_PLAYER',
            player: player
        });
        this.setState({ open: "" });
	},
	render: function() {
		var _this = this;
		return (
			<li className={"dropdown " + this.props.liClasses + " " + this.state.open}>
				<form className={this.props.formClasses} role="search">
					<div className="form-group">
						<input onChange={this.onChange} 
						type="text" className={"form-control " + this.props.inputClasses } placeholder="Player Search" />
					</div>
				</form>
				<ul className="dropdown-menu">
					{ 
						this.state.players.map(function(player) {
							return <PlayerSelect player={player} playerClicked={_this.playerClicked} key={player.id} />
						})
					}
				</ul>
			</li>
		)
	}
});
