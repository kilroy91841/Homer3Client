import { get, post } from 'api/axios';

export function getMinorLeagueDraft(success, error) {
	return get('/api/minorLeagueDraft', success, error);
};

export function makePick(pick, success, error) {
	var url = "/minorLeagueDraft/pick";
	return post(
		'/api', 
		{
			url: url,
			data: pick
		},
		success,
		error
	);
};

export function skipPick(pickId, success, error) {
	var url = "/minorLeagueDraft/skip/" + pickId;
	return post(
		'/api', 
		{
			url: url,
			data: {}
		},
		success,
		error
	);
};

export function adminDraft(options, success, error) {
	var url = "/minorLeagueDraft/admin";
	return post(
		'/api',
		{
			url: url,
			data: options
		},
		success,
		error
	);
};