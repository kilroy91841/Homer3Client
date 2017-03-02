import React from 'react';
import { connect } from 'react-redux';
import Store from 'store';

import PlayerSearch from 'ui/player-search';
import Select from 'react-select';

import { draftPlayer, setCurrentPlayer } from 'api/majorLeagueDraft';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams
    }
};

const MajorLeagueDraftAdmin = React.createClass({
	getInitialState: function() {
		return {
			player: {},
			team: {},
    		salary: undefined
		};
	},
	teamOptions: function() {
		var opts = [];
		this.props.teams.map(function(prop) {
			opts.push(prop);
		});
		opts.push( { name : 'Free Agency', id : 0 });
		return opts;
	},
	doTeamChange: function() {
		switchTeam(this.state.player, this.state.team.id, function(response) {
			alert(response.data.message);
			Store.dispatch({
	            type: 'PUT_PLAYER_IN_MAP',
	            player: response.data.data
	        });
		}, function(error) {
			alert(error.data.message);
		});
	},
	doCurrentPlayer: function() {
		setCurrentPlayer(this.state.player.id, function(response) {
			alert(response.data.message);
		}, function(error) {
			alert(error.data.message);
		});
	},
	onSalaryChange: function(e) {
		this.setState( { salary : e.target.value })
	},
	onTeamChange: function(val) {
		this.setState({team: val});
	},
	onPlayerChange: function(player) {
		if (player == null) {
			player = {};
		}
		this.setState({ player: player });
	},
	doAction: function() {
		draftPlayer(this.state.player.id, this.state.team.id, this.state.salary, function(response) {
			alert(response.data.message);
		}, function(error) {
			alert(error.data.message);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Admin</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<PlayerSearch
								players={this.props.players}
								value={this.state.player}
								onChange={this.onPlayerChange}
							/>
						</div>
						<div className="col-md-3">
							<Select 
								name="team-select"
								options={this.teamOptions()}
								labelKey={"name"}
								valueKey={"id"}
								value={this.state.team}
								onChange={this.onTeamChange}
								scrollMenuIntoView={false}
							/>
						</div>
						<div className="col-md-3">
							<input type="number" onChange={this.onSalaryChange} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<input type="submit" value="DRAFT PLAYER" onClick={this.doAction} />
						</div>
						<div className="col-md-12">
							<input type="submit" value="SET CURRENT PLAYER" onClick={this.doCurrentPlayer} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default connect(stateToProps)(MajorLeagueDraftAdmin);