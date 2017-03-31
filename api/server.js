'use strict';

const parseUrl = require('./components/formatingUrl');
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

function makeUrlWitnEnviroment(prefix, routes) {
    for (let route in routes) {
        const parsUrl = parseUrl(prefix, route);
        console.log(`Method: ${parseUrl(prefix, route).method} URL:${parseUrl(prefix, route).url} `);
        app[parsUrl.method](parsUrl.url, routes[route]);
    }
}

makeUrlWitnEnviroment('api', require('./routes').api);

let typeEnviroment = appConfigs.environment;
if (typeEnviroment == 'test') {
    makeUrlWitnEnviroment(typeEnviroment, require('./routes').test);
}

//uncaught errors handler
app.use(function(err, req, res, next) {
    log.warn('Something is broken!');
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

module.exports = app;
