import React from 'react';
import { connect } from 'react-redux';

import { switchTeam } from 'api/player';

import PlayerSearch from 'ui/player-search';
import Select from 'react-select';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams
    }
};

const PlayerSwitchTeam = React.createClass({
	getInitialState: function() {
		return {
			player: {},
			team: {},
		}
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
		}, function(error) {
			alert(error.data.message);
		});
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
	render: function() {
		var currentTeam = this.state.player.currentSeason && this.state.player.currentSeason.team ? 
			this.state.player.currentSeason.team.name : " ";
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							SWITCH TEAM
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<PlayerSearch
								value={this.state.player}
								onChange={this.onPlayerChange}
							/>
						</div>
						<div className="col-md-3">
							{"Old Team: " + currentTeam + " "}
						</div>
						<div className="col-md-2">
							New Team: 
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
						<div className="col-md-1">
							<input type="submit" value="GO!" onClick={this.doTeamChange}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(PlayerSwitchTeam);