'use strict';
let MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/taxer", function(err, db) {
    if(!err) {
        console.log("We are connected to mongodb");
    }
    module.exports = db;
});

