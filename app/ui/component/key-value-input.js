import React from 'react';

const KeyValueInput = React.createClass({
	onChange: function(e) {
		this.props.onChange(this.props.keyName, e.target.value);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					{this.props.title}
				</div>
				<div className="col-md-6">
					<input type={this.props.type} onChange={this.onChange}/>
				</div>
			</div>
		);
	}
});

export default KeyValueInput;