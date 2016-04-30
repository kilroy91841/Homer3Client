import React from 'react';

export default React.createClass({
	render: function() {
		return ( 
			<div>
				{
					this.props.hideTitle ? <div/> :
					<div className="row">
						<div className="col-md-12">
							<h2>{this.props.title}</h2>
						</div>
					</div>
				}
				{this.props.children}
			</div>
		)
	}
});