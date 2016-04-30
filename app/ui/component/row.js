import React from 'react';

export default React.createClass({
	render: function() {
		var className = "row hoverDiv";
		className += this.props.clickable != "false" ? " clickable" : "";
		return (
			<div className={className} onClick={this.props.onClick}>
				{this.props.children}
			</div>
		);
	}
});