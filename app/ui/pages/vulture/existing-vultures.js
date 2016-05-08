import React from 'react';
import Moment from 'moment-timezone';

import List from 'ui/component/list';

const VultureRows = React.createClass({
	render: function() {
		return (
			<div>
			{
				this.props.data.map(function(vulture) {
					return (
						<div key={vulture.player.id} className="row hoverDiv">
							<div className="col-md-3">
								{vulture.player.name}
							</div>
							<div className="col-md-3">
								{vulture.vultureTeam.name}
							</div>
							<div className="col-md-3">
								{vulture.dropPlayer.name}
							</div>
							<div className="col-md-3">
								{Moment(vulture.expirationDateUTC.millis).calendar()}
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
								<i>Expiration Time</i>
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