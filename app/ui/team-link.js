import React from 'react';
import Store from 'store';


import { Link } from 'react-router';

export default React.createClass({
	startProgress: function() {
		Store.dispatch({
            type: 'PROGRESS_BAR',
            progressBar: {
            	percent : 20
            }
        });
	},
	render: function() {
		if (this.props.team) {
			return (
				<Link onClick={this.startProgress} to={"/team/" + this.props.team.id} title={this.props.team.owner1}>
	            	{this.props.team.name}
	            </Link>
			)
		} else {
			return ( <div>Free Agency</div>)
		}
	}
})