import React from 'react';
import { Link } from 'react-router';
import { getFullTeam } from 'api/team';

//UI
import PlayerList from 'ui/player-list';
import MinorsList from 'ui/minors-list';
import FinancesList from 'ui/finances-list';
import PicksList from 'ui/picks-list';

const Team = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h1>{this.props.data.name}
								<small> {this.props.data.owner1} {this.props.data.owner2}</small>
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
                    		Salary: {this.props.data.salary} / 400 
	                    	<a style={{'padding-left':'10px'}} target="_blank" href={"http://games.espn.go.com/flb/clubhouse?leagueId=216011&teamId=" + this.props.data.id + "&seasonId=2016"}>ESPN</a>
                    	</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<PlayerList title="Batters" data={
									[
										this.props.data.catcher || [],
										this.props.data.firstBase || [],
										this.props.data.secondBase || [],
										this.props.data.thirdBase || [],
										this.props.data.shortstop || [],
										this.props.data.middleInfield || [],
										this.props.data.cornerInfield || [],
										this.props.data.outfield || [],
										this.props.data.utility || []
									]
								} 
							/>
							<PlayerList title="Pitchers" data={
									[
										this.props.data.pitcher || []
									]
								} 
							/>
							<PlayerList title="Disabled List" data={
									[
										this.props.data.disabledList || []
									]
								} 
							/>
						</div>
						<div className="col-md-4">
							<MinorsList title="Minor Leaguers" data={this.props.data.minorLeaguers || []} />
						</div>
						<div className="col-md-4">
							<FinancesList title="Finances" data={this.props.data.draftDollars || []} />
							<PicksList title="Draft Picks" data={this.props.data.minorLeaguePicks || []} />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default React.createClass({
	getInitialState: function() {
		return { 
			team : {}
		}
	},

	getTeam: function(id) {
		var _this = this;
		var teamId = id ? id : this.props.params.id;
        getFullTeam(teamId).then(function(response) {
            _this.setState({
                team: response.data
            })
        }).catch(function(err) {
            console.error(err);
        });
	},

	componentWillMount: function() {
		this.getTeam();	
	},

	componentWillReceiveProps: function(nextProps) {
		this.getTeam(nextProps.params.id);
	},

	render: function() {
		return (
			<Team data={this.state.team}/>
		)
	}
});