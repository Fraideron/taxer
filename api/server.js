'use strict';

const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes.js').testRoutes;
// require('./routes.js').testRoutes - for testing
// require('./routes.js').productRoutes - for production

//todo: add a 'bodyParser'(express module)
//todo: add a function for different running

logger.token('id', function getId (req) {
    return req.id;
});
app.use(logger(':id :method :url :status :response-time :date[web]'));;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
/*
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true }));
*/

for(let route in routes){
    const spl = route.split(' ');
    app[spl[0]](spl[1], routes[route]);
}



module.exports = app;