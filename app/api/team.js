import { get, put, post } from 'api/axios';

export function getTeams(success, error) {
	return get('/api/team', success, error);
};

export function getFullTeam(id, success, error) {
	return get('/api/team/' + id, success, error);
};

export function getSalary(success, error) {
	return get('/api/team/salary', success, error);
};

export function getMinorLeaguers(id, success, error) {
	return get('/api/team/' + id + '/players?onlyMinorLeaguers=true', success, error);
};