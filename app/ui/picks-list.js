import React from 'react';

import List from 'ui/component/list';

import TeamLink from 'ui/team-link';

const PickRow = React.createClass({
	getSwapTeam: function() {
		if (this.props.data.swapTeam) {
			return (
				<div className="row">
					<div className="col-md-offset-1 col-md-5">
						Swap Team
					</div>
					<div className="col-md-6">
						<TeamLink team={this.props.data.swapTeam} />
					</div>
				</div>
			)
		} else {
			return ( <div /> )
		}
	},
	getOriginalTeam: function() {
		if (this.props.data.originalTeam.id != this.props.data.owningTeam.id) {
			return (
				<div className="row">
					<div className="col-md-offset-1 col-md-5">
						Original Team
					</div>
					<div className="col-md-6">
						<TeamLink team={this.props.data.originalTeam} />
					</div>
				</div>
			)
		}
	},

	render: function() {
		return (
			<div>
				<div className="row">
					<div className="col-md-2">
						{this.props.data.round}
					</div>
					<div className="col-md-8">
						{this.props.data.season}
					</div>
				</div>
				{this.getSwapTeam()}
				{this.getOriginalTeam()}
			</div>
		)
	}
});

export default React.createClass({
	render: function() {
		return (
			<List title="Draft Picks">
				<div className="row">
					<div className="col-md-2">
						<i>Round</i>
					</div>
					<div className="col-md-8">
						<i>Season</i>
					</div>
				</div>
				{
					this.props.data.map(function(pick) {
						return (
							<PickRow key={pick.id} data={pick} />
						)
					})
				}
			</List>
		)
	}
});