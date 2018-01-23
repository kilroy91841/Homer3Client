import { get } from 'api/axios';

export function getDraftDollar(id, success, error) {
	return get('/api/draftDollar/' + id, success, error);
};

export function getNextSeasonsDraftDollars(success, error) {
	return get('/api/team/draftDollars/2018', success, error);
};