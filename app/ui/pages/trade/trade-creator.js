import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import TradeElement from 'ui/pages/trade/trade-element';
import TradeElementCreator from 'ui/pages/trade/trade-element-creator';

import { proposeTrade } from 'api/trade';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams
    }
};

const TradeCreator = React.createClass({
	getInitialState: function() {
		return {
			team1: this.props.teamFrom,
			team2: null,
			tradeElements: []
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.teamFrom) {
			this.setState({ team1: nextProps.teamFrom });
		}
	},
	teamOptions: function() {
		var opts = [];
		var teamFrom = this.props.teamFrom;
		this.props.teams.map(function(team) {
			if (teamFrom == undefined || teamFrom.id != team.id) {
				opts.push(team);
			}
		});
		return opts;
	},
	team1Change: function(newVal) {
		this.setState({ team1 : newVal});
	},
	team2Change: function(newVal) {
		this.setState({ team2 : newVal});
	},
	tradeElementAdded: function(tradeElement) {
		var foundDupe = false;
		this.state.tradeElements.map(function(te) {
			if ((te.playerId != null && te.playerId == tradeElement.playerId) || 
				(te.draftDollarId != null && te.draftDollarId == tradeElement.draftDollarId) ||
				(te.minorLeaguePickId != null && te.minorLeaguePickId == tradeElement.minorLeaguePickId)) {
					foundDupe = true;
					alert("You have already added this element to the trade");
				}
		});
		if (foundDupe) {
			return;
		}
		this.state.tradeElements.push(tradeElement);
		this.setState({ tradeElements: this.state.tradeElements });
	},
	tradeElementRemoved: function(tradeElement) {
		var indexOf = this.state.tradeElements.indexOf(tradeElement);
		if (indexOf >= 0) {
			this.state.tradeElements.splice(indexOf, 1);
			this.setState({ tradeElements: this.state.tradeElements });
		}
	},
	proposeTrade: function() {
		var self = this;
		proposeTrade(this.state, function(response) {
			alert(response.data.message);
			debugger;
			self.props.proposeTrade(response.data.data);
		}, function(error) {
			alert(response.data.message);
		});
	},
	render: function() {
		var self = this;
		return ( 
			<div className="row">
				<div className="col-md-12" >
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-6">
									<div className="row">
										<div className="col-md-12">
											<span className="h4">Team 1</span>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											{
												this.props.teamFrom == undefined
												?
												<Select 
													name="team-1-select"
													options={this.teamOptions()}
													labelKey={"name"}
													valueKey={"id"}
													value={this.state.team1}
													onChange={this.team1Change}
													scrollMenuIntoView={false}
												/>
												:
												<div className="row">
													<div className="col-md-12">
														{this.props.teamFrom.name}
													</div>
												</div>
											}
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="row">
										<div className="col-md-12">
											<span className="h4">Team 2</span>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<Select 
												name="team-2-select"
												options={this.teamOptions()}
												labelKey={"name"}
												valueKey={"id"}
												value={this.state.team2}
												onChange={this.team2Change}
												scrollMenuIntoView={false}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
						{
							self.state.tradeElements
							.filter(function(te) { 
								return te.teamFromId == self.state.team1.id;
							})
							.map(function(te, ix) {
								return (
									<TradeElement key={ix} data={te}
										removable={true}
										tradeElementRemoved={self.tradeElementRemoved}/>
								)
							})
						}
						</div>
						<div className="col-md-6">
						{
							self.state.tradeElements
							.filter(function(te) { 
								return te.teamFromId == self.state.team2.id;
							})
							.map(function(te, ix) {
								return (
									<TradeElement key={ix} data={te}
										removable={true}
										tradeElementRemoved={self.tradeElementRemoved}/>
								)
							})
						}
						</div>
					</div>
					<br />
					<br />
					{
						this.state.team1 && this.state.team2 ?
						<div className="row">
							<div className="col-md-12">
								<TradeElementCreator 
									filteredTeams={[this.state.team1 || {}, this.state.team2 || {}]}
									addElement={this.tradeElementAdded}
									removeElement={this.tradeElementRemoved}
								/>
								<br />
								<br />
								<div className="row">
									{
										this.props.isAdmin ?
										<div className="col-md-6">
											<input type="submit" value="ACCEPT TRADE" onClick={this.forceTrade} />
										</div>
										:
										null
									}
									<div className="col-md-6">
										<input type="submit" value="PROPOSE TRADE" onClick={this.proposeTrade} />
									</div>
								</div>
							</div>
						</div>
						:
						null
					}
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(TradeCreator);