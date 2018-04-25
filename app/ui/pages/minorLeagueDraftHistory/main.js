import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getMinorLeagueDraftHistory } from 'api/history';

const MinorLeagueDraftHistory = React.createClass({
    getInitialState: function() {
		return {
			test: "d"
		}
	},
	componentDidMount: function() {
		var self = this;
		getMinorLeagueDraftHistory(function(resp) {
            self.setState({ test: resp.data.data.test });
            
        }, function(err) {
            console.error(err);
        });
    },
    render: function() {
        return (
          <div>Test Post: {this.state.test}</div>
        );
    }
})

export default withRouter(MinorLeagueDraftHistory);