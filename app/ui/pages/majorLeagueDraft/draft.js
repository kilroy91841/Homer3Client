import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

import PlayerRow from 'ui/player-row';
import TeamLink from 'ui/team-link';
import MajorLeagueDraftAdmin from 'ui/pages/majorLeagueDraft/admin';
import DraftHistory from 'ui/pages/majorLeagueDraft/history';
import PlayerSearch from 'ui/player-search';
import PlayerSwitchPosition from 'ui/admin/player-switchPosition';
import { getPlayers, getDraftDollars } from 'api/majorLeagueDraft';
import { teamId, isAdmin } from 'auth';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams,
        teamMap: state.reducer.teamMap
    }
};

const Team = React.createClass({
	render: function() {
		const playersLeft = this.props.data.playersLeft > 0 ? this.props.data.playersLeft : 0;
		var dollarsPerPick = 0;
		if (playersLeft > 0)
		{
			dollarsPerPick = (this.props.data.draftDollar.amount / this.props.data.playersLeft).toPrecision(2);	
		}
		var maxBid = this.props.data.playersLeft ? this.props.data.maxBid : 0;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row" onClick={()=>console.log(this.props.data)}>
						<div className="col-md-12">
							<h3><TeamLink team={this.props.data.team} /></h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<b>{"DOLLARS LEFT: " + this.props.data.draftDollar.amount}</b>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<b>{"PLAYERS LEFT: " + this.props.data.playersLeft}</b>
						</div>
					</div>  
					<div className="row">
						<div className="col-md-12">
							<b>{"MAX BID: " + maxBid}</b>
						</div>
					</div> 
					<div className="row">
						<div className="col-md-12">
							<b>{"DOLLARS/PICK: " + dollarsPerPick}</b>
						</div>
					</div>
					{
						this.props.data.players.map(function (player) {
							return (
								!player.name ?
								<div className="row">
									<div className="col-md-2">
										{player.currentSeason.fantasyPosition.name}
									</div>
								</div>
								:
								<PlayerRow key={player.id} player={player}>
									<div className="col-md-2">
										{
											player.currentSeason.fantasyPosition ? 
											player.currentSeason.fantasyPosition.name : 
											null
										}
									</div>
									<div className="col-md-6">
										{player.name}
									</div>
									<div className="col-md-4">
										{player.currentSeason.salary}
									</div>
								</PlayerRow>
							)
						})
					}
				</div>
			</div>
		)
	}
});

