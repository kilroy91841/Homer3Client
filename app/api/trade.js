import { post } from 'api/axios';

export function acceptTrade(trade, success, error) {
	var url = "/trade";
	return post('/api', {
		url: url,
		data: trade
	}, success, error);
};