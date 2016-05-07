import { get, put, post } from 'api/axios';

export function getPlayers(success, error) {
	return get('/api/player', success, error);
};

export function getVulturablePlayers() {
	return get('/api/player/vulturable');
};

export function switchTeam(player, newTeamId, success, error) {
	var url = "/player/" + player.id + "/team/" + newTeamId;
	return post(
		'/api', 
		{
			url: url,
			data: {
				season : player.currentSeason.season,
				teamId : player.currentSeason.teamId
			}
		},
		success,
		error
	);
};

export function switchPosition(player, newPosition, success, error) {
	var url = "/player/" + player.id + "/position/" + newPosition.id;
	return post(
		'/api', 
		{
			url: url,
			data: {
				season : player.currentSeason.season,
				fantasyPosition: player.currentSeason.fantasyPosition
			}
		},
		success,
		error
	);
};

export function createPlayer(player, success, error) {
	var url = "/player";
	return put(
		'/api', 
		{
			url: url,
			data: player
		},
		success,
		error
	);
};

export function updatePlayer(player, success, error) {
	var url = "/player";
	return post(
		'/api', 
		{
			url: url,
			data: player
		},
		success,
		error
	);
};