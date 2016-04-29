import React from 'react';
import store from 'store';

import PlayerRow from 'ui/player-row';
import List from 'ui/component/list';

const vultureColumnSize = 2;

const VultureColumn = React.createClass({
	render: function() {
		return (
			<div className={"col-md-" + vultureColumnSize}>
				{
					this.props.vulturable ? <span className="label label-danger">Vulturable</span> : <span />
				}
			</div>
		);
	}
});

export default React.createClass({
	render: function() {
		var anyVulturable = 
			this.props.data
				.reduce(function(a, b) { 
					return a.concat(b); 
				})
				.filter(function(p) { 
					return p.currentSeason.vulturable; 
				})
			.length;
		var nameColumnSize = anyVulturable ? 6 - vultureColumnSize : 6;
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
									<div className={"col-md-" + nameColumnSize}>
										{player.name}
									</div>
									{
										anyVulturable ? <VultureColumn vulturable={player.currentSeason.vulturable} /> : <div />
									}
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