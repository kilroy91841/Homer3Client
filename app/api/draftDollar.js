import { get } from 'api/axios';

export function getDraftDollar(id, success, error) {
	return get('/api/draftDollar/' + id, success, error);
};