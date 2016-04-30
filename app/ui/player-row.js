import React from 'react';
import store from 'store';

import Row from 'ui/component/row';

export default React.createClass({
	playerClicked: function() {
		store.dispatch({
            type: 'DISPLAY_PLAYER',
            player: this.props.player
        });
	},

	render: function() {
		return (
			<Row onClick={this.playerClicked}>
				{this.props.children}
			</Row>
		)
	}
});