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
app.use('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/admin/trade', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/vulture', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/minorLeagueDraft', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/profile', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/freeAgentAuction', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/*', function(req, res) {
  var url = host.url + req.path.replace('/api', '');
  var config = getConfig(req);
  axios.get(url, config).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
    res.status(err.status).send(err);
  });
});

app.put('/api', function(req, res) {
  var url = host.url + req.body.url;
  var data = req.body.data;
  var config = getConfig(req);
  axios.put(url, data, config).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
    res.status(err.status).send(err);
  });
});

app.post('/api', function(req, res) {
  var url = host.url + req.body.url;
  var data = req.body.data;
  var config = getConfig(req);
  axios.post(url, data, config).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
    res.status(err.status).send(err);
  });
});

app.get('/team/:id', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const getConfig = function(req) {
  const header = req.get('Authorization');
  var config = {};
  if (header) {
    config['headers'] = { 'Authorization': header };
  }
  config['params'] = req.query;
  return config;
}

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
