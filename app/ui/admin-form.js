import React from 'react';

import RadioGroup from 'react-radio-group';
import KeyValueInput from 'ui/component/key-value-input';

const AdminForm = React.createClass({
	getInitialState: function() {
		var state = {
			selectedValue: undefined,
			deadlineUTC: undefined
		};
		this.props.radioButtons.forEach(function(rb) {
			state[rb.name] = false;
		});
		return state;
	},
	onChange: function(key, val) {
		var newState = {};
		newState[key] = val;
		this.setState(newState);
	},
	radioSelect: function(value) {
		var newState = $.extend({}, this.state);
		newState.selectedValue = value;
		for(var prop in newState) {
			if (newState.hasOwnProperty(prop) && newState[prop] === true) {
				newState[prop] = false;
			}
		}
		newState[value] = true;
		console.log(newState);
		this.setState(newState);
	},
	render: function() {
		var radioButtons = this.props.radioButtons;
		var keyValueInputs = this.props.keyValueInputs;
		var self = this;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Admin</h2>
						</div>
					</div>
					<RadioGroup name="admin" selectedValue={this.state.selectedValue} onChange={this.radioSelect}>
						{Radio => (
							<div className="row">
								<div className="col-md-12">
								{
									radioButtons.map(function(rb, ix) {
										return (
											<div key={ix} className="row">
												<div className="col-md-12">
													<Radio value={rb.name}/>{rb.displayName}
												</div>
											</div>
										)
									})
								}
								</div>
							</div>
						)}
					</RadioGroup>
					<div className="row">
						<div className="col-md-12">
							{
								this.props.includeDeadline ?
								<KeyValueInput title="New Date In Millis" type="number" keyName="deadlineUTC" onChange={this.onChange} />
								:
								null
							}
							{
								keyValueInputs.map(function(kvi, ix) {
									return (
										<KeyValueInput 
											key={ix}
											title={kvi.title} 
											type={kvi.inputType} 
											keyName={kvi.keyName} 
											onChange={self.onChange} />
									)
								})
							}
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<input type="submit" value="TAKE ACTION" onClick={() => this.props.doAdmin(this.state)} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default AdminForm;