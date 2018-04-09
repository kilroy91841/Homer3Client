import React from 'react';
import { Link } from 'react-router';
import { getFullTeam } from 'api/team';
import Store from 'store';

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
                    		Salary: {this.props.data.salary} / 325 ({this.props.data.disabledListSalary} on the DL)
	                    	<a style={{'paddingLeft':'10px'}} target="_blank" href={"http://games.espn.go.com/flb/clubhouse?leagueId=216011&teamId=" + this.props.data.id + "&seasonId=2017"}>ESPN</a>
                    	</div>
					</div>
					<div className="row">
						<div className="col-md-6">
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
							{
								this.props.data.disabledList && this.props.data.disabledList.length > 0 ?
								<PlayerList title="Disabled List" data={
										[
											this.props.data.disabledList || []
										]
									} 
								/>
								:
								null
							}
							{
								this.props.data.bench && this.props.data.bench.length > 0 ?
								<PlayerList title="Bench" data={[this.props.data.bench || [] ]} />
								:
								null
							}
							<MinorsList title="Minor Leaguers" data={this.props.data.minorLeaguers || []} />
						</div>
						<div className="col-md-6">
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
		var self = this;
		var teamId = id ? id : this.props.params.id;
        getFullTeam(teamId, function(response) {
            self.setState({
                team: response.data
            })
        }, function(err) {
            console.error(err);
        });
	},

	componentWillMount: function() {
		this.getTeam();	
	},

	componentDidUpdate: function() {
		Store.dispatch({
            type: 'PROGRESS_BAR',
            progressBar: {
            	percent : 100
            }
        });
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
