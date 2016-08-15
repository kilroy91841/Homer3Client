import React from 'react';
import { connect } from 'react-redux';

import { getStandings, getStandingsBetween } from 'api/standings';
import Table from 'ui/pages/standings/table';
import Moment from 'moment-timezone';

const firstDate = "2016-04-03";
const lastDate = "2016-10-02";
const septemberStart = "2016-09-01";

const stateToProps = function(state) {
    return {
        teamMap: state.reducer.teamMap
    }
};

const StandingsPage = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			timeframe: 'Year-to-date'
		};
	},
	setStandings: function(response) {
		var me = this;
		var standings = response.data.data;
		standings.forEach(function(standing) {
			standing.team = me.props.teamMap[standing.teamId];
		});
		this.setState({data: standings});
	},
	componentDidMount: function() {
		getStandings(undefined, this.setStandings, function(error) {
			alert(error);
		});
	},
	changeDates: function() {
		var start = this.refs.startDate.value;
		var end = this.refs.endDate.value;
		if (start == "") {
			start = firstDate;
		}
		if (end == "") {
			end = lastDate;
		}
		this.changeDatesImpl(start, end);
	},
	changeDatesImpl: function(start, end) {
		this.setState({ timeframe: start + " to " + end });
		getStandingsBetween(start, end, this.setStandings, function(error) {
			alert(error);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Standings</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<span className="h4">Timeframe: </span><span>{this.state.timeframe}</span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<label htmlFor="startDate">Start Date: </label>
							<input type="date" ref="startDate" min={firstDate} max={lastDate} />
						</div>
						<div className="col-md-3">
							<label htmlFor="endDate">End Date: </label>
							<input type="date" ref="endDate" min={firstDate} max={lastDate} />
						</div>
						<div className="col-md-2">
							<input type="button" value="GO" onClick={this.changeDates} />
						</div>
						{
							Moment().isBefore(septemberStart) 
							?
							null
							:
							<div className="col-md-4">
								<input type="button" value="September Standings" onClick={() => this.changeDatesImpl(septemberStart, lastDate)} />
							</div>
						}
					</div>
					<div className="row">
						<div className="col-md-12">
							<Table 
								columns={[
									{label: 'R', points: 'runPoints', total:'runTotal'}, 
									{label: 'HR', points: 'hrPoints', total:'hrTotal'}, 
									{label: 'RBI', points: 'rbiPoints', total: 'rbiTotal'},
									{label: 'SB', points: 'sbPoints', total: 'sbTotal'},
									{label: 'OBP', points: 'obpPoints', total:'obpTotal', format: '.0000'}, 
									{label: 'K', points: 'kPoints', total: 'kTotal'},
									{label: 'W', points: 'winPoints', total:'winTotal'}, 
									{label: 'SV', points: 'savePoints', total: 'saveTotal'},
									{label: 'ERA', points: 'eraPoints', total:'eraTotal', format: '0.000'}, 
									{label: 'WHIP', points: 'whipPoints', total: 'whipTotal', format: '0.000'},
									{label: 'Total', points: 'totalPoints', defaultSort: true},
								]} 
								data={this.state.data} 
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

export default connect(stateToProps)(StandingsPage);