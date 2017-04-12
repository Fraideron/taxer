'use strict';

const parseUrl = require('./components/formattingUrl');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const appConfigs = require('./configs/app');
const routes = require('./routes').api;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Server'});
const assert = require('assert');

let collections = ['users', 'wastes'];
let model = {};

MongoClient.connect("mongodb://localhost:27017/taxer", function(err, db) {
    if(!err) {
        console.log("We are connected to mongodb");
        collections.forEach(function (element) {
            db.collection(element, function(err, collection) {
                if (err) return void console.error(err);
                model[element] = collection;
            });
        })
    }
});

app.use((req, res, next)=>{
    log.info(`${req.method} ${req.originalUrl}`);
    next();
});

// Connect to the db
app.use(function (req, res, next) {
    req.model = model;
    next();
});

//middleware for hardcoded user
app.use(function (req, res, next) {
    req.user = '58ecae18ae45e78a80a47898';
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function applyRoutes(prefix, routes) {
    for (let route in routes) {
        const parsUrl = parseUrl(prefix, route);
        app[parsUrl.method](parsUrl.url, routes[route]);
        log.info(parsUrl, 'Listening for route');
    }
}

applyRoutes('api', require('./routes').api);
let typeEnviroment = appConfigs.environment;
if (typeEnviroment == 'test') {
    applyRoutes(typeEnviroment, require('./routes').test);
}


// uncaught errors handler
app.use(function(err, req, res, next) {
    log.warn(err.stack, 'Something is broken!');
    res.status(500).json({
        message: 'Something is broken',
        code: 500
    });
});
//todo: make a function which create an object for response
module.exports = app;
