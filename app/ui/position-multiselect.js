import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

const stateToProps = function(state) {
    return {
        positions: state.reducer.metadata.positions
    }
};

const PositionMultiSelect = React.createClass({
	render: function() {
		return (
			<Select multi
				name="position-multiselect"
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

export default connect(stateToProps)(PositionMultiSelect);