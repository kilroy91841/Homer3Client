import React from 'react';
import Moment from 'moment-timezone';

import List from 'ui/component/list';
import TeamLink from 'ui/team-link';
import PlayerRow from 'ui/player-row';

const VultureRows = React.createClass({
	render: function() {
		var me = this;
		return (
			<div>
			{
				this.props.data.map(function(vulture) {
					return (
						<div key={vulture.player.id} className="row hoverDiv">
							<div className="col-md-3 clickable">
								<PlayerRow player={vulture.player}>
									<div className="col-md-12">
										{vulture.player.name}
									</div>
								</PlayerRow> 
							</div>
							<div className="col-md-3">
								<TeamLink team={vulture.vultureTeam} />
							</div>
							<div className="col-md-3 clickable">
								<PlayerRow player={vulture.dropPlayer}>
									<div className="col-md-12">
										{vulture.dropPlayer.name}
									</div>
								</PlayerRow> 
							</div>
							<div className="col-md-3">
								{Moment(vulture.deadlineUTC.millis).calendar()}
							</div>
						</div>
					)
				})
			}
			</div>
		)
	}
});

const ExistingVultures = React.createClass({
	render: function() {
		var anyVultures = this.props.data && this.props.data.length > 0;
		return (
			<List title="In-Progress Vultures">
				{
					anyVultures ?	
					<div>	
						<div className="row">
							<div className="col-md-3">
								<i>Player</i>
							</div>
							<div className="col-md-3">
								<i>Vulturing Team</i>
							</div>
							<div className="col-md-3">
								<i>Dropping Player</i>
							</div>
							<div className="col-md-3">
								<i>Deadline</i>
							</div>
						</div>
						<VultureRows data={this.props.data} />
					</div>
					:
					<div className="row">
						<div className="col-md-12">
							There are no in-progress vultures right now.
						</div>
					</div>
				}		
			</List>
		)
	}
});

export default ExistingVultures;