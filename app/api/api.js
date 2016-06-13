import { get, getWithParams, postAnonymous, post } from 'api/axios';

export function getMetadata(success, error) {
	return get('/api/metadata', success, error);
};

export function login(userName, password, success, error) {
	const encodedPassword = btoa(password);
	return postAnonymous(
		'/api', 
		{
			url: "/login",
			data: {
				userName: userName,
				encodedPassword: encodedPassword
			}
		},
		success,
		error
	);
};

export function passwordReset(email, success, error) {
	return getWithParams(
		'/api/passwordReset',
		{
			email: email
		},
		success,
		error
	);
};

export function hasAccess(token, success, error) {
	if (!token) {
		success({
			data: {
				data: false
			}
		});
	} else {
		return getWithParams(
			'/api/hasAccess',
			{
				token: token
			},
			success,
			error
		);
	}
};

export function updateTeam(team, success, error) {
	return post(
		'/api', 
		{
			url: "/team",
			data: team
		},
		success,
		error
	);
};