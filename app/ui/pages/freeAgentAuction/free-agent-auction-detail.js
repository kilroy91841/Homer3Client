import React from 'react';
import Moment from 'moment-timezone';

import FreeAgentAuctionBidder from 'ui/pages/freeAgentAuction/free-agent-auction-bidder';
import TeamLink from 'ui/team-link';

const FreeAgentAuctionBids = React.createClass({
	render: function() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<i>Winning Team</i>
					</div>
					<div className="col-md-6">
						<TeamLink team={this.props.auction.winningTeam} />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<h4>Bids</h4>
					</div>
				</div>
				{
					this.props.auction.bids.map(function(bid) {
						return (
							<div key={bid.id} className="row">
								<div className="col-md-10">
									<TeamLink team={bid.team} />
								</div>
								<div className="col-md-2">
									{bid.amount}
								</div>			
							</div>
						)
					})
				}
			</div>
		)
	}
});

const FreeAgentAuctionDetail = React.createClass({
	render: function() {
		var isComplete = this.props.auction.auctionStatus.name == 'Complete';
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h3>{this.props.auction.player.name}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<i>Deadline</i>
						</div>
						<div className="col-md-6">
							{
								this.props.auction.deadlineUTC ?
								Moment(this.props.auction.deadlineUTC.millis).format("hh:mm a MM/DD") :
								null
							}
						</div>
					</div>
					{	
						isComplete ?
						<FreeAgentAuctionBids auction={this.props.auction} />
						:
						<FreeAgentAuctionBidder auction={this.props.auction} />
					}
				</div>
			</div>
		)
	}
});

export default FreeAgentAuctionDetail;