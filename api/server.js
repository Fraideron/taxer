'use strict';

const parseUrl = require('./components/formatingUrl');
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
let userID = new mongo.ObjectID('58e4e4b2bb31a671885209a6');

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

function makeUrlWitnEnviroment(prefix, routes) {
    for (let rout in routes) {
        const parsUrl = parseUrl(prefix, rout);
        console.log(`Method: ${parsUrl.method} URL:${parsUrl.url} \n function: ${routes[rout]}`);
        app[parsUrl.method](parsUrl.url, routes[rout]);
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
