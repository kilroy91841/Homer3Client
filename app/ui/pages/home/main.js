import React from 'react';
import { Link, withRouter } from 'react-router';

import VulturePanel from 'ui/vulture-panel';
import SalaryPanel from 'ui/salary-panel';
import DraftDollarPanel from 'ui/draft-dollar-panel';
import StandingsWidget from 'ui/pages/home/standingsWidget';

import { isOffseason } from 'auth';

const Home = React.createClass({
	onVulturePlayerClick: function(player) {
		this.props.router.push({ pathname:"/vulture", state: { player: player} });
	},
	render: function() {
		const _isOffseason = isOffseason(); 
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						{
							_isOffseason 
							?
							<div className="col-md-12">
								<div className="row">
									<div className="col-md-6">
										<DraftDollarPanel/>
									</div> 
									{
										false ?
										<div className="col-md-6">
											<h2>
											<Link to={"/majorLeagueDraft"}>MAJOR LEAGUE DRAFT</Link>
											</h2>
										</div> 
										:
										null
									}
								</div>
							</div>
							:	
							<div className="col-md-6">
								<VulturePanel onPlayerClick={this.onVulturePlayerClick}/>
							</div>
						}
						{
							_isOffseason
							?
							null
							:
							<div className="col-md-6">
								<SalaryPanel/>
							</div>
						}
					</div>
					<div className="row">
						{
							_isOffseason ?
							null :	
							<div className="col-md-6">
								<StandingsWidget />
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
});

export default withRouter(Home);
