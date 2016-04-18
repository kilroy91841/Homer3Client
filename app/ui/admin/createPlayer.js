import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { createPlayer } from 'api/player';
import PositionSelect from 'ui/position-select';

const stateToProps = function(state) {
    return {
        mlbTeams: state.reducer.metadata.mlbTeams
    }
};

const CreatePlayer = React.createClass({
	getInitialState: function() {
		return {};
	},
	changeFirstName: function(e) {
		this.setState({ firstName: e.target.value });
	},
	changeLastName: function(e) {
		this.setState({ lastName: e.target.value });
	},
	changeMlbTeam: function(mlbTeam) {
		this.setState({ mlbTeam: mlbTeam, mlbTeamId: mlbTeam.id });
	},
	changePosition: function(position) {
		this.setState({ position: position });
	},
	createPlayer: function() {
		createPlayer(this.state).then(function(response) {
			alert(response.data.message);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							CREATE PLAYER
						</div>
					</div>
					<div className="row">
						<div className="col-md-2">
							<input type="text" placeholder="First Name" onChange={this.changeFirstName} />
						</div>
						<div className="col-md-2">
						<input type="text" placeholder="Last Name" onChange={this.changeLastName} />
						</div>
						<div className="col-md-4">
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
						<div className="col-md-3">
							<PositionSelect 
								value={this.state.position} 
								onChange={this.changePosition} 
							/>
						</div>
						<div className="col-md-1">
							<input type="submit" value="GO!" onClick={this.createPlayer} />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(CreatePlayer);