import React from 'react';
import { connect } from 'react-redux';

import LoggedInComponent from 'ui/logged-in-component';
import TradeCreator from 'ui/pages/trade/trade-creator';
import TradeRow from 'ui/pages/trade/trade-row';
import List from 'ui/component/list';

import { isLoggedIn, teamId } from 'auth';
import { getTrades, acceptTrade, rejectTrade, cancelTrade } from 'api/trade';

const stateToProps = function(state) {
    return {
        team: state.reducer.teamMap[teamId()]
    }
};

const TradeGrouping = React.createClass({
	render: function() {
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<List title={this.props.header}>
						<div className="row">
							<div className="col-md-3 col-md-offset-1">
								<i>Proposing Team</i>
							</div>
							<div className="col-md-3">
								<i>Receiving Team</i>
							</div>
							<div className="col-md-1">
								<i>Proposed Date</i>
							</div>
							<div className="col-md-1">
								<i>Response Date</i>
							</div>
						</div>
						{
							this.props.trades.map(function(trade) {
								return <TradeRow 	
											key={trade.id} 
											acceptTrade={self.props.acceptTrade}
											rejectTrade={self.props.rejectTrade}
											cancelTrade={self.props.cancelTrade} 
											trade={trade}
											/>
							})
						}
					</List>
				</div>
			</div>
		)
	}
});

const Trade = React.createClass({
	getInitialState: function() {
		return {
			trades: {}
		}
	},
	componentDidMount: function() {
		if (isLoggedIn) {
			var self = this;
			getTrades(teamId(), function(response) {
				self.setState({ trades: response.data.data });
			}, function(error) {
				console.log(error.data.message);
			});
		}
	},
	proposeTrade: function(inTrade) {
		var trades = this.state.trades;
		trades.activeTrades.push(inTrade);
		this.setState({ trades: trades });
	},
	acceptTrade: function(inTrade) {
		var self = this;
		var r = confirm("You are about to accept this trade. Press OK to proceed");
		if (r) {
			acceptTrade(inTrade.id, function(response) {
				alert(response.data.message);
				var trades = self.state.trades;
				var newActiveTrades = [];
				var updatedTrade;
				trades.activeTrades.forEach(function(trade) {
					if (trade.id != inTrade.id) {
						newActiveTrades.push(trade);
					} else {
						updatedTrade = trade;
					}
				});
				trades.activeTrades = newActiveTrades;
				updatedTrade.tradeStatus = 3;
				trades.completedTrades.push(updatedTrade);
				self.setState({ trades : trades });
			}, function(error) {
				alert(error.data.message);
			});
		}
	},
	rejectTrade: function(inTrade) {
		var self = this;
		var r = confirm("You are about to reject this trade. Press OK to proceed");
		if (r) {
			rejectTrade(inTrade.id, function(response) {
				alert(response.data.message);
				var updatedTrade;
				var trades = self.state.trades;
				var newActiveTrades = [];
				trades.activeTrades.forEach(function(trade) {
					if (trade.id != inTrade.id) {
						newActiveTrades.push(trade);
					} else {
						updatedTrade = trade;
					}
				});
				trades.activeTrades = newActiveTrades;
				updatedTrade.tradeStatus = 8;
				trades.rejectedTrades.push(updatedTrade);
				self.setState({ trades : trades });
			}, function(error) {
				alert(error.data.message);
			});
		}
	},
	cancelTrade: function(inTrade) {
		var self = this;
		var r = confirm("You are about to cancel this trade. Press OK to proceed");
		if (r) {
			cancelTrade(inTrade.id, function(response) {
				alert(response.data.message);
				var updatedTrade;
				var trades = self.state.trades;
				var newActiveTrades = [];
				trades.activeTrades.forEach(function(trade) {
					if (trade.id != inTrade.id) {
						newActiveTrades.push(trade);
					} else {
						updatedTrade = trade;
					}
				});
				trades.activeTrades = newActiveTrades;
				updatedTrade.tradeStatus = 9;
				trades.cancelledTrades.push(updatedTrade);
				self.setState({ trades : trades });
			}, function(error) {
				alert(error.data.message);
			});
		}
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-12">
						<h2>Propose New Trade</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<TradeCreator teamFrom={this.props.team} proposeTrade={this.proposeTrade}/>
					</div>
				</div>
				<TradeGrouping 
					header={"Active Trades"}
					trades={this.state.trades.activeTrades || []}
					acceptTrade={this.acceptTrade}
					rejectTrade={this.rejectTrade}
					cancelTrade={this.cancelTrade}
				/>
				<TradeGrouping 
					header={"Completed Trades"}
					trades={this.state.trades.completedTrades || []}
				/>
				<TradeGrouping 
					header={"Rejected Trades"}
					trades={this.state.trades.rejectedTrades || []}
				/>
				<TradeGrouping 
					header={"Cancelled Trades"}
					trades={this.state.trades.cancelledTrades || []}
				/>
			</LoggedInComponent>
		)
	}
});

export default connect(stateToProps)(Trade);

