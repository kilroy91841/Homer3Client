import React from 'react';
import Moment from 'moment-timezone';

import { getStandings } from 'api/standings';
import { teamId } from 'auth';

const StandingsWidget = React.createClass({
	getInitialState: function() {
		return {
			standingsDiffs: [],
			lastUpdated: null
		};
	},
	componentDidMount: function() {
		var hourOffset = 32;
		var me = this;
		getStandings(Moment().tz('America/New_York').subtract(hourOffset + 24, 'hour').format("YYYY-MM-DD"), function(success) {
			var oldStandings = success.data.data;
			getStandings(Moment().tz('America/New_York').subtract(hourOffset, 'hour').format("YYYY-MM-DD"), function(success) {
				var newStandings = success.data.data;
				var standingsByTeam = {};
				newStandings.map(function(ns1) {
					oldStandings.map(function(ns2) {
						if (ns1.teamId == ns2.teamId) {
							standingsByTeam[ns1.teamId] = { oldStandings: ns2, newStandings: ns1 };
						}
					});
				});
				if (teamId()) {
					var standingsPair = standingsByTeam[teamId()]
					var standingsDiffs = [];
					standingsDiffs.push({ category: 'R', diff: standingsPair.newStandings.runPoints - standingsPair.oldStandings.runPoints, oldPlace: standingsPair.oldStandings.runPoints, newPlace: standingsPair.newStandings.runPoints });
					standingsDiffs.push({ category: 'HR', diff: standingsPair.newStandings.hrPoints - standingsPair.oldStandings.hrPoints, oldPlace: standingsPair.oldStandings.hrPoints, newPlace: standingsPair.newStandings.hrPoints });
					standingsDiffs.push({ category: 'RBI', diff: standingsPair.newStandings.rbiPoints - standingsPair.oldStandings.rbiPoints, oldPlace: standingsPair.oldStandings.rbiPoints, newPlace: standingsPair.newStandings.rbiPoints });
					standingsDiffs.push({ category: 'SB', diff: standingsPair.newStandings.sbPoints - standingsPair.oldStandings.sbPoints, oldPlace: standingsPair.oldStandings.sbPoints, newPlace: standingsPair.newStandings.sbPoints });
					standingsDiffs.push({ category: 'OBP', diff: standingsPair.newStandings.obpPoints - standingsPair.oldStandings.obpPoints, oldPlace: standingsPair.oldStandings.obpPoints, newPlace: standingsPair.newStandings.obpPoints });
					standingsDiffs.push({ category: 'K', diff: standingsPair.newStandings.kPoints - standingsPair.oldStandings.kPoints, oldPlace: standingsPair.oldStandings.kPoints, newPlace: standingsPair.newStandings.kPoints });
					standingsDiffs.push({ category: 'W', diff: standingsPair.newStandings.winPoints - standingsPair.oldStandings.winPoints, oldPlace: standingsPair.oldStandings.winPoints, newPlace: standingsPair.newStandings.winPoints });
					standingsDiffs.push({ category: 'SV', diff: standingsPair.newStandings.savePoints - standingsPair.oldStandings.savePoints, oldPlace: standingsPair.oldStandings.savePoints, newPlace: standingsPair.newStandings.savePoints });
					standingsDiffs.push({ category: 'ERA', diff: standingsPair.newStandings.eraPoints - standingsPair.oldStandings.eraPoints, oldPlace: standingsPair.oldStandings.eraPoints, newPlace: standingsPair.newStandings.eraPoints });
					standingsDiffs.push({ category: 'WHIP', diff: standingsPair.newStandings.whipPoints - standingsPair.oldStandings.whipPoints, oldPlace: standingsPair.oldStandings.whipPoints, newPlace: standingsPair.newStandings.whipPoints });
					var lastUpdated = Moment(
						standingsPair.newStandings.date.yearOfEra + "-" + 
						standingsPair.newStandings.date.monthOfYear + "-" + 
						standingsPair.newStandings.date.dayOfMonth).format("dddd, MMMM Do");
					me.setState({ standingsDiffs: standingsDiffs, lastUpdated: lastUpdated });
				}
			}, function(error) {
				alert(error);
			});
		}, function(error) {
			alert(error);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row" style={{paddingBottom:"10px"}}>
						<div className="col-md-12">
							<h2>Standings Changes</h2>
							<span>After the night of {this.state.lastUpdated}</span>
						</div>
					</div>
				{
					this.state.standingsDiffs.map(function(standingDiff) {
						return (
							<div key={standingDiff.category} className="row text-center">
								<div className="col-md-5 text-danger" >
									{
										standingDiff.diff < 0 ?
										<div>
											<span className="h4">{standingDiff.diff}</span>
											<span> ({standingDiff.oldPlace} => {standingDiff.newPlace} points)</span>
										</div>
										: null
									}
								</div>
								<div className="col-md-2">
									<span className="h4">{standingDiff.category}</span>
								</div>
								<div className="col-md-5 text-success" >
									{
										standingDiff.diff > 0 ?
										<div>
											<span className="h4">{standingDiff.diff}</span>
											<span> ({standingDiff.oldPlace} => {standingDiff.newPlace} points)</span>
										</div>
										: null
									}
								</div>
							</div>
						);
					})
				}
				</div>
			</div>
		);
	}
});

export default StandingsWidget;