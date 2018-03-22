export function isLoggedIn() {
	return localStorage.getItem('user');
}

export function teamId() {
	if (isLoggedIn()) {
		return JSON.parse(localStorage.getItem('user')).teamId;
	} else {
		return null;
	}
}

export function getUser() {
	if (isLoggedIn()) {
		return JSON.parse(localStorage.getItem('user'));
	} else {
		return {};
	}
}

export function token() {
	if (isLoggedIn()) {
		return JSON.parse(localStorage.getItem('user')).token;	
	} else {
		return null;
	}
}

export function isAdmin() {
	if (isLoggedIn()) {
		return JSON.parse(localStorage.getItem('user')).admin;	
	} else {
		return false;
	}	
}

export function removeUser() {
	return localStorage.removeItem('user');
}

export function isOffseason() {
	return false;
}