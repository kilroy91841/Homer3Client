import React from 'react';
import { connect } from 'react-redux';

import TeamLink from 'ui/team-link';
import Moment from 'moment-timezone';

const stateToProps = function(state) {
    return {
        player: state.reducer.player,
        draftDollar: state.reducer.draftDollar,
        teamMap: state.reducer.teamMap
    }
};

const DisplayRow = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					{this.props.title}
				</div>
				<div className="col-md-6">
					{this.props.children}
				</div>
			</div>
		)
	}
});

const _PlayerDisplay = React.createClass({
	render: function() {
        return (
            <div className="row">
            	<div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            {
                                this.props.player.mlbPlayerId ? 
                                    <img 
                                        src={"http://mlb.mlb.com/mlb/images/players/head_shot/" + 
                                            this.props.player.mlbPlayerId + ".jpg"} />
                                    :
                                    null
                            }
                        </div>
                    </div>
            		<div className="row">
            			<div className="col-md-12">
            				<h3>{this.props.player.name}</h3>
            			</div>
            		</div>
            		<DisplayRow title={"Team"}>
                        <TeamLink team={this.props.player.currentSeason.team} />
            		</DisplayRow>
            		<DisplayRow title={"Salary"}>
            			<div>{this.props.player.currentSeason.salary}</div>
            		</DisplayRow>
            		<DisplayRow title={"Keeper Season"}>
            			<div>{this.props.player.currentSeason.keeperSeason}</div>
            		</DisplayRow>
            		<DisplayRow title={"Primary Position"}>
            			<div>{this.props.player.position.name}</div>
            		</DisplayRow>
                    {
                        this.props.player.currentSeason.fantasyPosition ?
                            <DisplayRow title={"Fantasy Position"}>
                                <div>{this.props.player.currentSeason.fantasyPosition.name}</div>
                            </DisplayRow>
                            : 
                            <div />
                    }
                    <DisplayRow title={"MLB Status"}>
                        <div>{this.props.player.currentSeason.mlbStatus.name}</div>
                    </DisplayRow>
            	</div>
            </div>
        )
    }
});

const _DraftDollarDisplay = React.createClass({
    getDraftDollarMap: function() {
        if (this.props.draftDollar.historyDraftDollars.length > 0) {
            var lastAmount = this.props.draftDollar.historyDraftDollars[0].amount;
            var _this = this;
            return this.props.draftDollar.historyDraftDollars.map(function(dd, ix) {
                var netAmount = dd.amount - lastAmount;
                var isPositive = netAmount > 0;
                lastAmount = dd.amount;
                var thisTeamId = dd.team.id;
                var otherTeamId = undefined;
                if (dd.trade) {
                    otherTeamId = dd.trade.team1Id != thisTeamId ? dd.trade.team1Id : dd.trade.team2Id;
                }
                return (
                    <div className="row" key={dd.historyId}>
                        <div className="col-md-12">
                            {
                                ix > 0 ?
                                <div className="row">
                                    <div className="col-md-9 col-md-offset-3">
                                    {
                                        netAmount != 0 ? 
                                        <span style={{color: isPositive ? "green" : "red"}}>
                                            {
                                                dd.trade ? 
                                                <div>
                                                    <span>
                                                        {Moment(dd.trade.tradeDate.millis).format("MM/DD/YYYY")}
                                                    </span>
                                                    <br/>
                                                    <span>
                                                        Trade with&nbsp;
                                                        <TeamLink team={_this.props.teamMap[otherTeamId]} />
                                                    </span>
                                                    <br/>
                                                    <span>
                                                        {isPositive ? "+" + netAmount : netAmount}
                                                    </span>
                                                </div>
                                                : null
                                            }
                                        </span>
                                        :null
                                    }
                                    </div>
                                </div>
                                :
                                null
                            }
                            <DisplayRow title={"Amount"}>
                                <div>{dd.amount}</div>
                            </DisplayRow>
                        </div>
                    </div>
                );
            });
        } else {
            return null;
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>{this.props.draftDollar.text}</h3>
                        </div>
                    </div>
                    <DisplayRow title={"Current Amount"}>
                        <div>{this.props.draftDollar.amount}</div>
                    </DisplayRow>
                    <div className="row">
                        <div className="col-md-12">
                            <h4>History</h4>
                        </div>
                    </div>
                    {
                        this.getDraftDollarMap()
                    }
                </div>
            </div>
        )
    }
});

const PlayerDisplay = React.createClass({
    render: function() {
    	if (this.props.player.name) {
    		return ( <_PlayerDisplay {...this.props} />)
    	} else if (this.props.draftDollar.id) {
            return ( <_DraftDollarDisplay {...this.props} />)
        } else {
    		return ( <div className="row" /> )
    	}
    }
});

export default connect(stateToProps)(PlayerDisplay);