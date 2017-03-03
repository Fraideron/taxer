'use strict';

const express = require('express');
const app = express();
const routes = require('./routes.js');
// @todo: hook and use routes here

for(let route in routes){
    const spl = route.split(' ');
    app[spl[0]](spl[1], routes[route]);
}

module.exports = app;