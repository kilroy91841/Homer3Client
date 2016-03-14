exports.config = function(env) {
	if (env == 'local') {
		return {
			url: 'http://localhost:1234'
		};
	} else if (env == 'production') {
		return {
			url: 'http://52.28.203.70'
		}
	} else {
		return {
			url: ''
		}
	}
}