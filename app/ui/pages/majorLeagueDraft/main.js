import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import LoggedInComponent from 'ui/logged-in-component';
import MajorLeagueDraftAdmin from 'ui/pages/majorLeagueDraft/admin';
import Draft from 'ui/pages/majorLeagueDraft/draft';

const stateToProps = function(state) {
    return {
        metadata: state.reducer.metadata
    }
};

const MajorLeagueDraft = React.createClass({
	getInitialState: function() {
		return {
		}
	},
	render: function() {
		return (
			<LoggedInComponent>
				<div className="row">
					<div className="col-md-12">
						<h1>Major League Draft</h1>
					</div>
				</div>
				<Draft />
			</LoggedInComponent>
		);
	}
});

export default withRouter(connect(stateToProps)(MajorLeagueDraft));