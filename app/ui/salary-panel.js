import React from 'react';

import TeamLink from 'ui/team-link';
import Row from 'ui/component/row';

import { getSalary } from 'api/team';

export default React.createClass({
	getInitialState: function() {
		return {
			teams: []
		}
	},
	componentWillMount: function() {
		var self = this;
		getSalary(function(response) {
			self.setState({ teams: response.data.data });
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Salaries</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-10">
									<i>Team</i>
								</div>
								<div className="col-md-2 text-right">
									<i>Salary</i>
								</div>
							</div>
							{
								this.state.teams.map(function(team) {
									return (
										<Row key={team.id} clickable="false">
											<div className="col-md-10">
												<TeamLink team={team} />
											</div>
											<div className="col-md-2 text-right">
												{team.salary}
											</div>
										</Row>
									);
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});