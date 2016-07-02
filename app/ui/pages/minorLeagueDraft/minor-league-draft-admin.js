import React from 'react';
import Moment from 'moment-timezone';
import { adminDraft } from 'api/minorLeagueDraft';
import RadioGroup from 'react-radio-group';

import KeyValueInput from 'ui/component/key-value-input';

const MinorLeagueDraftAdmin = React.createClass({
	getInitialState: function() {
		return {
			undoPick: false,
    		reschedulePick: false,
    		assignPlayerToPick: false,
			deadlineUtc: undefined,
			skipPick: false,
			stopSkipper: false,
			swapPicks: false,
			pickId1: undefined,
			pickId2: undefined,
    		playerId: undefined,
    		selectedValue: undefined
		};
	},
	onChange: function(key, val) {
		var newState = {};
		newState[key] = val;
		this.setState(newState);
	},
	radioSelect: function(value) {
		var newState = $.extend({}, this.state);
		newState.selectedValue = value;
		newState.undoPick = false;
		newState.reschedulePick = false;
		newState.assignPlayerToPick = false;
		newState.skipPick = false;
		newState.stopSkipper = false;
		newState.swapPicks = false;
		newState[value] = true;
		this.setState(newState);
	},
	getText: function() {
		if (this.state.undoPick) {
			return "Undoing pick " + this.props.pickId;
		} else if (this.state.reschedulePick) {
			var timeText = this.state.deadlineUtc != undefined ?
					Moment(Number(this.state.deadlineUtc)).calendar() :
					"some as-yet-unknown time";
			return "Rescheduling pick " + this.props.pickId + " for " + timeText;
		} else if (this.state.assignPlayerToPick) {
			return "Assinging pick " + this.props.pickId + " player " + this.state.playerId;
		} else if (this.state.skipPick) {
			return "Skipping pick " + this.props.pickId;
		} else if (this.state.stopSkipper) {
			return "Stopping the skipper";
		} else if (this.state.swapPicks) {
			return "Swapping picks " + this.state.pickId1 + " and " + this.state.pickId2 + " (reference: pickId=" + this.props.pickId + ")";
		} else {
			return "No actions yet";
		}
	},
	doAction: function() {
		var self = this;
		var options = $.extend({}, this.state);
		options.pickId = this.props.pickId;
		if (options.deadlineUtc) {
			options.deadlineUtc = { millis : options.deadlineUtc };
		}
		adminDraft(options, function(response) {
			alert(response.data.message);
			var newDraft = response.data.data;
			if (newDraft) {
				self.props.resetDraft(newDraft);
			}
		}, function(error) {
			alert(error.message);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Admin</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							{ this.getText() }
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<RadioGroup name="adminDraft" selectedValue={this.state.selectedValue} onChange={this.radioSelect}>
								{Radio => (
									<div className="row">
										<div className="col-md-12">
											<div className="row">
												<div className="col-md-12">
													<Radio value="undoPick"/>Undo Pick
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<Radio value="reschedulePick"/>Reschedule Pick
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<Radio value="assignPlayerToPick"/>Assign Player To Pick
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<Radio value="skipPick"/>Skip Pick
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<Radio value="stopSkipper"/>Stop Skipper
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<Radio value="swapPicks"/>Swap Picks
												</div>
											</div>
										</div>
									</div>
								)}
							</RadioGroup>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<KeyValueInput title="Player Id" type="number" keyName="playerId" onChange={this.onChange} />
							<KeyValueInput title="New Date In Millis" type="number" keyName="deadlineUtc" onChange={this.onChange} />
							<KeyValueInput title="Pick 1 to Swap" type="number" keyName="pickId1" onChange={this.onChange} />
							<KeyValueInput title="Pick 2 to Swap" type="number" keyName="pickId2" onChange={this.onChange} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<input type="submit" value="TAKE ACTION" onClick={this.doAction} />
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default MinorLeagueDraftAdmin;