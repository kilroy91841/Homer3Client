/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const host = require('./config').url;
const axios = require('axios');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

app.use('/', express.static(path.join(__dirname, '')));
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/admin/trade', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/*', function(req, res) {
  var url = host.url + req.path.replace('/api', '');
  axios.get(url).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
  });
});

app.put('/api', function(req, res) {
  var url = host.url + req.body.url;
  var data = req.body.data;
  axios.put(url, data).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
  });
});

app.post('/api', function(req, res) {
  var url = host.url + req.body.url;
  var data = req.body.data;
  axios.post(url, data).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
  });
});

app.get('/team/:id', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var start = function() {
  app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
};

module.exports = {
  start: start
};
