import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const stateToProps = function(state) {
    return {
        players: state.reducer.players
    }
};

const PlayerSearch = React.createClass({
	getInitialState: function() {
		return {
			players: [],
			selectedPlayer: null
		}
	},
	playerClicked: function(player) {
        this.setState({ selectedPlayer : player });
        this.props.onPlayerClick(player);
	},
	render: function() {
		var _this = this;
		return (
			<Select 
				className={this.props.classProp}
				name="player-search-select"
				options={this.props.filteredPlayers || this.props.players}
				labelKey={"name"}
				valueKey={"id"}
				value={this.state.selectedPlayer}
				onChange={this.playerClicked}
				scrollMenuIntoView={false}
				autosize={false}
				placeholder={"Player Search..."}
			/>
		)
	}
});

export default connect(stateToProps)(PlayerSearch);