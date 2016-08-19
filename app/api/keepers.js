import { get, post } from 'api/axios';

export function getKeepers(teamId, success, error) {
	return get('/api/keepers/' + teamId, success, error);
};

export function saveKeepers(teamId, keepers, success, error) {
	var url = "/keepers/" + teamId;
	return post(
		'/api', 
		{
			url: url,
			data: keepers
		},
		success,
		error
	);
};