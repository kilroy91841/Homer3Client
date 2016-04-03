import React from 'react';

import List from 'ui/component/list';

const FinancesRow = React.createClass({
	render: function() {
		return (
			<div key={this.props.data.id} className="row">
				<div className="col-md-2">
					{this.props.data.season}
				</div>
				<div className="col-md-8">
					{this.props.data.draftDollarType.displayText}
				</div>
				<div className="col-md-2">
					{this.props.data.amount}
				</div>
			</div>
		)
	}
});

export default React.createClass({
	render: function() {
		return (
			<List title={"Finances"}>
				<div className="row">
					<div className="col-md-2">
						<i>Season</i>
					</div>
					<div className="col-md-8">
						<i>Type</i>
					</div>
					<div className="col-md-2">
						<i>Amount</i>
					</div>
				</div>
				{
					this.props.data.map(function(finance) {
						return <FinancesRow key={finance.id} data={finance} />
					})
				}
			</List>
		)
	}
});