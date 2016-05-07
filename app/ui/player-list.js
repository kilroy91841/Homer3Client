import React from 'react';

import PlayerRow from 'ui/player-row';
import List from 'ui/component/list';

const defaultVultureColumnSize = 2;
const defaultNameColumnSize = 7;

const VultureColumn = React.createClass({
	render: function() {
		return (
			<div className={"col-md-" + this.props.columnSize}>
				{
					this.props.vulturable ? <span className="label label-danger">Vulturable</span> : null
				}
			</div>
		);
	}
});

export default React.createClass({
	render: function() {
		var self = this;
		var anyVulturable = 
			this.props.data
				.reduce(function(a, b) { 
					return a.concat(b); 
				})
				.filter(function(p) { 
					return p.currentSeason.vulturable; 
				})
			.length;
		var nameColumnSize = anyVulturable ? defaultNameColumnSize - defaultVultureColumnSize : defaultNameColumnSize;
		var vultureColumnSize = defaultVultureColumnSize;
		return (
			<List title={this.props.title} hideTitle={this.props.hideTitle}>
				<div className="row">
					<div className="col-md-2">
						<i>Pos</i>
					</div>
					<div className={"col-md-" + nameColumnSize}>
						<i>Name</i>
					</div>
					{
						anyVulturable ? 
							<div className={"col-md-" + vultureColumnSize}/> : 
							null
					}
					<div className="col-md-3 text-right">
						<i>Salary</i>
					</div>
				</div>
				{
					this.props.data.map(function(playerArray) {
						return playerArray.map(function(player) {
							return ( 
								<PlayerRow onClick={self.props.onClick} key={player.id} player={player}>
									<div className="col-md-2">
										{player.currentSeason.fantasyPosition.name}
									</div>
									<div className={"col-md-" + nameColumnSize}>
										{player.name}
									</div>
									{
										anyVulturable ? 
											<VultureColumn 
												vulturable={player.currentSeason.vulturable} 
												columnSize={vultureColumnSize}
											/> : 
											null
									}
									<div className="col-md-3 text-right">
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