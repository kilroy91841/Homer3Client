import React from 'react';
import { connect } from 'react-redux';

import TeamLink from 'ui/team-link';
import DisplayRow from 'ui/component/display-row';

const stateToProps = function(state) {
    return {
        teamMap: state.reducer.teamMap
    }
};

const SeasonRow = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<h4>{this.props.season.season}</h4>
					<DisplayRow title={"Team"}>
						<TeamLink team={this.props.teamMap[this.props.season.teamId]} />
		    		</DisplayRow>
		    		<DisplayRow title={"Salary"}>
						<div>{this.props.season.salary}</div>
		    		</DisplayRow>
		    		<DisplayRow title={"Keeper Season"}>
		    			<div>{this.props.season.keeperSeason}</div>
		    		</DisplayRow>
		    		{
		    			this.props.season.draftTeamId ?
		    			<DisplayRow title={"Draft Team"}>
		    				<TeamLink team={this.props.teamMap[this.props.season.draftTeamId]} />
		    			</DisplayRow>
		    			:
		    			this.props.season.keeperTeamId ?
		    			<DisplayRow title={"Keeper Team"}>
		    				<TeamLink team={this.props.teamMap[this.props.season.keeperTeamId]} />
		    			</DisplayRow>
		    			:
		    			null
		    		}
		            {
		                this.props.season.fantasyPosition ?
		                    <DisplayRow title={"Fantasy Position"}>
		                        <div>{this.props.season.fantasyPosition.name}</div>
		                    </DisplayRow>
		                    : 
		                    <div />
		            }
		            {
		            	this.props.currentSeason ?
		            	<div className="row">
		            		<div className="col-md-12">
					    		<DisplayRow title={"Primary Position"}>
					    			<div>{this.props.player.position.name}</div>
					    		</DisplayRow>
					    		<DisplayRow title={"MLB Status"}>
				                	<div>{this.props.season.mlbStatus.name}</div>
				            	</DisplayRow>
				            </div>
				           </div>
			    		:
			    		null
		            }
            	</div>
            </div>
		)
	}
});

export default connect(stateToProps)(SeasonRow);