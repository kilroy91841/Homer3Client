import React from 'react';

import { getFreeAgentAuctionDollar, bid } from 'api/freeAgentAuction';
import { teamId } from 'auth';

const FreeAgentAuctionBidder = React.createClass({
	getInitialState: function() {
		const myTeamId = teamId();
		var teamBid = undefined;
		if (myTeamId && this.props.auction.bids) {
			this.props.auction.bids.forEach(function(bid) {
				if (bid.teamId == myTeamId) {
					teamBid = bid;
				}
			});
		}
		return {
			draftDollar: {},
			teamBid: teamBid,
			amount: -1
		};
	},
	componentDidMount: function() {
		const self = this;
		const userTeamid = teamId();
		getFreeAgentAuctionDollar(userTeamid, function(response) {
			self.setState({ draftDollar : response.data.data });
		}, function(error) {
			console.log(error);
		})
	},
	changeBid: function(e) {
		if (e.target.value <= this.state.draftDollar.amount && e.target.value >= 0) {
			this.setState({ amount: e.target.value });
		}
	},
	submitBid: function() {
		if (this.state.amount.length == 0 || this.state.amount > this.state.draftDollar.amount || this.state.amount < 0) {
			alert("Your bid amount is illegal, please enter a new amount");
			return;
		}
		var bidView = { 
			freeAgentAuctionId: this.props.auction.id, 
			teamId: teamId(),
			amount: this.state.amount
		};
		var self = this;
		bid(bidView, function(response) {
			self.setState({ teamBid: response.data.data });
			alert(response.data.message);
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-6">
							<i>Your Current Bid</i>
						</div>
						<div className="col-md-6">
							{this.state.teamBid ? this.state.teamBid.amount : "-"}
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<h4>New Bid</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<input type="number" 
								style={{minWidth:"100px"}}
								max={this.state.draftDollar ? this.state.draftDollar.amount : 0} 
								min={"0"}
								onChange={this.changeBid}/>
								(max bid: {this.state.draftDollar ? this.state.draftDollar.amount : null })
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<input type="button" value="SUBMIT BID" onClick={this.submitBid} />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default FreeAgentAuctionBidder;