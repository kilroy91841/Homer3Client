import React from 'react';
import { connect } from 'react-redux';

import Table from 'ui/pages/players/table';
import PositionMultiSelect from 'ui/position-multiselect';

const stateToProps = function(state) {
    return {
        playerMap: state.reducer.playerMap
    }
};

const PlayersPage = React.createClass({
    getInitialState: function() {
        return {
            filters : []
        }
    },
    getPlayers: function(playerMap) {
        let players = [];
        for (var player in playerMap)
        {
            players.push(playerMap[player]);
        }
        return players;
    },
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Players</h2>
						</div>
					</div>
                    <div className="row">
                        <div className="col-md-4">
                            Position Filter
                        </div>
                        <div className="col-md-4">
                            <PositionMultiSelect />
                        </div>
                    </div>
					<div className="row">
						<div className="col-md-12">
							<Table 
								columns={[
									{label: 'Keeper Year', dataProp: "keeperSeason", dataFunc: (p)=>p.currentSeason.keeperSeason}, 
									{label: 'Salary', dataProp: "salary", dataFunc: (p)=>p.currentSeason.salary}
								]} 
								data={this.getPlayers(this.props.playerMap)} 
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

export default connect(stateToProps)(PlayersPage);