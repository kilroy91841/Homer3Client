import React from 'react';
import { getVulturablePlayers } from 'api/player';
import PlayerList from 'ui/player-list';

const VulturePanel = React.createClass({
	getInitialState: function() {
		return {
			players: []
		}
	},
	componentWillMount: function() {
		var self = this;
		getVulturablePlayers().then(function(response) {
			self.setState({ players: response.data });
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					<PlayerList 
						title="Vulturable Players"
						data= {
							[
								this.state.players
							]
						}
					/>
				</div>
			</div>
		);
	}
});

export default VulturePanel;