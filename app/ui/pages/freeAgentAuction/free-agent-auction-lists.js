import React from 'react';

import FreeAgentAuctionRow from 'ui/pages/freeAgentAuction/free-agent-auction-row';
import { isAdmin } from 'auth';

const FreeAgentAuctionLists = React.createClass({
	separateAuctions: function(allAuctions) {
		var completeAuctions = [];
		var inProgressAuctions = [];
		var requestedAuctions = [];
		if (allAuctions) {
			allAuctions.forEach(function(auction) {
				if (auction.auctionStatus.name == 'Complete') {
					completeAuctions.push(auction);
				} else if (auction.auctionStatus.name == 'In Progress') {
					inProgressAuctions.push(auction);
				} else if (auction.auctionStatus.name == 'Requested') {
					requestedAuctions.push(auction);
				}
			});
		}
		return {
			completeAuctions : completeAuctions,
			inProgressAuctions : inProgressAuctions,
			requestedAuctions : requestedAuctions
		};
	},
	getInitialState: function() {
		return this.separateAuctions(this.props.auctions);
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState(this.separateAuctions(nextProps.auctions));
	},
	render: function() {
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					{
						isAdmin() ? 
						<div className="row">
							<div className="col-md-12">
								<div className="row">
									<div className="col-md-12">
										<h2>Requested Auctions</h2>
									</div>
								</div>
								{
									this.state.requestedAuctions.map(function(auction) {
										return (
											<FreeAgentAuctionRow onClick={self.props.onClick} key={auction.id} auction={auction} />
										);
									})
								}
							</div>
						</div>
						:
						null
					}
					<div className="row">
						<div className="col-md-12">
							<h2>In Progress Auctions</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<i>Player</i>
						</div>
						<div className="col-md-6">
							<i>Deadline</i>
						</div>
						<div className="col-md-2">
							<i>Your Bid</i>
						</div>
					</div>
					{
						this.state.inProgressAuctions.map(function(auction) {
							return (
								<FreeAgentAuctionRow onClick={self.props.onClick} key={auction.id} auction={auction} />
							);
						})
					}
					<div className="row">
						<div className="col-md-12">
							<h2>Complete Auctions</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<i>Player</i>
						</div>
						<div className="col-md-4">
							<i>Winning Team</i>
						</div>
						<div className="col-md-2">
							<i>High Bid</i>
						</div>
						<div className="col-md-2">
							<i>Your Bid</i>
						</div>
					</div>
					{
						this.state.completeAuctions.map(function(auction) {
							return (
								<FreeAgentAuctionRow onClick={self.props.onClick} key={auction.id} auction={auction} />
							);
						})
					}
				</div>
			</div>
		);
	}
});

export default FreeAgentAuctionLists;