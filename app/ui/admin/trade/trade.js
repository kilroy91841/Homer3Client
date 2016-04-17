import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import TradeElement from 'ui/admin/trade/tradeElement';
import TradeElementCreator from 'ui/admin/trade/tradeElementCreator';

import { acceptTrade } from 'api/trade';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams,
        players: state.reducer.players
    }
};

const Trade = React.createClass({
	getInitialState: function() {
		return {
			team1: null,
			team2: null,
			tradeElements: []
		}
	},
	teamOptions: function() {
		var opts = [];
		this.props.teams.map(function(prop) {
			opts.push(prop);
		});
		return opts;
	},
	team1Change: function(newVal) {
		this.setState({ team1 : newVal});
	},
	team2Change: function(newVal) {
		this.setState({ team2 : newVal});
	},
	tradeElementAdded: function(tradeElement) {
		this.state.tradeElements.push(tradeElement);
		this.setState({ tradeElements: this.state.tradeElements });
	},
	tradeElementRemoved: function(tradeElement) {
		var indexOf = this.state.tradeElements.indexOf(tradeElement);
		if (indexOf >= 0) {
			this.state.tradeElements.splice(indexOf, 1);
			this.setState({ tradeElements: this.state.tradeElements });
		}
	},
	doTrade: function() {
		acceptTrade(this.state).then(function(response) {
			alert(response.data.message);
		});
	},
	render: function() {
		var self = this;
		return ( 
			<div className="row">
				<div className="col-md-12" >
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-6">
									Team 1
									<Select 
										name="team-1-select"
										options={this.teamOptions()}
										labelKey={"name"}
										valueKey={"id"}
										value={this.state.team1}
										onChange={this.team1Change}
										scrollMenuIntoView={false}
									/>
								</div>
								<div className="col-md-6">
									Team 2
									<Select 
										name="team-2-select"
										options={this.teamOptions()}
										labelKey={"name"}
										valueKey={"id"}
										value={this.state.team2}
										onChange={this.team2Change}
										scrollMenuIntoView={false}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
						{
							self.state.tradeElements
							.filter(function(te) { 
								return te.teamFrom.id == self.state.team1.id;
							})
							.map(function(te, ix) {
								return (
									<TradeElement key={ix} data={te}
										tradeElementRemoved={self.tradeElementRemoved}/>
								)
							})
						}
						</div>
						<div className="col-md-6">
						{
							self.state.tradeElements
							.filter(function(te) { 
								return te.teamFrom.id == self.state.team2.id;
							})
							.map(function(te, ix) {
								return (
									<TradeElement key={ix} data={te}
										tradeElementRemoved={self.tradeElementRemoved}/>
								)
							})
						}
						</div>
					</div>
					<br />
					<br />
					<TradeElementCreator 
						filteredTeams={[this.state.team1 || {}, this.state.team2 || {}]}
						addElement={this.tradeElementAdded}
						removeElement={this.tradeElementRemoved}
					/>
					<br />
					<br />
					<div className="row">
						<div className="col-md-6">
							<input type="submit" value="ACCEPT TRADE" onClick={this.doTrade} />
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(Trade);