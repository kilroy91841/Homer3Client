import { get, post } from 'api/axios';

export function getMinorLeagueDraftHistory(success, error) {
	return get('/api/minorLeagueDraftHistory', success, error);
};