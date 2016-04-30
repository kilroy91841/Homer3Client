const isDeveloping = process.env.NODE_ENV !== 'production';

var urlFunc = function() {
	if (isDeveloping) {
		return {
			url: 'http://localhost:1234'
			//url: 'http://localhost:10080'
		};
	} else {
		return {
			url: 'http://api.homeratthebat.com'
		}
	}
}

module.exports = {
	url : urlFunc()
}