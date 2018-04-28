import React from 'react';

import Store from 'store';
import _ from 'lodash';

import FieldUpdate from 'ui/admin/field-update';
import PlayerSearch from 'ui/player-search';
import PositionSelect from 'ui/position-select';

import { fullPlayerCreate } from 'api/player';

const FullPlayerCreator = React.createClass({
	getInitialState: function() {
		return {
			player: {},
			playerSeason: {}
		};
	},
	onPlayerChange: function(p) {
		this.setState({ 
			player : p,
			playerSeason: {}
		});
	},
	onFieldChange: function(e, field) {
		debugger;
		_.set(this.state, field, e.target.value);
		this.setState(this.state);
	},
	onSubmit: function() {
		delete this.state.player.mlbTeam;
		this.state.player.mlbTeamId = 1;
		this.state.player.playerSeasons = [this.state.playerSeason];
		fullPlayerCreate(this.state.player, function(response) {
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
							CREATE PLAYER SEASON
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
							<div className="row">
								<div className="col-md-12">
									<FieldUpdate
										label="First Name" 
										oldValue=""
										newValue={this.state.player.firstName} 
										onChange={e => this.onFieldChange(e, "player.firstName")}/>
									<FieldUpdate
										label="Last Name" 
										oldValue=""
										newValue={this.state.player.lastName} 
										onChange={e => this.onFieldChange(e, "player.lastName")}/>
									<div className="row">
										<div className="col-md-6">
											Position
										</div>
										<div className="col-md-6">
											<PositionSelect 
												value={this.state.player.position}
												onChange={e => this.onFieldChange(e, "player.position")}/>
										</div>
									</div>
									<FieldUpdate
										label="MLB Player Id" 
										oldValue=""
										newValue={this.state.player.mlbPlayerId} 
										onChange={e => this.onFieldChange(e, "player.mlbPlayerId")}/>
									<FieldUpdate
										label="Season"
										oldValue=""
										newValue={this.state.playerSeason.season}
										onChange={e => this.onFieldChange(e, "playerSeason.season")}/>
									<FieldUpdate
										label="Keeper Team"
										oldValue=""
										newValue={this.state.playerSeason.keeperTeamId}
										onChange={e => this.onFieldChange(e, "playerSeason.keeperTeamId")}/>
									<FieldUpdate
										label="Keeper Season"
										oldValue=""
										newValue={this.state.playerSeason.keeperSeason}
										onChange={e => this.onFieldChange(e, "playerSeason.season")}/>
									<FieldUpdate
										label="Draft Team"
										oldValue=""
										newValue={this.state.playerSeason.draftTeamId}
										onChange={e => this.onFieldChange(e, "playerSeason.draftTeamId")}/>
									<FieldUpdate
										label="Salary"
										oldValue=""
										newValue={this.state.playerSeason.salary}
										onChange={e => this.onFieldChange(e, "playerSeason.salary")}/>
									<FieldUpdate
										label="Is Minor Leaguer (true/false)"
										oldValue=""
										newValue={this.state.playerSeason.isMinorLeaguer}
										onChange={e => this.onFieldChange(e, "playerSeason.isMinorLeaguer")}/>
								</div>
							</div> 
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default FullPlayerCreator;