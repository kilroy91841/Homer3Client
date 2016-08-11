import React from 'react';

import List from 'ui/component/list';
import Row from 'ui/component/row';

import DraftDollarRow from 'ui/draft-dollar-row';

const FinancesRow = React.createClass({
	render: function() {
		return (
			<DraftDollarRow draftDollarId={this.props.data.id}>
				<div className="col-md-2">
					{this.props.data.season}
				</div>
				<div className="col-md-8">
					{this.props.data.draftDollarType.displayText}
				</div>
				<div className="col-md-2">
					{this.props.data.amount}
				</div>
			</DraftDollarRow>
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