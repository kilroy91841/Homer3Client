import React from 'react';
import Select from 'react-select';
import { getFullTeam } from 'api/team';

import PlayerSearch from 'ui/player-search';
import TradeElement from 'ui/pages/trade/trade-element';

export default React.createClass({
	getInitialState: function() {
		return {
			teamFrom: null,
			teamTo: null,
			player: null,
			minorLeaguePick: null,
			swapTrade: null,
			draftDollar: null,
			draftDollarAmount: null,
			teamData: { minorLeaguePicks: [], draftDollars: [], majorLeaguers: [], minorLeaguers: [] }
		}
	}, 
	teamFromChange: function(team) {
		var teamTo;
		this.props.filteredTeams.forEach(function(fTeam) {
			if (fTeam.id != team.id) {
				teamTo = fTeam;
			}
		});
		this.setState({teamFrom: team, teamTo: teamTo });
		this.clearState();

		var self = this;
		getFullTeam(team.id, function(response) {
            self.setState({
                teamData: response.data
            })
        }, function(err) {
            console.error(err);
        });
	},
	teamToChange: function(team) {
		this.setState({teamTo: team});
	},
	playerChange: function(player) {
		this.clearState();
		this.setState({ player: player });
	},
	pickChange: function(pick) {
		this.clearState();
		this.setState({ minorLeaguePick: pick});
	},
	draftDollarChange: function(draftDollar) {
		this.clearState();
		this.setState({ draftDollar: draftDollar });
	},
	clearState: function() {
		$(this.refs.draftDollarInput).val(undefined);
		this.setState({ draftDollar: null, minorLeaguePick: null, player: null, swapTrade: null, draftDollarAmount: null });
	},
	swapChange: function(e) {
		this.setState({ swapTrade: e.target.checked ? "true" : null });
	},
	amountChange: function(e) {
		this.setState({ draftDollarAmount: e.target.value });
	},
	addElement: function() {
		if (this.state.draftDollar != null && this.state.draftDollarAmount == null) {
			alert("You must select a draft dollar amount");
			return;
		}
		this.props.addElement({
			teamFromId: this.state.teamFrom.id,
			teamToId: this.state.teamTo.id,
			player: this.state.player,
			playerId: this.state.player ? this.state.player.id : null,
			minorLeaguePick: this.state.minorLeaguePick,
			minorLeaguePickId: this.state.minorLeaguePick ? this.state.minorLeaguePick.id : null,
			swapTrade: this.state.swapTrade,
			draftDollar: this.state.draftDollar,
			draftDollarId: this.state.draftDollar ? this.state.draftDollar.id : null,
			draftDollarAmount: this.state.draftDollarAmount
		});
	},
	render: function() {
		return ( 
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<span className="h4">Add new trade element</span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							From
						</div>
						<div className="col-md-4">
							<Select 
								name="team-from-select"
								options={this.props.filteredTeams}
								labelKey={"name"}
								valueKey={"id"}
								value={this.state.teamFrom}
								onChange={this.teamFromChange}
								scrollMenuIntoView={false}
							/>
						</div>
						<div className="col-md-2">
							To
						</div>
						<div className="col-md-4">
							{this.state.teamTo ? this.state.teamTo.name : null}
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="row">
								<div className="col-md-12">
									Add Player
								</div>
								<div className="col-md-12">
									<PlayerSearch
										players={this.state.teamData.majorLeaguers.concat(this.state.teamData.minorLeaguers)}
										value={this.state.player}
										onChange={this.playerChange}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row">
								<div className="col-md-12">
									Add Minor League Pick
								</div>
								<div className="col-md-12">
									<Select 
										name="pick-select"
										options={this.state.teamData.minorLeaguePicks}
										labelKey={"text"}
										valueKey={"id"}
										value={this.state.minorLeaguePick}
										onChange={this.pickChange}
										scrollMenuIntoView={false}
									/>
									<input type="checkbox" onChange={this.swapChange}/>Swap Pick
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row">
								<div className="col-md-12">
									Add Draft Dollars
								</div>
								<div className="col-md-12">
									<Select 
										name="pick-select"
										options={this.state.teamData.draftDollars}
										labelKey={"text"}
										valueKey={"id"}
										value={this.state.draftDollar}
										onChange={this.draftDollarChange}
										scrollMenuIntoView={false}
									/>
									<input 	ref="draftDollarInput"
											type="number" 
											min="0" 
											max={this.state.draftDollar ? this.state.draftDollar.amount : 0}
											onChange={this.amountChange}
									/>
									{
										this.state.draftDollar ? "max: " + this.state.draftDollar.amount : ""
									}
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
						{
							this.state.player || this.state.minorLeaguePick || this.state.draftDollar ?
							<input type="submit" onClick={this.addElement} value="ADD ELEMENT"/> :
							""
						}
						</div>
					</div>
				</div>
			</div>
		)
	}
});