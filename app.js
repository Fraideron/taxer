var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
"use strict"

var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL

app.get('/entries', function (req, res) {
    var url = 'mongodb://localhost:27017/taxer';
// Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        findDocuments(db, function() {
            db.close();
        });

    });
    var json = '';
    var findDocuments = function(db, callback) {
// Get the documents collection
        var collection = db.collection('main');
// Find some documents
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(docs, null, 4));
            callback(docs);
        });
    };

});

app.get('/entries/:type', function(req, res) {
    var taxType = req.params.type;

    var url = 'mongodb://localhost:27017/taxer';
// Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        findDocuments(db, function() {
            db.close();
        });

    });

    var findDocuments = function(db, callback) {
// Get the documents collection
        var collection = db.collection('main');
// Find some documents
        collection.find({type: taxType}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(docs, null, 4));
            callback(docs);
        });
    };

});


app.put('/insert', function(req, res) {


    var testDoc =  {
        timestamp: 12334,
        value: 43,
        type: "gas",
        tax: 24
    };


    var url = 'mongodb://localhost:27017/taxer';
    MongoClient.connect(url, function (err, db) {
        assert.equal(null,err);
        db.collection('main').insertOne( testDoc, function(err, result){
            assert.equal(null,err);
            console.log('Item inserted');
            db.close();
        });
    })
    res.send('All is good!');
});



app.put('/update', function(req, res) {
    var url = 'mongodb://localhost:27017/taxer';
    MongoClient.connect(url, function (err, db) {
        assert.equal(null,err);
        var collection = db.collection('main');
        collection.updateMany({type: 'gas'}, {$set:{type: 'oil'}});
        db.close();
    });
    res.send('All is good!');
});




var server = app.listen(8082, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

})
module.exports = app;
