exports.config = function(env) {
	if (env == 'local') {
		return {
			url: 'http://localhost:1234'
			//url: 'http://localhost:10080'
		};
	} else if (env == 'production') {
		return {
			url: 'http://api.homeratthebat.com'
		}
	} else {
		return {
			url: ''
		}
	}
}