import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

const stateToProps = function(state) {
    return {
        positions: state.reducer.metadata.positions
    }
};

const PositionSelect = React.createClass({
	render: function() {
		return (
			<Select
				name="position-select"
				options={this.props.positions}
				labelKey={"name"}
				valueKey={"id"}
				value={this.props.value}
				onChange={this.props.onChange}
				scrollMenuIntoView={false}
			/>
		)
	}
});

export default connect(stateToProps)(PositionSelect);