'use strict';

const parseUrl = require('./components/formattingUrl');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const appConfigs = require('./configs/app');
const routes = require('./routes').api;
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Server'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// @todo:
// What does this function do?
// Does it makes url with environment?
// This name is too long and bring no fucking info about what is it doing
function makeUrlWitnEnviroment(prefix, routes) {
  for (let route in routes) {
    const parsUrl = parseUrl(prefix, route);
    // @todo: WTF is this? Bunyan? Really?
    console.log(`Method: ${parseUrl(prefix, route).method} URL:${parseUrl(prefix, route).url} `);
    app[parsUrl.method](parsUrl.url, routes[route]);
  }
}

makeUrlWitnEnviroment('api', require('./routes').api);
// @todo:
// learn english a bit
// Words order is inverce, should be 'evironmentType'
let typeEnviroment = appConfigs.environment;
if (typeEnviroment == 'test') {
  makeUrlWitnEnviroment(typeEnviroment, require('./routes').test);
}

// uncaught errors handler
app.use(function(err, req, res, next) {
  log.warn('Something is broken!');
  // @todo: WTF is this? Bunyan? Really?
  console.error(err.stack);
  res.status(500).send('Something is broken!');
});

module.exports = app;
