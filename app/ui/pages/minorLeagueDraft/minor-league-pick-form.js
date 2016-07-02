import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import PositionSelect from 'ui/position-select';
import KeyValueInput from 'ui/component/key-value-input';

const stateToProps = function(state) {
    return {
        mlbTeams: state.reducer.metadata.mlbTeams
    }
};

const MinorLeaguePickForm = React.createClass({
	getInitialState: function() {
		return {
			firstName: undefined,
			lastName: undefined,
			mlbTeam: undefined,
			position: undefined,
			mlbPlayerId: undefined
		}
	},
	onChange: function(key, val) {
		var newState = {};
		newState[key] = val;
		this.setState(newState);
	},
	changeMlbTeam: function(mlbTeam) {
		this.setState({ mlbTeam: mlbTeam });
	},
	changePosition: function(position) {
		this.setState({ position : position });
	},
	onPickSubmit: function() {
		var pick = $.extend({}, this.props.pick);
		var playerView = {};
		if (this.state.mlbPlayerId) {
			playerView.mlbPlayerId = this.state.mlbPlayerId;
			if (playerView.mlbPlayerId <= 0) {
				alert("Please select a valid MLB player id. For example, " + 
					"http://www.milb.com/player/index.jsp?player_id=608337");
				return;
			}
		} else {
			playerView.firstName = this.state.firstName;
			playerView.lastName = this.state.lastName;
			playerView.mlbTeamId = this.state.mlbTeam ? this.state.mlbTeam.id : undefined;
			playerView.position = this.state.position;
			playerView.name = playerView.firstName + " " + playerView.lastName;
		}
		if (playerView.mlbPlayerId == undefined && (playerView.firstName == undefined || playerView.lastName == undefined ||
			playerView.position == undefined || playerView.mlbTeamId == undefined)) {
			alert("Please fill in all player information");
			return;
		}
		pick.playerView = playerView;
		pick.deadlineUtc = undefined;
		this.props.onPickSubmit(pick);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<KeyValueInput title="MLB Player Id (Preferred!)" type="number" keyName="mlbPlayerId" onChange={this.onChange} />
					<div className="row">
						<div className="col-md-12" style={{marginBottom:"20px"}}>
							<h3>or</h3>
						</div>
					</div>
					<KeyValueInput title="First Name" type="text" keyName="firstName" onChange={this.onChange} />
					<KeyValueInput title="Last Name" type="text" keyName="lastName" onChange={this.onChange} />
					<div className="row">
						<div className="col-md-6">
							MLB Team (or "Free Agency")
						</div>
						<div className="col-md-6">
							<Select
								name="mlbteam-select"
								options={this.props.mlbTeams}
								labelKey={"name"}
								valueKey={"id"}
								value={this.state.mlbTeam}
								onChange={this.changeMlbTeam}
								scrollMenuIntoView={false}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							MLB Position
						</div>
						<div className="col-md-6">
							<PositionSelect 
								value={this.state.position} 
								onChange={this.changePosition} 
							/>
						</div>
					</div>
					<div className="row" style={{marginTop:"20px", marginBottom:"10px"}}>
						<div className="col-md-12">
							<input type="submit" value="MAKE pick" onClick={this.onPickSubmit} />
							<input type="submit" style={{marginLeft:"30px"}} value="SKIP pick" onClick={this.props.onPickSkip} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default connect(stateToProps)(MinorLeaguePickForm);