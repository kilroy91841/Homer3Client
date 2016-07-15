import React from 'react';

import LoggedInComponent from 'ui/logged-in-component';
import { getAuctions } from 'api/freeAgentAuction';
import { isAdmin } from 'auth';

import FreeAgentAuctionLists from 'ui/pages/freeAgentAuction/free-agent-auction-lists';
import FreeAgentAuctionAdmin from 'ui/pages/freeAgentAuction/free-agent-auction-admin';
import FreeAgentAuctionDetail from 'ui/pages/freeAgentAuction/free-agent-auction-detail';
import FreeAgentAuctionRequestor from 'ui/pages/freeAgentAuction/free-agent-auction-requestor';

const FreeAgentAuction = React.createClass({
	getInitialState: function() {
		return {
			auctions: [],
			selectedAuction: undefined
		}
	},
	componentDidMount: function() {
		var self = this;
		getAuctions(function(response) {
			if (response.data.data) {
				self.setState( { auctions : response.data.data } );
			}
		}, function(error) {
			console.log(error);
		});
	},
	onAuctionClick: function(auction) {
		this.setState({ selectedAuction : auction });
	},
	replaceAuctions: function(auctions) {
		this.setState( { auctions : auctions } );
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-8">
						{
							isAdmin() ?
							<FreeAgentAuctionAdmin 
								onClick={this.onAuctionClick} 
								auction={this.state.selectedAuction}
								replaceAuctions={this.replaceAuctions} /> :
							null
						}
						<FreeAgentAuctionRequestor />
						<FreeAgentAuctionLists onClick={this.onAuctionClick} auctions={this.state.auctions}/>
					</div>
					<div className="col-md-4">
						{
							this.state.selectedAuction ?
							<FreeAgentAuctionDetail 
								auction={this.state.selectedAuction}
								/> 
							:
							null
						}
					</div>
				</div>
			</LoggedInComponent>
		);
	}
});

export default FreeAgentAuction;