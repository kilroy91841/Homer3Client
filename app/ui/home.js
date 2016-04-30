import React from 'react';

import VulturePanel from 'ui/vulture-panel';
import SalaryPanel from 'ui/salary-panel';

export default React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					<VulturePanel/>
				</div>
				<div className="col-md-6">
					<SalaryPanel/>
				</div>
			</div>
		);
	}
})