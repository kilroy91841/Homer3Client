import axios from 'axios';

export function getPlayers() {
	return axios.get('/api/player');
};

export function switchTeam(player, newTeamId) {
	var url = "/player/" + player.id + "/team/" + newTeamId;
	return axios.post('/api', {
		url: url,
		data: {
			season : player.currentSeason.season,
			teamId : player.currentSeason.teamId
		}
	});
};

export function switchPosition(player, newPosition) {
	var url = "/player/" + player.id + "/position/" + newPosition.id;
	return axios.post('/api', {
		url: url,
		data: {
			season : player.currentSeason.season,
			fantasyPosition: player.currentSeason.fantasyPosition
		}
	});
};

export function createPlayer(player) {
	var url = "/player";
	return axios.put('/api', {
		url: url,
		data: player
	});
};

export function updatePlayer(player) {
	var url = "/player";
	return axios.post('/api', {
		url: url,
		data: player
	});
};