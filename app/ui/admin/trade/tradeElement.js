import React from 'react';
import { getTradeElementText } from 'ui/admin/trade/tradeHelper';

export default React.createClass({
	removeTradeElement: function() {
		this.props.tradeElementRemoved(this.props.data);
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
						{getTradeElementText(this.props.data)}
						{" "}
						<input type="submit" onClick={this.removeTradeElement} value="REMOVE" />
				</div>
			</div>
		)
	}
});