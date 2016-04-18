import React from 'react';
import { Link } from 'react-router';
import { getTeams } from 'api/team';
import { getPlayers } from 'api/player';
import { getMetadata } from 'api/api';
import store from 'store';
import { connect } from 'react-redux';
import ProgressBar from 'react-progress-bar-plus';

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
        getTeams().then(function(response) {
            store.dispatch({
                type: 'GET_TEAMS',
                teams: response.data
            });
        }).catch(function(err) {
            console.error(err);
        });
        getPlayers().then(function(response) {
            store.dispatch({
                type: 'GET_PLAYERS',
                players: response.data
            });
        }).catch(function(err) {
            console.error(err);
        });
        getMetadata().then(function(response) {
            store.dispatch({
                type: 'METADATA',
                metadata: response.data
            });
        });

    },

    render: function() {
        return (
            <div>
                <Nav teams={this.props.teams}/>
                <div className="container" >
                    <ProgressBar percent={this.props.progressBar.percent}/>
                    <div className="row">
                        <div className="col-md-10">
                            {this.props.children}
                        </div>
                        <div className="col-md-2">
                            <PlayerPanel />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(stateToProps)(App);