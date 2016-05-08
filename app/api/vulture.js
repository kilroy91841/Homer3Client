import { get, put } from 'api/axios';

export function getVultures(success, error) {
	return get('/api/vulture', success, error);
};

export function getVulturablePlayers() {
	return get('/api/vulture/vulturable');
};

export function createVulture(vultureRequest, success, error) {
	var url = "/vulture";
	return put(
		'/api', 
		{
			url: url,
			data: vultureRequest
		},
		success,
		error
	);
};