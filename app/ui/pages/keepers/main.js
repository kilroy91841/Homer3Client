import React from 'react';

import LoggedInComponent from 'ui/logged-in-component';

import { getKeepers, saveKeepers } from 'api/keepers';
import { getFullTeam } from 'api/team';
import { teamId } from 'auth';
import PlayerList from 'ui/player-list';

import PlayerRow from 'ui/player-row';
import Switch from 'react-bootstrap-switch';

const KeeperRow = React.createClass({
	render: function() {
		var majorLeaguerSelected = this.props.keepers.majorLeaguers[this.props.player.id] != undefined;
		var minorLeaguerSelected = this.props.keepers.minorLeaguers[this.props.player.id] != undefined;

		var hasRookieStatus = this.props.player.currentSeason.hasRookieStatus;
		var majorLeaguerCount = Object.keys(this.props.keepers.majorLeaguers).length;
		var minorLeaguerCount = Object.keys(this.props.keepers.minorLeaguers).length;
		var currentKeeperSeason = this.props.player.currentSeason.keeperSeason;
		var noKeeperYearsLeft = currentKeeperSeason == 3;
		var currentSalary = this.props.player.currentSeason.salary;
		var majorLeaguerDisabled = (!majorLeaguerSelected && majorLeaguerCount >= 10) || (noKeeperYearsLeft);
		var minorLeaguerDisabled = !minorLeaguerSelected && minorLeaguerCount >= 10;
		return (
			<PlayerRow player={this.props.player} 
				className={noKeeperYearsLeft ? "bg-danger" : majorLeaguerSelected || minorLeaguerSelected ? "bg-success" : ""}>
				<div className="col-md-1">
					{this.props.player.position.name}
				</div>
				<div className={"col-md-2"}>
					{this.props.player.name}
				</div>
				<div className="col-md-1 text-right">
					{currentKeeperSeason}
				</div>
				<div className="col-md-1 text-right">
					{currentSalary}
				</div>
				<div className="col-md-1 text-right">
					{noKeeperYearsLeft ? "--" : currentKeeperSeason + 1}
				</div>
				<div className="col-md-1 text-right">
					{noKeeperYearsLeft ? "--" : currentSalary + 3}
				</div>
				<div className="col-md-2">
					<input type="checkbox" 
						checked={ majorLeaguerSelected ? "checked" : null } 
						disabled={ majorLeaguerDisabled ? "disabled" : null }
						onChange={(cb)=>this.props.toggle(this.props.player.id, false, cb.target.checked)}
					/>
				</div>
				<div className="col-md-2">
					{
						hasRookieStatus ?
						<input type="checkbox" 
							checked={ minorLeaguerSelected ? "checked" : null } 
							disabled={ minorLeaguerDisabled ? "disabled" : null }
							onChange={(cb)=>this.props.toggle(this.props.player.id, true, cb.target.checked)}
						/>
						:
						null
					}
				</div>
			</PlayerRow>
		);
	}
})

const Keepers = React.createClass({
	getInitialState: function() {
		return {
			allPlayers: [],
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
			self.setState({ allPlayers : allPlayers })
		}, function(error) {
			console.log(error);
		});
		getKeepers(teamId(), function(response) {
			var keepersList = response.data.data;
			var keepers =  { majorLeaguers: [], minorLeaguers: [] }
			keepersList.map(function(keeper) {
				if (keeper.isMinorLeaguer) {
					keepers.minorLeaguers[keeper.playerId] = keeper;
				} else {
					keepers.majorLeaguers[keeper.playerId] = keeper;
				}
			});
			self.setState({ keepers : keepers })
		}, function(error) {
			console.log(error);
		});
	},
	saveKeepers: function() {
		var keepers = [];
		Object.keys(this.state.keepers.minorLeaguers).forEach(function(playerId) {
			keepers.push(this.state.keepers.minorLeaguers[playerId]);
		});
		Object.keys(this.state.keepers.majorLeaguers).forEach(function(playerId) {
			keepers.push(this.state.keepers.majorLeaguers[playerId]);
		});
		saveKeepers(teamId(), keepers, function(response) {
			alert(response.data.message);
		}, function(error) {
			console.log(errors);
		});
	},
	toggleKeeper: function(playerId, isMinorLeaguer, selected) {
		console.log(selected);
		var keeper = { playerId: playerId, isMinorLeaguer: isMinorLeaguer };
		var keepers = this.state.keepers;
		delete keepers.minorLeaguers[playerId];
		delete keepers.majorLeaguers[playerId];
		if (selected) {
			if (isMinorLeaguer) {
				keepers.minorLeaguers[playerId] = keeper;
			} else {
				keepers.majorLeaguers[playerId] = keeper;
			}
		}
		this.setState({ keepers: keepers });
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
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-6">
								Major League Keepers:
							</div>
							<div className="col-md-6">
								{Object.keys(this.state.keepers.majorLeaguers).length}
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								Minor League Keepers:
							</div>
							<div className="col-md-6">
								{Object.keys(this.state.keepers.minorLeaguers).length}
							</div>
						</div>
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

export default Keepers;