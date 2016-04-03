import React from 'react';
import store from 'store';

import PlayerRow from 'ui/player-row';
import List from 'ui/component/list';

export default React.createClass({
	render: function() {
		return (
			<List title={this.props.title}>
				<div className="row">
					<div className="col-md-3">
						<i>Pos</i>
					</div>
					<div className="col-md-6">
						<i>Name</i>
					</div>
					<div className="col-md-3">
						<i>Salary</i>
					</div>
				</div>
				{
					this.props.data.map(function(playerArray) {
						return playerArray.map(function(player) {
							return ( 
								<PlayerRow key={player.id} player={player}>
									<div className="col-md-3">
										{player.currentSeason.fantasyPosition.name}
									</div>
									<div className="col-md-6">
										{player.name}
									</div>
									<div className="col-md-3">
										{player.currentSeason.salary}
									</div>
								</PlayerRow>
							)
						})
					})
				}
			</List>
		)
	}
});