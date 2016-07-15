import React from 'react';

import { teamId } from 'auth';
import { requestFreeAgentAuction } from 'api/freeAgentAuction';

import KeyValueInput from 'ui/component/key-value-input';

const FreeAgentAuctionRequestor = React.createClass({
	getInitialState: function() {
		return {
			mlbPlayerId: undefined
		}
	},
	onChange: function(key, val) {
		var newState = {};
		newState[key] = val;
		this.setState(newState);
	},
	onSubmit: function() {
		if (!this.state.mlbPlayerId) {
			alert("Please enter a valid MLB player id");
			return;
		}
		var view = { 
			player : {
				mlbPlayerId : this.state.mlbPlayerId
			},
			requestingTeamId: teamId()
		};
		requestFreeAgentAuction(view, function(response) {
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
						<div className="col-md-12">
							<h2>Request New Free Agent Auction</h2>
						</div>
					</div>
					<KeyValueInput title="MLB Player Id" type="number" keyName="mlbPlayerId" onChange={this.onChange} />
					<div className="row">
						<div className="col-md-12">
							<input type="submit" value="Request Auction" onClick={this.onSubmit} />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default FreeAgentAuctionRequestor;