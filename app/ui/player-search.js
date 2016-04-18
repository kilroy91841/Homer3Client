import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const stateToProps = function(state) {
    return {
        allPlayers: state.reducer.players
    }
};

const PlayerSearch = React.createClass({
	render: function() {
		return (
			<Select 
				className={this.props.classProp}
				name="player-search-select"
				options={this.props.players || this.props.allPlayers}
				labelKey={"name"}
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