import React from 'react';

export default React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					{this.props.title}
				</div>
				<div className="col-md-6">
					{this.props.children}
				</div>
			</div>
		)
	}
});