import React from 'react';

import PlayerRow from 'ui/player-row';
import TeamLink from 'ui/team-link';

const DraftHistory = React.createClass({
	render: function() {
		const self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>PICKS</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-1">
							<i>#</i>
						</div>
						<div className="col-md-6">
							<i>Player</i>
						</div>
						<div className="col-md-3">
							<i>Team</i>
						</div>
						<div className="col-md-1">
							<i>Amount</i>
						</div>
					</div>
					{
						this.props.picks.sort(function(a, b) {
							if (a.id > b.id) {
								return -1;
							} else if (a.id < b.id) {
								return 1;
							} else {
								return 0;
							}
						}).map(function(pick, ix) {
							return (
								<div className="row" key={pick.id}>
									<div className="col-md-2">
										<b>{pick.id + "."}</b>
									</div>
									<div className="col-md-5">
										<PlayerRow player={pick.playerView}>
											{pick.playerView.name}
										</PlayerRow>
									</div>
									<div className="col-md-3">
										<TeamLink team={self.props.teamMap[pick.teamId]} />
									</div>
									<div className="col-md-1">
										{pick.amount}
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
});

export default DraftHistory;