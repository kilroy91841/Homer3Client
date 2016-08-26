import React from 'react';
import { Link, withRouter } from 'react-router';
import { getTeams } from 'api/team';
import { getPlayers } from 'api/player';
import { getMetadata, hasAccess } from 'api/api';
import store from 'store';
import { connect } from 'react-redux';
import ProgressBar from 'react-progress-bar-plus';
import { token, removeUser } from 'auth';

//UI
import Nav from 'layouts/nav';
import PlayerPanel from 'ui/player-panel';

const stateToProps = function(state) {
    return {
        teams: state.reducer.teams,
        progressBar: state.reducer.progressBar
    }
};

const App = React.createClass({
    componentWillMount: function() {
        var _this = this;
        hasAccess(token(), function(response) {
            if (!response.data.data) {
                removeUser();
            }
        }, function(err) {
            console.log(err.data);
        });
        getTeams(function(response) {
            store.dispatch({
                type: 'GET_TEAMS',
                teams: response.data
            });
        }, function(err) {
            console.error(err);
        });
        getPlayers(function(response) {
            var playerMap = {};
            response.data.map(function(player) { 
               var playerObj = {};
               playerMap[player.id] = player;
            });
            store.dispatch({
                type: 'GET_PLAYER_MAP',
                playerMap: playerMap
            });
        }, function(err) {
            console.error(err);
        });
        getMetadata(
            function(response) {
                store.dispatch({
                    type: 'METADATA',
                    metadata: response.data
                });
            },
            function(error) {
                alert(error.response.message);
            }
        );

    },

    render: function() {
        return (
            <div>
                <Nav teams={this.props.teams}/>
                <div className="container" style={{paddingBottom:"20px"}}>
                    <ProgressBar percent={this.props.progressBar.percent}/>
                    <div className="row">
                        <div className="col-md-9">
                            {this.props.children}
                        </div>
                        <div className="col-md-3">
                            <PlayerPanel />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default withRouter(connect(stateToProps)(App));