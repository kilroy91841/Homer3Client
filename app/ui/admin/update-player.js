import React from 'react';

import PlayerSearch from 'ui/player-search';
import PositionSelect from 'ui/position-select';
import Store from 'store';

import { updatePlayer } from 'api/player';

const FieldUpdate = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="col-md-6">
					{this.props.oldValue}
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

const UpdatePlayer = React.createClass({
	getInitialState: function() {
		return {
			player: {},
			newFirstName: undefined,
			newLastName: undefined,
			newMlbPlayerId: undefined,
			newPosition: undefined
		};
	},
	onPlayerChange: function(p) {
		this.setState({ 
			player : p, 
			newFirstName : p.firstName, 
			newLastName : p.lastName,
			newMlbPlayerId : p.mlbPlayerId,
			newPosition : p.position
		});
	},
	onFirstNameChange: function(e) {
		this.setState({ newFirstName: e.target.value });
	},
	onLastNameChange: function(e) {
		this.setState({ newLastName: e.target.value });
	},
	onMlbPlayerIdChange: function(e) {
		this.setState({ newMlbPlayerId: e.target.value });
	},
	onPositionChange: function(position) {
		this.setState({ newPosition : position });
	},
	onSubmit: function() {
		var playerToUpdate = $.extend({}, this.state.player);
		playerToUpdate.firstName = this.state.newFirstName;
		playerToUpdate.lastName = this.state.newLastName;
		playerToUpdate.mlbPlayerId = this.state.newMlbPlayerId;
		playerToUpdate.position = this.state.newPosition;

		updatePlayer(playerToUpdate, function(response) {
			alert(response.data.message);
			Store.dispatch({
	            type: 'PUT_PLAYER_IN_MAP',
	            player: response.data.data
	        });
		}, function(error) {
			alert(error.data.message);
		});
	},
	render: function() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-11">
							UPDATE PLAYER
						</div>
						<div className="col-md-1">
							<input type="submit" value="GO!" onClick={this.onSubmit} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<PlayerSearch
								value={this.state.player}
								onChange={this.onPlayerChange}
							/>
						</div>
						<div className="col-md-7">
							<FieldUpdate 
								oldValue={this.state.player.firstName} 
								newValue={this.state.newFirstName} 
								onChange={this.onFirstNameChange} />
							<FieldUpdate 
								oldValue={this.state.player.lastName} 
								newValue={this.state.newLastName} 
								onChange={this.onLastNameChange} />
							<FieldUpdate oldValue={this.state.player.mlbPlayerId}>	
								<input type="number" value={this.state.newMlbPlayerId} onChange={this.onMlbPlayerIdChange} />
							</FieldUpdate>
							<FieldUpdate oldValue={this.state.player.position ? this.state.player.position.name : this.state.player.position} >
								<PositionSelect 
									value={this.state.newPosition}
									onChange={this.onPositionChange} />
							</FieldUpdate>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default UpdatePlayer;