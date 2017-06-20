import React from 'react';

import PlayerRow from 'ui/player-row';
import Row from 'ui/component/row';
import TeamLink from 'ui/team-link';

import { teamId } from 'auth';

const MinorLeagueDraftPickList = React.createClass({
	isCurrentPick: function(pick) {
		return this.props.currentPick && this.props.currentPick.id == pick.id;
	},
	render: function() {
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-1">
							<i>Round</i>
						</div>
						<div className="col-md-1">
							<i>Overall</i>
						</div>
						<div className="col-md-4">
							<i>Team</i>
						</div>
						<div className="col-md-6">
							<i>Player</i>
						</div>
					</div>
					{
						this.props.picks.map(function(pick) {
							var isCurPick = self.isCurrentPick(pick);
							var isTeamPick = teamId() == pick.owningTeam.id;
							var style;
							if (isCurPick)
							{
								style = { background: "yellow" };
							}
							else if (isTeamPick)
							{
								style = { background: "lightblue" };
							}
							else
							{
								style = {};
							}
							return (
								<Row key={pick.id} style={style} onClick={() => self.props.onClick(pick.id)}>
									<div className="col-md-1">
										{pick.round}
									</div>
									<div className="col-md-1">
										{pick.overallPick}
									</div>
									<div className="col-md-6">
										<div className="row">
											<div className="col-md-12">
												<TeamLink team={pick.owningTeam} />
											</div>
										</div>
										{
											pick.originalTeam.id != pick.owningTeam.id ?
											<div className="row">
												<div className="col-md-offset-1 col-md-11">
													{"From "}
													<TeamLink team={pick.originalTeam} />
												</div>
											</div>
											:
											null
										}
									</div>
									<div className="col-md-4">
										{
											pick.playerView ? 
											<PlayerRow key={pick.playerView.id} player={pick.playerView}>
												<div className="col-md-12">
													{pick.playerView.name}
												</div>
											</PlayerRow> 
											:
											pick.isSkipped ? "Skipped" : "-"
										}
									</div>
								</Row>
							)
						})
					}
				</div>
			</div>
		);
	}
});

export default MinorLeagueDraftPickList;