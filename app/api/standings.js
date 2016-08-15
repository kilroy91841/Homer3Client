import { get, put, post } from 'api/axios';

export function getStandings(date, success, error) {
	var url = '/api/standings';
	if (date) {
		url += '?date=' + date;
	}
	return get(url, success, error);
};

export function getStandingsBetween(start, end, success, error) {
	var url = '/api/standings/between?start=' + start + '&end=' + end;
	return get(url, success, error);
};

export function getAllStandings(success, error) {
	return get('/api/standings/all', success, error);
};