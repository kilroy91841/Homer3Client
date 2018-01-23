import React from 'react';
import { connect } from 'react-redux';

import TeamLink from 'ui/team-link';
import Row from 'ui/component/row';

import { getNextSeasonsDraftDollars } from 'api/draftDollar';

const stateToProps = function(state) {
    return {
        teamMap: state.reducer.teamMap
    }
};

const DraftDollarPanel = React.createClass({
	getInitialState: function() {
		return {
			draftDollars: []
		}
	},
	componentWillMount: function() {
		var self = this;
		getNextSeasonsDraftDollars(function(response) {
			self.setState({ draftDollars: response.data.data });
		}, function(error) {
			console.log("Error fetching draft dollars:" + error);
		});
	},
	getTeamRow: function(draftDollar) {
		return (
			<Row key={draftDollar.id} clickable="false">
				<div className="col-md-10">
					<TeamLink team={this.props.teamMap[draftDollar.teamId]} />
				</div>
				<div className="col-md-2 text-right">
					{draftDollar.amount}
				</div>
			</Row>
		)
	},
	render: function() {
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>2018 MLB Draft Dollars</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-8">
									<i>Team</i>
								</div>
								<div className="col-md-4 text-right">
									<i>Draft Dollars</i>
								</div>
							</div>
							{
								this.state.draftDollars.filter(function(draftDollar) {
									return draftDollar.draftDollarType.id == 1;
								}).map(function(draftDollar) {
									return self.getTeamRow(draftDollar);
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default connect(stateToProps)(DraftDollarPanel);