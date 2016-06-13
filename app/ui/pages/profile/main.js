import React from 'react';
import { withRouter } from 'react-router';
import store from 'store';

import LoggedInComponent from 'ui/logged-in-component';
import { getUser } from 'auth';
import { getTeams } from 'api/team';
import { updateTeam } from 'api/api';

const Profile = React.createClass({
	getInitialState: function() {
		return {
			user: getUser(),
			team: {},
			newTeamName: undefined,
			editingTeam: false
		}
	},
	componentDidMount: function() {
		var self = this;
		getTeams(function(response) {
            store.dispatch({
                type: 'GET_TEAMS',
                teams: response.data
            });
            response.data.forEach(function(team) {
            	if (team.id == self.state.user.teamId) {
            		self.setState({ team : team, newTeamName: team.name });
            	}
            });
        }, function(err) {
            console.error(err);
        });
	},
	componentDidUpdate: function() {
		if (this.refs.newTeamName) {
			React.findDomNode(this.refs.newTeamName).focus();
		}
	},
	changeTeamName: function() {
		var team = $.extend({}, this.state.team);
		team.name = this.state.newTeamName;
		updateTeam(team, function(response) {
			alert(response.data.message);
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-12">
						<h2>My Profile</h2>
					</div>
				</div>
				<div style={{fontSize:"20px"}}>
					<div className="row">
						<div className="col-md-4">
							<h4><i>Email</i></h4>
						</div>
						<div className="col-md-6">
							{this.state.user.email}
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<h4><i>Team</i><span className="small"> Click name to change</span></h4>
						</div>
						<div className="col-md-5">
							{
								this.state.editingTeam ?
								<input ref={
										function(input) {
											if (input != null) {
												input.focus();
											}
										}
									}
							        type="text" 
							        min="3"
							        onBlur={() => this.setState({ editingTeam : false })} 
							        value={this.state.newTeamName}
							        onChange={(e) => e.target.value.length >3 ? this.setState({ newTeamName: e.target.value }) : null }/>:
								<span onClick={() => {this.setState({ editingTeam : true })}}>{this.state.newTeamName}</span>
							}
						</div>
						<div className="col-md-1">
						{
							this.state.newTeamName != this.state.team.name ?
							<input type="button" onClick={this.changeTeamName} value="CHANGE TEAM NAME" /> :
							null
						}
						</div>
					</div>
				</div>
			</LoggedInComponent>
		);
	}
});

export default withRouter(Profile);