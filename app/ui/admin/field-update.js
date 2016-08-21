import React from 'react';

const FieldUpdate = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					{this.props.label + ": " + this.props.oldValue}
				</div>
				<div className="col-md-6">
				{
					this.props.children ?
					this.props.children :
					<input type="text" value={this.props.newValue} onChange={this.props.onChange}/>
				}
				</div>
			</div>
		)
	}
});

export default FieldUpdate;