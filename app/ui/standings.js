import React from 'react';
import { connect } from 'react-redux';

import { get, put, post } from 'api/axios';
import { LineTooltip } from 'react-d3-tooltip';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams
    }
};

const StandingsPage = React.createClass({
	getChartSeries: function() {
		var colors = [
			"black",
			"gray",
			"red",
			"purple",
			"green",
			"yellow",
			"blue",
			"aqua",
			"orange",
			"deeppink",
			"lime",
			"silver"
		];
		var teams = [];
		this.props.teams.forEach(function(_team, ix) {
			var team = {
				field: "teamId" + _team.id,
				name: _team.name,
				color: colors[ix],
				style: {
		          "strokeWidth": 2,
		          "strokeOpacity": 1,
		          "fillOpacity": 1
		        }
			};
			teams.push(team);
		});
		return teams;
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		var me = this;
		get('/api/standings/all', function(response) {
			var data = [];
			var dateHash = {};
			response.data.data.map(function(standing) {
				var millis = standing.date.millis;
				var dateArray = dateHash[millis];
				if (dateArray) {
					dateArray.push(standing);
				} else {
					dateHash[millis] = [standing];
				}
			});
			Object.keys(dateHash).forEach(function(millis) {
				var singleDate = {scoringPeriodId: millis};
				var singleArray = dateHash[millis];
				singleArray.forEach(function(standing) {
					singleDate["teamId" + standing.teamId] = standing.totalPoints;
				});
				data.push(singleDate);
			});
			debugger;
			me.setState({data: data});
		}, function(err) {

		});
	},
	render: function() {
		return (
			<div>
				<LineTooltip 
					width= {900} 
					height= {500} 
					data= {this.state.data} 
					chartSeries= {this.getChartSeries()} 
					x= {
						function(d) {
				      		return d.scoringPeriodId;
				    	}
				    } 
				/>
			</div>
		);
	},
});

export default connect(stateToProps)(StandingsPage);