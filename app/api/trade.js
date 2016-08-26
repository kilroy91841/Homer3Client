import { get, post } from 'api/axios';

export function proposeTrade(trade, success, error) {
	var url = "/trade";
	return post('/api', {
		url: url,
		data: trade
	}, success, error);
};

export function getTrades(teamId, success, error) {
	get("/api/trade/team/" + teamId, success, error);
};

export function acceptTrade(tradeId, success, error) {
	var url = "/trade/" + tradeId + "/accept";
	return post('/api', {
		url: url
	}, success, error);
};

export function rejectTrade(tradeId, success, error) {
	var url = "/trade/" + tradeId + "/reject";
	return post('/api', {
		url: url
	}, success, error);
};

export function cancelTrade(tradeId, success, error) {
	var url = "/trade/" + tradeId + "/cancel";
	return post('/api', {
		url: url
	}, success, error);
};