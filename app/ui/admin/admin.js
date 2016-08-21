import React from 'react';
import { switchPosition } from 'api/player';
import Select from 'react-select';
import { getFullTeam } from 'api/team';

import AdminComponent from 'ui/admin-component';

import CreatePlayer from 'ui/admin/createPlayer';
import UpdatePlayer from 'ui/admin/update-player';
import UpdatePlayerSeason from 'ui/admin/update-player-season';
import PlayerSwitchTeam from 'ui/admin/player-switchTeam';
import PlayerSwitchPosition from 'ui/admin/player-switchPosition';
import PositionSelect from 'ui/position-select';

const Admin = React.createClass({
	render: function() {
		return ( 
			<AdminComponent>
				<div className="row">
					<div className="col-md-12">
						<PlayerSwitchTeam />
						<PlayerSwitchPosition />
						<CreatePlayer />
						<UpdatePlayer />
						<UpdatePlayerSeason />
					</div>
				</div>
			</AdminComponent>
		)
	}
});

export default Admin;