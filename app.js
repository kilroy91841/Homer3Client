/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');

var env = process.env.NODE_ENV || 'local';
var config = require('./config').config(env);
var URI = config.url;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    //res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'application/json');
    next();
});

var getData = function(path, callback) {
	http.get(URI + path, function(data) {
		var output = '';
		data.on('data', function(chunk) {
			output += chunk;
		});
		data.on('end', function() {
			callback(output);
		});
	}).on('error', function(e) {
		console.log(e);
	});
};

app.get('/player', function(req, res) {
	getData('/player', function(data) {
		res.send(data);
	});
});

app.get('/team/:id', function(req, res) {
	getData('/team/' + req.params.id, function(data) {
		res.send(data);
	});
});

app.get('/team', function(req, res) {
	getData('/team', function(data) {
		res.send(data);
	});
});

app.get('/player/search', function(req, res) {
	getData('/player/search?name=' + req.query.name, function(data) {
		res.send(data);
	});
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});