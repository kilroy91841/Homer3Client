import axios from 'axios';

export function getPlayers() {
	return axios.get('/api/player');
};