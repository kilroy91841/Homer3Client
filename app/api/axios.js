import axios from 'axios';

const getConfig = function() {
	var headers = {};
	if (localStorage.getItem('user')) {
		headers['Authorization'] = JSON.parse(localStorage.getItem('user')).token; 
	}
	return { headers : headers };
};

const getMissingAuthError = function() {
	return {
		data: {
			message : "You do not have permission to perform that request"
		}
	};
};

export function getWithParams(url, params, success, error) {
	return axios.get(url, {
		params: params
	}, success, error);
};

export function get(url, success, error) {
	return axios.get(url).then(success).catch(error);
};

export function getSecure(url, success, error) {
	const config = getConfig();
	if (!config.headers['Authorization']) {
		error(getMissingAuthError());
		return;
	}
	axios.get(url, config).then(success).catch(error);
};

export function post(url, data, success, error) {
	const config = getConfig();
	if (!config.headers['Authorization']) {
		error(getMissingAuthError());
		return;
	}
	axios.post(url, data, config).then(success).catch(error);
};

export function postAnonymous(url, data, success, error) {
	axios.post(url, data).then(success).catch(error);
};

export function put(url, data, success, error) {
	const config = getConfig();
	if (!config.headers['Authorization']) {
		error(getMissingAuthError());
		return;
	}
	axios.put(url, data, config).then(success).catch(error);
};