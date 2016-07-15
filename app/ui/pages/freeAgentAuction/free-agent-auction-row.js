import React from 'react';

import Moment from 'moment-timezone';
import Row from 'ui/component/row';
import TeamLink from 'ui/team-link';

import { teamId } from 'auth';

const FreeAgentAuctionRow = React.createClass({
	render: function() {
		const myTeamId = teamId();
		var teamBid = undefined;
		if (myTeamId && this.props.auction.bids) {
			this.props.auction.bids.forEach(function(bid) {
				if (bid.teamId == myTeamId) {
					teamBid = bid;
				}
			});
		}
		return (
			<Row onClick={() => this.props.onClick(this.props.auction)}>
				<div className="col-md-4">
					{this.props.auction.player.name}
				</div>
				{
					this.props.auction.winningTeam ?
					<div>
						<div className="col-md-4">
							<TeamLink team={this.props.auction.winningTeam} />
						</div>
						<div className="col-md-2">
							{this.props.auction.winningAmount}
						</div>
					</div>
					:
					<div className="col-md-6">
						{
							this.props.auction.deadlineUTC ?
							Moment(this.props.auction.deadlineUTC.millis).calendar() :
							null
						}
					</div>
				}
				<div className="col-md-2">
					{teamBid ? teamBid.amount : "-"}
				</div>
			</Row>
		)
	}
});

export default FreeAgentAuctionRow;