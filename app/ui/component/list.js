import React from 'react';

export default React.createClass({
	render: function() {
		return ( 
			<div>
				{
					this.props.hideTitle ? <div/> :
					<div className="row">
						<div className="col-md-12">
							<h3>{this.props.title}</h3>
						</div>
					</div>
				}
				{this.props.children}
			</div>
		)
	}
});