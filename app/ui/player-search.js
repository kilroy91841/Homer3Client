import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const stateToProps = function(state) {
	var keys = Object.keys(state.reducer.playerMap);
	var values = keys.map(function(v) { return state.reducer.playerMap[v]; });
    return {
        allPlayers: values
    }
};

const PlayerSearch = React.createClass({
	render: function() {
		return (
			<Select 
				className={this.props.classProp}
				name="player-search-select"
				options={this.props.players || this.props.allPlayers}
				labelKey={this.props.labelKey || "name"}
				valueKey={"id"}
				value={this.props.value}
				onChange={this.props.onChange}
				scrollMenuIntoView={false}
				autosize={false}
				placeholder={"Player Search..."}
			/>
		)
	}
});

export default connect(stateToProps)(PlayerSearch);