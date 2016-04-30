import React from 'react';
import { connect } from 'react-redux';

import TeamLink from 'ui/team-link';

const stateToProps = function(state) {
    return {
        player: state.reducer.player
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

const PlayerDisplay = React.createClass({
    render: function() {
    	if (this.props.player.name) {
    		return ( <_PlayerDisplay {...this.props} />)
    	} else {
    		return ( <div className="row" /> )
    	}
    }
});

export default connect(stateToProps)(PlayerDisplay);