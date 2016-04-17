import React from 'react';
import Select from 'react-select';
import { getFullTeam } from 'api/team';
import { getTradeElementText } from 'ui/admin/trade/tradeHelper';

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
		this.setState({teamFrom: team});

		var self = this;
		getFullTeam(team.id).then(function(response) {
            self.setState({
                teamData: response.data
            })
        }).catch(function(err) {
            console.error(err);
        });
	},
	teamToChange: function(team) {
		this.setState({teamTo: team});
	},
	playerChange: function(player) {
		this.setState({ player: player, minorLeaguePick: null, draftDollar: null, swapTrade: null, draftDollarAmount: null });
	},
	pickChange: function(pick) {
		this.setState({ minorLeaguePick: pick, player: null, draftDollar: null, swapTrade: null, draftDollarAmount: null });
	},
	draftDollarChange: function(draftDollar) {
		this.setState({ draftDollar: draftDollar, minorLeaguePick: null, player: null, swapTrade: null, draftDollarAmount: null });
	},
	swapChange: function(e) {
		this.setState({ swapTrade: e.target.checked ? "true" : null });
	},
	amountChange: function(e) {
		this.setState({ draftDollarAmount: e.target.value });
	},
	addElement: function() {
		this.props.addElement({
			teamFrom: this.state.teamFrom,
			teamTo: this.state.teamTo,
			player: this.state.player,
			minorLeaguePick: this.state.minorLeaguePick,
			swapTrade: this.state.swapTrade,
			draftDollar: this.state.draftDollar,
			draftDollarAmount: this.state.draftDollarAmount
		});
	},
	render: function() {
		return ( 
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							Add new trade element
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
							<Select 
								name="team-to-select"
								options={this.props.filteredTeams}
								labelKey={"name"}
								valueKey={"id"}
								value={this.state.teamTo}
								onChange={this.teamToChange}
								scrollMenuIntoView={false}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="row">
								<div className="col-md-12">
									Add Player
								</div>
								<div className="col-md-12">
									<Select 
										name="player-select"
										options={this.state.teamData.majorLeaguers.concat(this.state.teamData.minorLeaguers)}
										labelKey={"name"}
										valueKey={"id"}
										value={this.state.player}
										onChange={this.playerChange}
										scrollMenuIntoView={false}
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
									<input 	type="number" 
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
							TRADING: {getTradeElementText(this.state)} {this.state.teamFrom ? "from " + this.state.teamFrom.name : ""} {this.state.teamTo ? " to " + this.state.teamTo.name : ""}
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