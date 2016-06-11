import React from 'react';
import Moment from 'moment-timezone';
import { withRouter } from 'react-router';
import { getMinorLeagueDraft, makePick, skipPick } from 'api/minorLeagueDraft';

import LoggedInComponent from 'ui/logged-in-component';
import MinorLeagueDraftPickList from 'ui/pages/minorLeagueDraft/minor-league-draft-pick-list';
import MinorLeaguePickForm from 'ui/pages/minorLeagueDraft/minor-league-pick-form';
import MinorLeagueDraftAdmin from 'ui/pages/minorLeagueDraft/minor-league-draft-admin';

import { teamId, isAdmin } from 'auth';

const MinorLeagueDraft = React.createClass({
	getInitialState: function() {
		return {
			picks: [],
			currentPick: undefined,
			adminPickId: undefined
		}
	},
	componentWillMount: function() {
		const self = this;
		getMinorLeagueDraft(function(response) {
			self.setState( { picks : response.data.data.picks, currentPick : response.data.data.currentPick } );
		}, function(error) {
			console.log(error);
		});
	},
	resetDraft: function(newDraft) {
		console.log(newDraft);
		this.setState( { picks : newDraft.picks, currentPick : newDraft.currentPick } );
	},
	onPickResponse: function(response) {
		alert(response.data.message);
		var data = response.data.data;
		if (data != null) {
			this.setState({ currentPick: data.nextPick });
			var newPicksArray = [];
			this.state.picks.forEach(function(pick) {
				if (pick.id == data.id) {
					newPicksArray.push(data);
				} else {
					newPicksArray.push(pick);
				}
			});
			this.setState({ picks : newPicksArray });
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
				{
					isAdmin() ?
					<MinorLeagueDraftAdmin pickId={this.state.adminPickId} resetDraft={this.resetDraft}/> :
					null
				}
				{
					this.state.currentPick ? 
					<div className="row">
						<div className="col-md-12">
							<h2>On the Clock: {this.state.currentPick.owningTeam.name}</h2>
							<h3>{"Deadline: "}
									{
										this.state.currentPick.deadlineUtc != null ? 
										Moment(this.state.currentPick.deadlineUtc.millis).calendar() :
										"Coming Soon"
									}
							</h3>
						</div>
					</div>
					:
					null
				}
				{
					this.state.currentPick && this.state.currentPick.owningTeamId == teamId() 
					&& this.state.currentPick.deadlineUtc != null ?
					<MinorLeaguePickForm pick={this.state.currentPick} onPickSubmit={this.onPickSubmit} /> :
					null
				}
				<MinorLeagueDraftPickList currentPick={this.state.currentPick} picks={this.state.picks} onClick={this.onPickClick}/>
			</LoggedInComponent>
		);
	}
});

export default withRouter(MinorLeagueDraft);