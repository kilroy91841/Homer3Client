import React from 'react';
import { connect } from 'react-redux';

import PlayerRow from 'ui/player-row';

const stateToProps = function(state) {
	return {
		playerMap: state.reducer.playerMap
	}
};

const TradeElement = React.createClass({
	removeTradeElement: function() {
		this.props.tradeElementRemoved(this.props.data);
	},
	getMinorLeaguePickText: function() {
		var text = this.props.data.minorLeaguePick.text;
		if (this.props.data.swapTrade) {
			text += " (Right to swap)";
		}
		return text;
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-10">
					{
						this.props.data.player ?
						<PlayerRow player={this.props.data.player}>
							<div className="col-md-12">
								{this.props.data.player.name}
							</div>
						</PlayerRow>
						:
						this.props.data.minorLeaguePick ?
						<span>{this.getMinorLeaguePickText()}</span>
						:
						this.props.data.draftDollar ?
						<span>{"$" + this.props.data.draftDollarAmount + " of " + this.props.data.draftDollar.text}</span>
						:
						<span/>
					}
				</div>
				{
					this.props.removable ?
					<div className="col-md-2">
						<input type="submit" onClick={this.removeTradeElement} value="REMOVE" />
					</div>
					:
					null
				}
			</div>
		)
	}
});

export default connect(stateToProps)(TradeElement);