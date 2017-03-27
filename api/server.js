'use strict';

const parseUrl = require('./components/formatingUrl');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const appConfigs = require('./configs/app');
const routes = require('./routes');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let typeEnviroment = appConfigs.environment;

function makeUrlWitnEnviroment(enviromentType, routes) {
    for(let route in routes){
        const parsUrl = parseUrl(enviromentType, route);
        console.log(`Method: ${parseUrl(enviromentType, route).method} URL:${parseUrl(enviromentType, route).url} `);
        app[parsUrl.method](parsUrl.url, routes[route]);
    }
}

if(typeEnviroment == 'test') {
    let logger = require('morgan');
    logger.token('id', function getId(req) {
        return req.id;
    });
    app.use(logger(':id :method :url :status :response-time :date[web]'));

    for(let keyTypeProd in routes){
        console.log(keyTypeProd);
        makeUrlWitnEnviroment(keyTypeProd, routes[keyTypeProd]);
    }
} else {
    //todo: else variants with enviroments
}




//uncought errors handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


module.exports = app;
