import React from 'react';

import { isAdmin } from 'auth';
import PlayerSearch from 'ui/player-search';

const CreateVulture = React.createClass({
	getInitialState: function() {
		return {
			selectedPlayer: {}
		}
	},
	selectPlayer: function(player) {
		this.setState( { selectedPlayer : player });
		this.props.changeDropPlayer(player);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h3>Vulturing</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<p className="lead">{this.props.player.name}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<h4>Select a player to drop</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<PlayerSearch
								players={this.props.players}
								value={this.state.selectedPlayer}
								onChange={this.selectPlayer}
							/>
						</div>
					</div>
					{
						isAdmin() ? 
						<div className="row">
							<div className="col-md-12">
								<input 
									type="checkbox" 
									onChange={this.props.setCommissionerVulture}
								/>
								Act As Commissioner
							</div>
						</div>
						:
						null
					}
					<div className="row">
						<div className="col-md-12">
							<input type="submit" onClick={this.props.submitVulture} value="Vulture"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default CreateVulture;