import React from 'react';
import { connect } from 'react-redux';

import TeamLink from 'ui/team-link';
import PlayerRow from'ui/player-row';
import Moment from 'moment-timezone';
import store from 'store';
import DraftHistory from 'ui/pages/majorLeagueDraft/history';
import DisplayRow from 'ui/component/display-row';
import SeasonRow from 'ui/sidePanel/player/season-row';

const stateToProps = function(state) {
    return {
        player: state.reducer.player,
        draftDollar: state.reducer.draftDollar,
        teamMap: state.reducer.teamMap,
        playerMap: state.reducer.playerMap,
        picks: state.reducer.picks
    }
};

const _PlayerDisplay = React.createClass({
    close: function() {
        store.dispatch({
            type: 'DISPLAY_PLAYER',
            playerId: null
        });
    },
	render: function() {
        var self = this;
        return (
            <div className="row">
            	<div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <input type="button" onClick={this.close} value="Close" />
                        </div>
                    </div>
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
            		<SeasonRow 
                        player={this.props.player}
                        season={this.props.player.currentSeason} 
                        currentSeason={true} />
                    {
                        this.props.player.playerSeasons.sort(function(a, b) {
                            return a.season > b.season ? -1 : 1;
                        }).map(function(playerSeason) {
                            if (playerSeason.season == self.props.player.currentSeason.season)
                            {
                                return null;
                            }
                            else
                            {
                                return (
                                    <SeasonRow player={self.props.player} season={playerSeason} />
                                )
                            }
                        })
                    }
            	</div>
            </div>
        )
    }
});

const _DraftDollarDisplay = React.createClass({
    getPlace: function(place) {
        if (place == 1) {
            return "1st";
        } else if (place == 2) {
            return "2nd";
        } else if (place == 3) {
            return "3rd";
        } else {
            return place + "th";
        }
    },
    getDraftDollarMap: function() {
        if (this.props.draftDollar.historyDraftDollars.length > 0) {
            var lastDraftDollar = this.props.draftDollar.historyDraftDollars[0];
            var _this = this;
            return this.props.draftDollar.historyDraftDollars.map(function(dd, ix) {
                var netAmount = dd.amount - lastDraftDollar.amount;
                var isPositive = netAmount > 0;
                var displaySeptemberStanding = false;
                if (!lastDraftDollar.septemberStandingId && dd.septemberStandingId) {
                    displaySeptemberStanding = true;
                }
                lastDraftDollar = dd;
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
                                                displaySeptemberStanding ?
                                                <div>
                                                    <span>
                                                        September Standing bonus:
                                                    </span>
                                                    <br/>
                                                    <span>
                                                        {_this.getPlace(dd.septemberStanding.place) + " place"}
                                                    </span>
                                                    <br/>
                                                    <span>
                                                        {isPositive ? "+" + netAmount : netAmount}
                                                    </span>
                                                </div>
                                                :
                                                dd.trade ? 
                                                <div>
                                                    <span>
                                                        {Moment(dd.trade.respondedDateUTC.millis).format("MM/DD/YYYY")}
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
                                                :
                                                dd.draftedPlayerId ?
                                                <div>
                                                    <span>
                                                        Drafted&nbsp;
                                                        {_this.props.playerMap[dd.draftedPlayerId].name}
                                                    </span>
                                                </div>
                                                :
                                                null
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
    close: function() {
        store.dispatch({
            type: 'DISPLAY_DRAFT_DOLLAR',
            draftDollar: {}
        });
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <input type="button" onClick={this.close} value="Close" />
                        </div>
                    </div>
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
        } else if (this.props.picks) {
    		return ( <DraftHistory {...this.props} /> )
    	} else {
            return ( <div className="row" /> )
        }
    }
});

export default connect(stateToProps)(PlayerDisplay);