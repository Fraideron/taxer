'use strict';

const express = require('express');
const app = express();
const routes = require('./routes.js').testRoutes;
// require('./routes.js').testRoutes - for testing
// require('./routes.js').productRoutes - for production


//todo: add a function for different running

for(let route in routes){
    const spl = route.split(' ');
    app[spl[0]](spl[1], routes[route]);
}

module.exports = app;