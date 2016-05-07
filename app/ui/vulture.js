import React from 'react';
import { withRouter } from 'react-router';

import LoggedInComponent from 'ui/logged-in-component';

import VulturePanel from 'ui/vulture-panel';

const Vulture = React.createClass({
	getInitialState: function() {
		return {
			player : this.props.location.state ? this.props.location.state.player : undefined
		}
	},
	onPlayerClick: function(p) {
		this.setState({ player : p });
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-12">
						<h3>Select a player below to vulture</h3>
					</div>
					{
						this.state.player ?
							<div className="col-md-12">
								<p className="lead">{this.state.player.name}</p>
							</div>
							:
							null
					}
				</div>
				<div className="row">
					<div className="col-md-12">
						<VulturePanel onPlayerClick={this.onPlayerClick}/>
					</div>
				</div>
			</LoggedInComponent>
		)
	}
});

export default withRouter(Vulture);