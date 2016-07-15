import React from 'react';

import FreeAgentAuctionRow from 'ui/pages/freeAgentAuction/free-agent-auction-row';
import AdminForm from 'ui/admin-form';

import { admin } from 'api/freeAgentAuction';

const RadioButtons = [
	{name: "denyAuction", displayName: "Deny Auction"},
	{name: "startAuction", displayName: "Start Auction"},
	{name: "cancelAuction", displayName: "Cancel Auction"},
	{name: "winningTeam", displayName: "Winning Team"}
];

const KeyValueInputs = [
	{ title: "Team Id", inputType: "number", keyName: "teamId" },
	{ title: "Deny Reason", inputType: "text", keyName: "denyReason" }
];

const FreeAgentAuctionAdmin = React.createClass({
	doAdmin: function(state) {
		var self = this;
		var view = $.extend({}, state);
		view.freeAgentAuctionId = this.props.auction.id;
		admin(view, function(response) {
			self.props.replaceAuctions(response.data.data);
			alert("Admin Successful");
		}, function(error) {
			console.log(error);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<AdminForm 
						radioButtons={RadioButtons} 
						keyValueInputs={KeyValueInputs} 
						doAdmin={this.doAdmin}
					/>
				</div>
			</div>
		)
	}
});

export default FreeAgentAuctionAdmin;