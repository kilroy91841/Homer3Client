import React from 'react';
import Store from 'store';

import Row from 'ui/component/row';

export default React.createClass({
	playerClicked: function() {
		if (this.props.onClick) {
			this.props.onClick(this.props.player);
		}
		
		Store.dispatch({
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