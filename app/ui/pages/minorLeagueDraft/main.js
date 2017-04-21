import React from 'react';
import Moment from 'moment-timezone';
import { withRouter, Link } from 'react-router';
import { getMinorLeagueDraft, makePick, skipPick } from 'api/minorLeagueDraft';
import { getMinorLeaguers } from 'api/team';
import { switchTeam } from 'api/player';

import LoggedInComponent from 'ui/logged-in-component';
import MinorLeagueDraftPickList from 'ui/pages/minorLeagueDraft/minor-league-draft-pick-list';
import MinorLeaguePickForm from 'ui/pages/minorLeagueDraft/minor-league-pick-form';
import MinorLeagueDraftAdmin from 'ui/pages/minorLeagueDraft/minor-league-draft-admin';
import PlayerSearch from 'ui/player-search';

import { teamId, isAdmin } from 'auth';

const MinorLeagueDraft = React.createClass({
	getInitialState: function() {
		return {
			picks: [],
			currentPick: undefined,
			adminPickId: undefined,
			minorLeaguers: [],
			selectedMinorLeaguer: undefined,
			season: 2017
		}
	},
	componentWillMount: function() {
		this.getDraft(this.state.season);
		const self = this;
		getMinorLeaguers(teamId(), function(response) {
			self.setState( { minorLeaguers : response.data.data });
		}, function(error) {
			console.log(error);
		});
	},
	getDraft: function(season) {
		const self = this;
		getMinorLeagueDraft(season, function(response) {
			self.setState( { 
				season: season,
				picks : response.data.data.picks, 
				currentPick : response.data.data.currentPick } );
		}, function(error) {
			console.log(error);
		});
	},
	resetDraft: function(newDraft) {
		console.log(newDraft);
		this.setState( { picks : newDraft.picks, currentPick : newDraft.currentPick } );
	},
	selectedMinorLeaguer: function(player) {
		this.setState( { selectedMinorLeaguer : player });
	},
	dropMinorLeaguer: function() {
		if (this.state.selectedMinorLeaguer) {
			confirm("Are you sure you wish to drop " + this.state.selectedMinorLeaguer.name + "?");
			var self = this;
			switchTeam(this.state.selectedMinorLeaguer, 0, function(response) {
				alert("Drop Successful");
				var newMinorLeaguers = [];
				self.state.minorLeaguers.forEach(function(minorLeaguer) {
					if (minorLeaguer.id != self.state.selectedMinorLeaguer.id) {
						newMinorLeaguers.push(minorLeaguer);
					}
				});
				self.setState( { selectedMinorLeaguer: undefined, minorLeaguers : newMinorLeaguers });
			}, function(error) {
				alert("There was an issue with your request.");
				console.log(error);
			});
		}
	},
	onPickResponse: function(response) {
		alert(response.data.message);
		var data = response.data.data;
		if (data != null) {
			this.setState({ currentPick: data.nextPick });
			var newPicksArray = [];
			var newMinorLeaguer = undefined;
			this.state.picks.forEach(function(pick) {
				if (pick.id == data.id) {
					newPicksArray.push(data);
					newMinorLeaguer = data.playerView;
				} else {
					newPicksArray.push(pick);
				}
			});
			this.setState({ picks : newPicksArray, minorLeaguers : this.state.minorLeaguers.concat(newMinorLeaguer) });
		}
	},
	onPickSubmit: function(pick) {
		var name = pick.playerView.name ? pick.playerView.name : pick.playerView.mlbPlayerId;
		confirm("You are about to draft " + name + ". Proceed?");
		makePick(pick, this.onPickResponse, function(error) {
			alert(error.message);
		});
	},
	onPickSkip: function() {
		var self = this;
		confirm("Are you sure you want to skip your pick?");
		skipPick(this.state.currentPick.id, this.onPickResponse, function(error) {
			alert(error.message);
		});
	},
	onPickClick: function(pickId) {
		this.setState({ adminPickId: pickId });
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
						<div className="col-md-12">
							<h1>Minor League Draft</h1>
						</div>
				</div>
				<div className="row">
					<div className="col-md-1">
						<h3 className="clickable" onClick={()=>this.getDraft(2016)}>2016</h3>
					</div>
					<div className="col-md-1">
						<h3 className="clickable" onClick={()=>this.getDraft(2017)}>2017</h3>
					</div>
				</div>
				{
					isAdmin() ?
					<MinorLeagueDraftAdmin pickId={this.state.adminPickId} resetDraft={this.resetDraft}/> :
					null
				}
				{
					this.state.currentPick ? 
					<div className="row">
						<div className="col-md-6">
							<h2>On the Clock: {this.state.currentPick.owningTeam.name}</h2>
							<h3>{"Deadline: "}
									{
										this.state.currentPick.deadlineUtc != null ? 
										Moment(this.state.currentPick.deadlineUtc.millis).calendar() :
										"Coming Soon"
									}
							</h3>
						</div>
						<div className="col-md-6">
							<h3>My Minor Leaguers</h3>
							<PlayerSearch
								players={this.state.minorLeaguers}
								value={this.state.selectedMinorLeaguer}
								onChange={this.selectedMinorLeaguer}
							/>
							<input type="submit" value="DROP MINOR LEAGUER" onClick={this.dropMinorLeaguer} />
						</div>
					</div>
					:
					null
				}
				{
					this.state.currentPick && this.state.currentPick.owningTeamId == teamId() 
					&& this.state.currentPick.deadlineUtc != null ?
					<MinorLeaguePickForm pick={this.state.currentPick} onPickSubmit={this.onPickSubmit} onPickSkip={this.onPickSkip}/> :
					null
				}
				<MinorLeagueDraftPickList currentPick={this.state.currentPick} picks={this.state.picks} onClick={this.onPickClick}/>
			</LoggedInComponent>
		);
	}
});

export default withRouter(MinorLeagueDraft);