import React from 'react';

import Moment from 'moment-timezone';
import { connect } from 'react-redux';
import { teamId } from 'auth';

import TeamLink from 'ui/team-link';
import PlayerRow from 'ui/player-row';
import TradeElement from 'ui/pages/trade/trade-element';

const stateToProps = function(state) {
	return {
		teamMap: state.reducer.teamMap
	}
};

const TradeRow = React.createClass({
	getInitialState: function() {
		return {
			expanded: false
		}
	},
	toggleCollapse: function() {
		var expanded = this.state.expanded;
		this.setState({expanded: !expanded });
	},
	acceptTrade: function() {
		this.props.acceptTrade(this.props.trade);
	},
	rejectTrade: function() {
		this.props.rejectTrade(this.props.trade);
	},
	cancelTrade: function() {
		this.props.cancelTrade(this.props.trade);
	},
	render: function() {
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row hoverDiv">
						<div className="col-md-1">
							<span style={{cursor:"pointer"}} onClick={this.toggleCollapse}>{ this.state.expanded ? "-" : "+" }</span>
						</div>
						<div className="col-md-3">
							<TeamLink team={this.props.teamMap[this.props.trade.team1Id]} />
						</div>
						<div className="col-md-3">
							<TeamLink team={this.props.teamMap[this.props.trade.team2Id]} />
						</div>
						<div className="col-md-1">
							{Moment(this.props.trade.proposedDateUTC.millis).format("MM/DD/YYYY")}
						</div>
						<div className="col-md-1">
							{
								this.props.trade.respondedDateUTC ?
								Moment(this.props.trade.respondedDateUTC.millis).format("MM/DD/YYYY")
								: null
							}
						</div>
						{
							this.props.trade.tradeStatus.id == 1 &&
							this.props.trade.team1Id != teamId() ?
							<div className="col-md-1">
								<input type="button" value="ACCEPT" onClick={this.acceptTrade} />
							</div>
							:
							null
						}
						{
							this.props.trade.tradeStatus.id == 1 &&
							this.props.trade.team1Id != teamId() ?
							<div className="col-md-1">
								<input type="button" value="REJECT" onClick={this.rejectTrade}/>
							</div>
							:
							null
						}
						{
							this.props.trade.tradeStatus.id == 1 &&
							this.props.trade.team1Id == teamId() ?
							<div className="col-md-1">
								<input type="button" value="CANCEL" onClick={this.cancelTrade}/>
							</div>
							:
							null
						}
					</div>
					{
						this.state.expanded ?
						<div className={"row bg-grey tradeElements" + this.props.trade.id}>
							<div className="col-md-12">
								<div className="row">
									<div className="col-md-3 col-md-offset-1">
										<i>From</i>
									</div>
									<div className="col-md-3">
										<i>To</i>
									</div>
								</div>
								{
									this.props.trade.tradeElements.map(function(tradeElement) {
										return (
											<div key={tradeElement.id} className="row">
												<div className="col-md-3 col-md-offset-1">
													<TeamLink team={self.props.teamMap[tradeElement.teamFromId]} />
												</div>
												<div className="col-md-3">
													<TeamLink team={self.props.teamMap[tradeElement.teamToId]} />
												</div>
												<div className="col-md-5">
													<TradeElement data={tradeElement} />
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						:
						null
					}
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(TradeRow);