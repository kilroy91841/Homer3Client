import React from 'react';
import { connect } from 'react-redux';

import PlayerList from 'ui/player-list';

import _ from 'lodash';

const stateToProps = function(state) {
	var keys = Object.keys(state.reducer.playerMap);
	var values = keys.map(function(v) { return state.reducer.playerMap[v]; });
	var filtered = _.filter(values, function(p) { return p.currentSeason.keeperSeason == 3; })
    return {
        allPlayers: filtered
    }
};

const DraftablePlayers = React.createClass({
	render: function() {
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<PlayerList title="Draft-Eligible Players" hidePlayerSeason={true} data={[this.props.allPlayers] || []} />
				</div>
			</div>
		)
	}
});

export default connect(stateToProps)(DraftablePlayers);