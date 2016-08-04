import React from 'react';
import { withRouter } from 'react-router';

import { isAdmin } from 'auth';

import VulturePanel from 'ui/vulture-panel';
import SalaryPanel from 'ui/salary-panel';
import StandingsWidget from 'ui/pages/home/standingsWidget';

const Home = React.createClass({
	onVulturePlayerClick: function(player) {
		this.props.router.push({ pathname:"/vulture", state: { player: player} });
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-6">
							<VulturePanel onPlayerClick={this.onVulturePlayerClick}/>
						</div>
						<div className="col-md-6">
							<SalaryPanel/>
						</div>
					</div>
					{
						isAdmin() ?
						<div className="row">
							<div className="col-md-6">
								<StandingsWidget />
							</div>
						</div>
						:
						null
					}
				</div>
			</div>
		);
	}
});

export default withRouter(Home);
