import React from 'react';
import store from 'store';

export default React.createClass({
	playerClicked: function() {
		store.dispatch({
            type: 'DISPLAY_PLAYER',
            player: this.props.player
        });
	},

	render: function() {
		return (
			<div className="row clickable" onClick={this.playerClicked}>
				{this.props.children}
			</div>
		)
	}
});