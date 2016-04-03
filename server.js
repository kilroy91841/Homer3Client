/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const host = require('./config').url;
const axios = require('axios');

app.use('/', express.static(path.join(__dirname, '')));
// app.use('*', express.static(path.join(__dirname, '')));

app.get('/api/*', function(req, res) {
  var url = host.url + req.path.replace('/api', '');
  axios.get(url).then(function(response) {
    res.send(response.data);
  }).catch(function(err) {
    console.error(err);
  });
});

app.get('/team/:id', function(req, res) {
  res.redirect('/');
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
