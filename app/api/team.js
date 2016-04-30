import axios from 'axios';

export function getTeams() {
	return axios.get('/api/team');
};

export function getFullTeam(id) {
	return axios.get('/api/team/' + id);
};

export function getSalary() {
	return axios.get('/api/team/salary');
};