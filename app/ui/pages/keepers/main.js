import React from 'react';

import LoggedInComponent from 'ui/logged-in-component';
import { connect } from 'react-redux';

import { getKeepers, saveKeepers } from 'api/keepers';
import { getFullTeam } from 'api/team';
import { teamId } from 'auth';
import PlayerList from 'ui/player-list';

import PlayerRow from 'ui/player-row';
import KeeperRow from 'ui/pages/keepers/keeper-row';

import { getNextSalary } from 'ui/pages/keepers/util';

const stateToProps = function(state) {
    return {
        metadata: state.reducer.metadata
    }
};

const Keepers = React.createClass({
	getInitialState: function() {
		return {
			allPlayers: [],
			availableSalary: undefined,
			keepers: { majorLeaguers: {}, minorLeaguers: {} }
		}
	},
	componentDidMount:function() {
		const self = this;
		getFullTeam(teamId(), function(response) {
			var allPlayers = [].concat(
							response.data.catcher,
							response.data.firstBase,
							response.data.secondBase,
							response.data.thirdBase,
							response.data.shortstop,
							response.data.middleInfield,
							response.data.cornerInfield,
							response.data.outfield,
							response.data.utility,
							response.data.pitcher,
							response.data.disabledList,
							response.data.bench,
							response.data.minorLeaguers);
			var availableSalary;
			response.data.draftDollars.forEach(function(dd) {
				if (dd.season == self.props.metadata.nextSeason && dd.draftDollarType.name == 'MLBAUCTION') {
					availableSalary = dd.amount;
				}
			});
			self.setState({ allPlayers : allPlayers });

			getKeepers(teamId(), function(response) {
				var keepersList = response.data.data;
				var keepers =  { majorLeaguers: [], minorLeaguers: [] }
				keepersList.map(function(keeper) {
					if (keeper.isMinorLeaguer) {
						keepers.minorLeaguers[keeper.playerId] = keeper;
					} else {
						keepers.majorLeaguers[keeper.playerId] = keeper;
						allPlayers.forEach(function(player) {
							if (player.id == keeper.playerId) {
								availableSalary -= getNextSalary(player);
							}
						});
					}
				});
				self.setState({ keepers : keepers, availableSalary: availableSalary })
			}, function(error) {
				console.log(error);
			});
		}, function(error) {
			console.log(error);
		});
	},
	saveKeepers: function() {
		var keepers = [];
		var self = this;
		Object.keys(self.state.keepers.minorLeaguers).forEach(function(playerId) {
			keepers.push(self.state.keepers.minorLeaguers[playerId]);
		});
		Object.keys(self.state.keepers.majorLeaguers).forEach(function(playerId) {
			keepers.push(self.state.keepers.majorLeaguers[playerId]);
		});
		saveKeepers(teamId(), keepers, function(response) {
			alert("Keepers saved!");
		}, function(error) {
			console.log(errors);
		});
	},
	toggleKeeper: function(playerId, nextSalary, isMinorLeaguer, selected, undoPick) {
		console.log(selected);
		var keeper = { playerId: playerId, isMinorLeaguer: isMinorLeaguer };
		var keepers = this.state.keepers;
		delete keepers.minorLeaguers[playerId];
		delete keepers.majorLeaguers[playerId];
		var availableSalary = this.state.availableSalary;
		debugger;
		if (selected) {
			if (isMinorLeaguer) {
				keepers.minorLeaguers[playerId] = keeper;
			} else {
				if (availableSalary - nextSalary < 0) {
					alert("Not enough funds to keep the selected player");
					undoPick();
					return;
				}
				keepers.majorLeaguers[playerId] = keeper;
				availableSalary -= nextSalary;
			}
		} else {
			availableSalary += nextSalary;
		}
		this.setState({ keepers: keepers, availableSalary: availableSalary });
	},
	render: function() {
		var self = this;
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-12">
						<h2>Keepers</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-1">
								<span className="h4">Rules</span>
							</div>
							<div className="col-md-11">
								<ul>
									<li>Players can be kept at most 3 times. There is no limit on the numbers of times a player can be kept as a Minor Leaguer.</li>
									<li>If a player does not have rookie eligibility (150 AB or 50 IP in a single season), they cannot be kept as a Minor Leaguer.</li>
									<li>Players kept as Major Leaguers have a salary increase of 3 dollars. Players kept as Minor leaguers have no salary increase.</li>
									<li>Undrafted players have a salary of 0. Traded players or players added as free agents retain their drafted salary.</li>
									<li>Teams can keep 10 Major Leaguers and 10 Minor Leaguers</li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="row">
									<div className="col-md-10">
										<span className="h4">Major League Keepers:</span>
									</div>
									<div className="col-md-2">
										<span className="h4">{Object.keys(this.state.keepers.majorLeaguers).length}</span>
									</div>
								</div>
								<div className="row">
									<div className="col-md-10">
										<span className="h4">Minor League Keepers:</span>
									</div>
									<div className="col-md-2">
										<span className="h4">{Object.keys(this.state.keepers.minorLeaguers).length}</span>
									</div>
								</div>
								<div className="row">
									<div className="col-md-10">
										<span className="h4">{this.props.metadata.nextSeason} Remaining Available Dollars:</span>
									</div>
									<div className="col-md-2">
										<span className="h4">{this.state.availableSalary}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<input type="button" value="SAVE KEEPERS" onClick={this.saveKeepers} />
					</div>
				</div>
				<div className="row">
					<div className="col-md-1">
						<i>Position</i>
					</div>
					<div className={"col-md-2"}>
						<i>Player</i>
					</div>
					<div className="col-md-1 text-right">
						<i>Current Keeper Season</i>
					</div>
					<div className="col-md-1 text-right">
						<i>Current Salary</i>
					</div>
					<div className="col-md-1 text-right">
						<i>Next Keeper Season</i>
					</div>
					<div className="col-md-1 text-right">
						<i>Next Salary</i>
					</div>
					<div className="col-md-2">
						<i>Keep as Major Leaguer</i>
					</div>
					<div className="col-md-2">
						<i>Keep as Minor Leaguer</i>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						{
							this.state.allPlayers.map(function(player) {
								return (
									<KeeperRow key={player.id} player={player} keepers={self.state.keepers} toggle={self.toggleKeeper} />
								)
							})
						}
					</div>
				</div>
			</LoggedInComponent>
		);
	}
});

export default connect(stateToProps)(Keepers);