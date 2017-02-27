import { get, post } from 'api/axios';

export function draftPlayer(playerId, teamId, salary, success, error) {
	var url = "/majorLeagueDraft";
	return post(
		'/api', 
		{
			url: url,
			data: {
				playerId : playerId,
				teamId : teamId,
				salary : salary
			}
		},
		success,
		error
	);
};

export function getPlayers(success, error) {
	return get('/api/majorLeagueDraft/players', success, error);
};

export function getDraftDollars(success, error) {
	return get('/api/majorLeagueDraft/draftDollars', success, error);
};

export function setCurrentPlayer(playerId, success, error) {
	return get('/api/majorLeagueDraft/currentPlayer/' + playerId, success, error);
};