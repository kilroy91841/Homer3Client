import React from 'react';

import PlayerSearch from 'ui/player-search';
import Store from 'store';

import { updatePlayerSeason } from 'api/player';
import FieldUpdate from 'ui/admin/field-update';

const UpdatePlayerSeason = React.createClass({
	getInitialState: function() {
		return {
			playerSeason: {},
			newHasRookieStatus: undefined,
			newIsMinorLeaguer: undefined,
		};
	},
	onPlayerChange: function(p) {
		this.setState({ 
			playerSeason : p.currentSeason, 
			newHasRookieStatus : p.currentSeason.hasRookieStatus, 
			newIsMinorLeaguer : p.currentSeason.isMinorLeaguer
		});
	},
	onHasRookieStatusChange: function(e) {
		this.setState({ newHasRookieStatus: e.target.value });
	},
	onIsMinorLeaguerChange: function(e) {
		this.setState({ newIsMinorLeaguer: e.target.value });
	},
	onSubmit: function() {
		var playerSeasonToUpdate = $.extend({}, this.state.playerSeason);
		playerSeasonToUpdate.hasRookieStatus = this.state.newHasRookieStatus;
		playerSeasonToUpdate.isMinorLeaguer = this.state.newIsMinorLeaguer;

		updatePlayerSeason(playerSeasonToUpdate, function(response) {
			alert(response.data.message);
			Store.dispatch({
	            type: 'PUT_PLAYER_IN_MAP',
	            player: response.data.data
	        });
		}, function(error) {
			alert(error.data.message);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-11">
							UPDATE PLAYER SEASON
						</div>
						<div className="col-md-1">
							<input type="submit" value="GO!" onClick={this.onSubmit} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<PlayerSearch
								value={this.state.player}
								onChange={this.onPlayerChange}
							/>
						</div>
						<div className="col-md-7">
							<FieldUpdate 
								label="Has Rookie Status"
								oldValue={this.state.playerSeason.hasRookieStatus} 
								newValue={this.state.newHasRookieStatus} 
								onChange={this.onHasRookieStatusChange} />
							<FieldUpdate 
								label="Is Minor Leaguer"
								oldValue={this.state.playerSeason.isMinorLeaguer} 
								newValue={this.state.newIsMinorLeaguer} 
								onChange={this.onIsMinorLeaguerChange} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default UpdatePlayerSeason;