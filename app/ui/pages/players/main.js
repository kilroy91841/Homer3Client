import React from 'react';
import { connect } from 'react-redux';
import Store from 'store';
import ReactTable from "react-table";

import PositionMultiSelect from 'ui/position-multiselect';

const stateToProps = function(state) {
    return {
        playerMap: state.reducer.playerMap,
        teamMap: state.reducer.teamMap
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
    getTeamName: function(teamId) {
    	if (teamId)
    	{
    		return this.props.teamMap[teamId].name;
    	}
    	else
    	{
    		return "-";
    	}
    },
    playerClicked: function(id) {
		Store.dispatch({
            type: 'DISPLAY_PLAYER',
            playerId: id
        });
	},
	render: function() {
		const _this = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<ReactTable data={this.getPlayers(this.props.playerMap)}
						getTdProps={(state, rowInfo, column, instance) => {
    						return {
      							onClick: (e, handleOriginal) => {
      								_this.playerClicked(rowInfo.original.id);		
      							}
      						}
      					}
      				}
						columns=
						{
							[
								{
									Header: "Name",
									accessor: "name"
								},
								{
									Header: "Salary",
									id: "salary",
									accessor: p => p.currentSeason.salary,
									defaultSortDesc: true
								},
								{
									Header: "Team",
									id: "Team",
									accessor: p => this.getTeamName(p.currentSeason.teamId),
									defaultSortDesc: true
								},
								{
									Header: "Keeper Season",
									id: "keeperSeason",
									accessor: p => p.currentSeason.keeperSeason
								}
							]
						}
					/>
				</div>
			</div>
		);
	},
});

export default connect(stateToProps)(PlayersPage);