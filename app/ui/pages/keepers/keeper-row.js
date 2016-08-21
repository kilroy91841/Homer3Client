import React from 'react';

import PlayerRow from 'ui/player-row';
import { getNextSalary } from 'ui/pages/keepers/util';

const KeeperRow = React.createClass({
	render: function() {
		var majorLeaguerSelected = this.props.keepers.majorLeaguers[this.props.player.id] != undefined;
		var minorLeaguerSelected = this.props.keepers.minorLeaguers[this.props.player.id] != undefined;

		var hasRookieStatus = this.props.player.currentSeason.hasRookieStatus;
		var majorLeaguerCount = Object.keys(this.props.keepers.majorLeaguers).length;
		var minorLeaguerCount = Object.keys(this.props.keepers.minorLeaguers).length;
		var currentKeeperSeason = this.props.player.currentSeason.keeperSeason;
		var noKeeperYearsLeft = currentKeeperSeason == 3;
		var currentSalary = this.props.player.currentSeason.salary;
		var majorLeaguerDisabled = (!majorLeaguerSelected && majorLeaguerCount >= 10) || (noKeeperYearsLeft);
		var minorLeaguerDisabled = !minorLeaguerSelected && minorLeaguerCount >= 10;
		var nextSalary = getNextSalary(this.props.player);
		var nextKeeperSeason = currentKeeperSeason + 1;
		return (
			<PlayerRow player={this.props.player} 
				className={noKeeperYearsLeft ? "bg-danger" : majorLeaguerSelected || minorLeaguerSelected ? "bg-success" : ""}>
				<div className="col-md-1">
					{this.props.player.position.name}
				</div>
				<div className={"col-md-2"}>
					{this.props.player.name}
				</div>
				<div className="col-md-1 text-right">
					{currentKeeperSeason}
				</div>
				<div className="col-md-1 text-right">
					{currentSalary}
				</div>
				<div className="col-md-1 text-right">
					{noKeeperYearsLeft ? "--" : nextKeeperSeason}
				</div>
				<div className="col-md-1 text-right">
					{noKeeperYearsLeft ? "--" : nextSalary}
				</div>
				<div className="col-md-2">
					<input type="checkbox" 
						checked={ majorLeaguerSelected ? "checked" : null } 
						disabled={ majorLeaguerDisabled ? "disabled" : null }
						onChange={(cb)=>this.props.toggle(this.props.player.id, nextSalary, false, cb.target.checked, ()=>{cb.target.checked = false;})}
					/>
				</div>
				<div className="col-md-2">
					{
						hasRookieStatus ?
						<input type="checkbox" 
							checked={ minorLeaguerSelected ? "checked" : null } 
							disabled={ minorLeaguerDisabled ? "disabled" : null }
							onChange={(cb)=>this.props.toggle(this.props.player.id, 0, true, cb.target.checked, ()=>{cb.target.checked = false;})}
						/>
						:
						null
					}
				</div>
			</PlayerRow>
		);
	}
});

export default KeeperRow;