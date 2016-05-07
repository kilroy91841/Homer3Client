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
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Vulturable Players</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<PlayerList 
								onClick={this.props.onPlayerClick}
								hideTitle={true}
								data= {
									[
										this.state.players
									]
								}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default VulturePanel;