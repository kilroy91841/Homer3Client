import React from 'react';
import { switchPosition } from 'api/player';
import Select from 'react-select';
import { getFullTeam } from 'api/team';

import CreatePlayer from 'ui/admin/createPlayer';
import UpdatePlayer from 'ui/admin/update-player';
import PlayerSwitchTeam from 'ui/admin/player-switchTeam';
import PlayerSwitchPosition from 'ui/admin/player-switchPosition';
import PositionSelect from 'ui/position-select';

const Admin = React.createClass({
	render: function() {
		return ( 
			<div className="row">
				<div className="col-md-12">
					<PlayerSwitchTeam />
					<PlayerSwitchPosition />
					<CreatePlayer />
					<UpdatePlayer />
				</div>
			</div>
		)
	}
});

export default Admin;