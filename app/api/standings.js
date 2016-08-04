import { get, put, post } from 'api/axios';

export function getStandings(date, success, error) {
	return get('/api/standings?date=' + date, success, error);
};