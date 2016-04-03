import React from 'react';
import { Link } from 'react-router';
import { getTeams } from 'api/team';

//UI
import Nav from 'layouts/nav';
import PlayerPanel from 'ui/player-panel';

export default React.createClass({

    getInitialState: function() {
        return {
            teams: []
        }
    },

    componentWillMount: function() {
        var _this = this;
        getTeams().then(function(response) {
            _this.setState({
                teams: response.data
            })
        }).catch(function(err) {
            console.error(err);
        });
    },

    render: function() {
        return (
            <div>
                <Nav teams={this.state.teams}/>
                <div className="container" >
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
