import React from 'react';
import { withRouter } from 'react-router';

import { getFullTeam } from 'api/team';
import { getVultures, createVulture } from 'api/vulture';
import { teamId } from 'auth';

import LoggedInComponent from 'ui/logged-in-component';
import VulturePanel from 'ui/vulture-panel';
import ExistingVultures from 'ui/pages/vulture/existing-vultures';
import CreateVulture from 'ui/pages/vulture/create-vulture';

const Vulture = React.createClass({
	getInitialState: function() {
		return {
			player : this.props.location.state ? this.props.location.state.player : undefined,
			existingVultures: [],
			dropPlayer : {},
			players: [],
			isCommissionerVulture: "false"
		}
	},
	componentWillMount: function() {
		const self = this;
		getVultures(function(response) {
			self.setState( { existingVultures : response.data.data } );
		}, function(error) {
			console.log(error);
		});
	},
	componentDidMount: function() {
		const self = this;
		getFullTeam(teamId(), function(response) {
			self.setState({ players : response.data.majorLeaguers })
		}, function(error) {
			console.log(error);
		});
	},
	changeDropPlayer: function(player) {
		this.setState( { dropPlayer: player });
	},
	onPlayerClick: function(p) {
		if (p.currentSeason.teamId == teamId()) {
			alert("Why do you want to vulture a player from your own team? Stop it.");
			return;
		}
		this.setState({ player : p });
	},
	setCommissionerVulture: function(e) {
		this.setState({ isCommissionerVulture: e.target.checked ? "true" : "false" });
	},
	submitVulture: function() {
		const self = this;
		const vultureRequest = {
			vultureTeamId : teamId(),
			playerId: this.state.player.id,
			dropPlayerId: this.state.dropPlayer.id,
			isCommissionerVulture: this.state.isCommissionerVulture
		};
		createVulture(vultureRequest, function(response) {
			var existingVultures = self.state.existingVultures;
			existingVultures.push(response.data.data);
			self.setState( { existingVultures: existingVultures });
			alert("Vulture request granted");
		}, function(error) {
			alert(error.message);
		});
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-6">
						Select a player below to vulture
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-12">
								<VulturePanel onPlayerClick={this.onPlayerClick}/>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						{
							this.state.player ?
							<CreateVulture
								player={this.state.player}
								players={this.state.players}
								changeDropPlayer={this.changeDropPlayer}
								setCommissionerVulture={this.setCommissionerVulture}
								submitVulture={this.submitVulture}
							/>
							:
							null
						}
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<ExistingVultures data={this.state.existingVultures}/>
					</div>
				</div>
			</LoggedInComponent>
		)
	}
});

export default withRouter(Vulture);