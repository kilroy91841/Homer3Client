import { get, put, post } from 'api/axios';

export function getAuctions(success, error) {
	return get('/api/freeAgentAuction', success, error);
};

export function requestFreeAgentAuction(view, success, error) {
	var url = '/freeAgentAuction/request';
	return put(
		'/api',
		{
			url: url,
			data: view
		},
		success,
		error
	);
};

export function admin(view, success, error) {
	var url = '/freeAgentAuction/admin';
	return post(
		'/api',
		{
			url: url,
			data: view
		},
		success,
		error
	);
};

export function bid(view, success, error) {
	var url = '/freeAgentAuction/bid';
	return post(
		'/api',
		{
			url: url,
			data: view
		},
		success,
		error
	);
};

export function getFreeAgentAuctionDollar(teamId, success, error) {
	return get('/api/draftDollar/' + teamId, success, error);
};