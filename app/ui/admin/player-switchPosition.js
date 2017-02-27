import React from 'react';
import Store from 'store';

import { switchPosition } from 'api/player';

import PlayerSearch from 'ui/player-search';
import Select from 'react-select';
import PositionSelect from 'ui/position-select';

const PlayerSwitchPosition = React.createClass({
	getInitialState: function() {
		return {
			player: {},
			position: {},
		}
	},
	doPositionChange: function() {
		switchPosition(this.state.player, this.state.position, function(response) {
			alert(response.data.message);
			Store.dispatch({
	            type: 'PUT_PLAYER_IN_MAP',
	            player: response.data.data
	        });
		}, function(error) {
			alert(error.data.message);
		});
	},
	onPositionChange: function(val) {
		this.setState({position: val})
	},
	onPlayerChange: function(player) {
		if (player == null) {
			player = {};
		}
		this.setState({ player: player });
	},
	render: function() {
		var currentPosition = this.state.player.currentSeason && this.state.player.currentSeason.fantasyPosition
			? this.state.player.currentSeason.fantasyPosition.name : " ";
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							SWITCH POSITION
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<PlayerSearch
								value={this.state.player}
								onChange={this.onPlayerChange}
								players={this.props.players}
							/>
						</div>
						<div className="col-md-3">
							{"Old Position: " + currentPosition + " "}
						</div>
						<div className="col-md-2">
							New Position
						</div>
						<div className="col-md-3">
							<PositionSelect 
								value={this.state.position}
								onChange={this.onPositionChange}	
							/>
						</div>
						<div className="col-md-1">
							<input type="submit" value="Switch Position" onClick={this.doPositionChange}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default PlayerSwitchPosition;