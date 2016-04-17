import axios from 'axios';

export function acceptTrade(trade) {
	var url = "/trade";
	return axios.post('/api', {
		url: url,
		data: trade
	});
};