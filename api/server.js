'use strict';

const parseUrl = require('./components/formatingUrl');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const appConfigs = require('./configs/app');
const routes = require('./routes').api;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function makeUrlWitnEnviroment(prefix, routes) {
    for(let route in routes){
        const parsUrl = parseUrl(prefix, route);
        console.log(`Method: ${parseUrl(prefix, route).method} URL:${parseUrl(prefix, route).url} `);
        app[parsUrl.method](parsUrl.url, routes[route]);
    }
}




let typeEnviroment = appConfigs.environment;
if(typeEnviroment === 'test') {
    makeUrlWitnEnviroment(typeEnviroment, require('./routes').test);
    makeUrlWitnEnviroment('api', require('./routes').api);
} else {
    let logger = require('morgan');
    logger.token('id', function getId(req) {
        return req.id;
    });
    app.use(logger(':id :method :url :status :response-time :date[web]'));
    makeUrlWitnEnviroment('api', require('./routes').api);
}

//uncought errors handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


module.exports = app;

