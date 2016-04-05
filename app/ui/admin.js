import React from 'react';
import { connect } from 'react-redux';
import { switchTeam } from 'api/player';
import { switchPosition } from 'api/player';
import Select from 'react-select';
import { getFullTeam } from 'api/team';

import PlayerSearch from 'layouts/nav/player-search';

const stateToProps = function(state) {
    return {
    	player: state.reducer.player,
        teams: state.reducer.teams
    }
};

const positionOptions = [
    { label: 'UTILITY', value: 12 },
    { label: 'MIDDLEINFIELD', value: 10 },
    { label: 'CORNERINFIELD', value: 11 },
    { label: 'PITCHER', value: 1 },
    { label: 'CATCHER', value: 2 },
    { label: 'FIRSTBASE', value: 3 },
    { label: 'SECONDBASE', value: 4 },
    { label: 'THIRDBASE', value: 5 },
    { label: 'SHORTSTOP', value: 6 },
    { label: 'OUTFIELD', value: 7 },
    { label: 'DESIGNATEDHITTER', value: 8 },
    { label: 'RELIEFPITCHER', value: 9 },
    { label: 'DISABLIEDLIST', value: 13 },
    { label: 'MINORLEAGUES', value: 14 },
    { label: 'NO POSITION', value: 0 }
];

const Admin = React.createClass({
	getInitialState: function() {
		return {
			newTeam: {},
			newPosition: {},
			draftDollar: {},
			draftDollarOptions: []
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
	setDraftDollarOptions: function(teamId) {
		var _this = this;
		getFullTeam(teamId).then(function(response) {
			debugger;
			var opts = [];
			response.data.draftDollars.map(function(draftDollar) {
				opts.push({ value : draftDollar.id, label : draftDollar.season + " " +
				 draftDollar.draftDollarType.name });
			});
			_this.setState({ draftDollarOptions : opts });
		});
		
	},
	doTeamChange: function() {
		switchTeam(this.props.player, this.state.newTeam.id).then(function(response) {
			alert(response.statusText);
		});
	},
	doPositionChange: function() {
		switchPosition(this.props.player, this.state.newPosition.value).then(function(response) {
			alert(response.statusText);
		});
	},
	doDraftDollarChange: function() {
		deductDraftDollars(this.state.draftDollar)
	},
	onTeamChange: function(val) {
		this.setState({newTeam: val});
	},
	onDraftDollarTeamChange: function(val) {
		var dd = this.state.draftDollar;
		dd.team = val;
		this.setDraftDollarOptions(dd.team.id);
		this.setState({draftDollar: dd});
	},
	onDraftDollarAmountChange: function(e) {
		var dd = this.state.draftDollar;
		dd.amount = e.target.value;
		this.setState({draftDollar: dd});
	},
	onPositionChange: function(val) {
		this.setState({newPosition: val})
	},
	render: function() {
		var currentTeam = this.props.player.currentSeason && this.props.player.currentSeason.team ? 
			this.props.player.currentSeason.team.name : " free agency ";
		var currentPosition = this.props.player.currentSeason && this.props.player.currentSeason.fantasyPosition
			? this.props.player.currentSeason.fantasyPosition.name : " no position ";
		return ( 
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-1">
									Move 
								</div>
								<div className="col-md-2">
									{this.props.player.name}
								</div>
								<div className="col-md-3">
									{"from " + currentTeam + " "}
								</div>
								<div className="col-md-3">
									{"to " + this.state.newTeam.name }
								</div>
								<div className="col-md-2">
									<Select 
									name="team-select"
									options={this.teamOptions()}
									labelKey={"name"}
									valueKey={"id"}
									onChange={this.onTeamChange}
									scrollMenuIntoView={false}
									/>
								</div>
								<div className="col-md-1">
									<button onClick={this.doTeamChange}>
										Go!
									</button>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-1">
								Move 
							</div>
							<div className="col-md-2">
								{this.props.player.name}
							</div>
							<div className="col-md-3">
								{"from " + currentPosition + " "}
							</div>
							<div className="col-md-3">
								{"to " + this.state.newPosition.label }
							</div>
							<div className="col-md-2">
								<Select 
								name="position-select"
								options={positionOptions}
								onChange={this.onPositionChange}
								scrollMenuIntoView={false}
								/>
							</div>
							<div className="col-md-1">
								<button onClick={this.doPositionChange}>
									Go!
								</button>
							</div>
						</div>
						<div className="row">
							<div className="col-md-1">
								Deduct
							</div>
							<div className="col-md-2">
								<input onChange={this.onDraftDollarAmountChange} type="number" />
							</div>
							<div className="col-md-1">
								from
							</div>
							<div className="col-md-3">
								<Select 
									options={this.props.teams}
									labelKey={"name"}
									valueKey={"id"}
									onChange={this.onDraftDollarTeamChange}
									scrollMenuIntoView={false}
								/>
							</div>
							<div className="col-md-2">
								<Select 
									options={this.state.draftDollarOptions}
									scrollMenuIntoView={false}
									/>
							</div>
							<div className="col-md-2">
								{this.state.draftDollar.team ? this.state.draftDollar.team.name : ''}
							</div>
							<div className="col-md-1">
								<button onClick={this.doDraftDollarChange}>
									Go!
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(Admin);