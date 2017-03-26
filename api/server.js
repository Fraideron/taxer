'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const appConfigs = require('./configs/app');


let routes = null;
let logger = null;
if(appConfigs.environment === 'prod'){
    logger = require('morgan');

    logger.token('id', function getId (req) {
        return req.id;
    });
    app.use(logger(':id :method :url :status :response-time :date[web]'));;

    routes = require('./routes.js').productRoutes;
} else if (appConfigs.environment === 'test'){
    routes = require('./routes.js').productRoutes;
    routes += require('./routes.js').testRoutes;
}



// require('./routes.js').testRoutes - for testing
// require('./routes.js').productRoutes - for production

//todo: add a 'bodyParser'(express module)
//todo: add a function for different running

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


for(let route in routes){
    const spl = route.split(' ');
    const ver = appConfigs.version;
    const url = '/api/v' + ver + spl[1];
    console.log(url);
    app[spl[0]](url, routes[route]);
}



module.exports = app;