const DraftPlayerSearch = React.createClass({
	getInitialState: function() {
		return {
			playerToDraft: {},
			filterPositions: []
		}
	},
	onPlayerToDraftChange: function(player) {
		this.setState( { playerToDraft : player });
	},
	toggleFilterPosition: function(newFilterPosition) {
		var filterPositions = this.state.filterPositions;
		var contains = filterPositions.includes(newFilterPosition);
		if (contains)
		{
			filterPositions = filterPositions.filter(function(f) {
				return f != newFilterPosition;
			});
		}
		else
		{
			filterPositions.push(newFilterPosition);
		}
		this.setState({filterPositions : filterPositions});
	},
	render: function() {
		var self = this;
		const players = this.props.players.filter(function(player) {
			return self.state.filterPositions.length == 0 || self.state.filterPositions.includes(player.position.name);
		});
		players.forEach(function(player) {
			var searchDisplay = player.name + " - " + player.position.name;
			if (player.mlbTeam)
			{
				searchDisplay += " - " + player.mlbTeam.abbreviation;
			}
			player.searchDisplay = searchDisplay;
		});
		players.sort(function(a, b) {
			if (a.lastName < b.lastName)
			{
				return -1;
			}
			else if (a.lastName > b.lastName)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		});
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-6 col-md-offset-4">
							<div className="row">
								<div className="col-md-1">
									<label><input type="checkbox" value="C" onClick={()=>self.toggleFilterPosition("C")}/>C</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="1B" onClick={()=>self.toggleFilterPosition("1B")}/>1B</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="2B" onClick={()=>self.toggleFilterPosition("2B")}/>2B</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="3B" onClick={()=>self.toggleFilterPosition("3B")}/>3B</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="SS" onClick={()=>self.toggleFilterPosition("SS")}/>SS</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="OF" onClick={()=>self.toggleFilterPosition("OF")}/>OF</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="DH" onClick={()=>self.toggleFilterPosition("DH")}/>DH</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="P" onClick={()=>self.toggleFilterPosition("P")}/>P</label>
								</div>
								<div className="col-md-1">
									<label><input type="checkbox" value="RP" onClick={()=>self.toggleFilterPosition("RP")}/>RP</label>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<h3>Available Players</h3>
						</div>
						<div className="col-md-6">
							<PlayerSearch
								labelKey={"searchDisplay"}
								value={this.state.playerToDraft}
								onChange={this.onPlayerToDraftChange}
								players={players}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

const MajorLeagueDraft = React.createClass({
	getInitialState: function() {
		return {
			freeAgents: [],
			teams: [],
			currentPlayer: {},
			teamPlayers: [],
			picks: []
		}
	},
	addMissing: function(players, position, sort, needed) {
		const existingCount = players.filter(function(p) {
			return p.currentSeason.fantasyPosition && p.currentSeason.fantasyPosition.name == position;
		}).length;
		const toAdd = needed - existingCount;
		if (toAdd > 0)
		{
			for (var i = 0; i < toAdd; i++)
			{
				const dummyPlayer = {};
				dummyPlayer.currentSeason = {};
				dummyPlayer.currentSeason.fantasyPosition = { name : position, sort : sort};
				players.push(dummyPlayer);
			}
		}
	},
	getData: function() {
		const self = this;
		const myTeamId = teamId();
		getPlayers(function(data) {
			const freeAgents = data.data.data.freeAgents; 
			self.setState( { 
				freeAgents : freeAgents, 
				currentPlayer : data.data.data.currentPlayer,
				picks: data.data.data.picks 
			});
			store.dispatch({
				type: 'DISPLAY_DRAFT_HISTORY',
	        	picks: data.data.data.picks
	    	});
			const players = data.data.data.players;
			getDraftDollars(function(data) {
				const draftDollars = data.data.data;

				var teams = [];
				self.props.teams.forEach(function(team) {
					var teamView = {};
					teamView.team = team;
					var sortedPlayers = players.filter(function(player) {
						return player.currentSeason.teamId == team.id;
					});

					const rosteredPlayers = sortedPlayers.filter(function(player) {
						return !player.currentSeason.fantasyPosition || player.currentSeason.fantasyPosition.name != "MIN";
					}).length;
					teamView.playersLeft = 23 - rosteredPlayers;
					
					self.addMissing(sortedPlayers, "C", 1, 2);
					self.addMissing(sortedPlayers, "1B", 2, 1);
					self.addMissing(sortedPlayers, "2B", 3, 1);
					self.addMissing(sortedPlayers, "3B", 4, 1);
					self.addMissing(sortedPlayers, "SS", 5, 1);
					self.addMissing(sortedPlayers, "2B/SS", 6, 1);
					self.addMissing(sortedPlayers, "1B/3B", 7, 1);
					self.addMissing(sortedPlayers, "OF", 8, 5);
					self.addMissing(sortedPlayers, "U", 9, 1);
					self.addMissing(sortedPlayers, "P", 10, 9);
					
					sortedPlayers.sort(function(a, b) {
						if (!a.currentSeason.fantasyPosition && b.currentSeason.fantasyPosition)
						{
							return 1;
						} else if (a.currentSeason.fantasyPosition && !b.currentSeason.fantasyPosition)
						{
							return -1;
						} else if (a.currentSeason.fantasyPosition.sort < b.currentSeason.fantasyPosition.sort)
						{
							return -1;
						}
						else if (a.currentSeason.fantasyPosition.sort > b.currentSeason.fantasyPosition.sort)
						{
							return 1;
						}
						else
						{
							if (a.name && !b.name)
							{
								return -1;
							}
							else if (!a.name && b.name)
							{
								return 1;
							}
							else if (!a.name && b.name)
							{
								return 0;
							}
							else 
							{
								if (a.name > b.name)
								{
									return -1;
								}
								else if (a.name < b.name)
								{
									return 1;
								}
								else
								{
									return 0;
								}
							}
						}
					});

					teamView.players = sortedPlayers;
					teamView.draftDollar = draftDollars.filter(function(dd) {
						return dd.teamId == team.id;
					})[0];
					teamView.maxBid = teamView.draftDollar.amount - teamView.playersLeft + 1;
					teams.push(teamView);

					if (team.id == myTeamId)
					{
						self.setState( { teamPlayers : sortedPlayers });
					}
				});
				self.setState( { teams : teams });
			}, function(error) {
				alert(error.message);
			});
		}, function(error) {
			alert(error.message);
		});
	},
	componentWillMount: function() {
		this.getData()
	},
	componentDidMount: function() {
		var self = this;
		setInterval(function() { 
			self.getData();
		}.bind(this), 10000);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					{
						isAdmin() ?
						<MajorLeagueDraftAdmin players={this.state.freeAgents}/> :
						null
					}
					<div className="row">
						<div className="col-md-6">
							<h3>Current Player</h3>
						</div>
						<div className="col-md-6">
							<h3>
							<PlayerRow player={this.state.currentPlayer}>
								{this.state.currentPlayer ? this.state.currentPlayer.name : ""}
							</PlayerRow>
							</h3>
						</div>
					</div>
					<DraftPlayerSearch players={this.state.freeAgents} />
					<div className="row">
						<div className="col-md-8">
							<PlayerSwitchPosition players={this.state.teamPlayers.filter(function(player) {
								return player && player.name;
							})}/>
						</div>
					</div>
					<div className="row">
					{
						this.state.teams.map(function (team, ix) {
							if (ix < 3)
							{
								return (
									<div className="col-md-4">
										<Team key={team.id} data={team} />
									</div>
								)
							}
						})
					}
					</div>
					<div className="row">
					{
						this.state.teams.map(function (team, ix) {
							if (ix >= 3 && ix < 6)
							{
								return (
									<div className="col-md-4">
										<Team key={team.id} data={team} />
									</div>
								)
							}
						})
					}
					</div>
					<div className="row">
					{
						this.state.teams.map(function (team, ix) {
							if (ix >= 6 && ix < 9)
							{
								return (
									<div className="col-md-4">
										<Team key={team.id} data={team} />
									</div>
								)
							}
						})
					}
					</div>
					<div className="row">
					{
						this.state.teams.map(function (team, ix) {
							if (ix >= 9)
							{
								return (
									<div className="col-md-4">
										<Team key={team.id} data={team} />
									</div>
								)
							}
						})
					}
					</div>
					<DraftHistory teamMap={this.props.teamMap} picks={this.state.picks} />
				</div>
			</div>
		);
	}
});

export default connect(stateToProps)(MajorLeagueDraft);