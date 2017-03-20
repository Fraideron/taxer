/**
 * Created by valeriy on 03.03.17.
 */
'use strict';

let MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

module.exports = {
    // Set up the connection to the local db
    // Retrieve
    GET:function(req, res,  next) {

        var url = 'mongodb://localhost:27017/taxer';
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            findDocuments(db, function() {
                db.close();
            });

        });
        //todo: add filter for only one user(by id)

        var findDocuments = function(db, callback) {
        // Get the documents collection
            var collection = db.collection('users');

            collection.find({}, { 'data.wastes':1 }).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs)

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(docs, null, 4));
                callback(docs);
            });
        };


    },

    getByType: function(req, res, next) {
        res.send(req.params.type);

/*
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
            var collection = db.collection('users');

            collection.find({}, { 'data.wastes':1, _id:0}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs)

                res.setHeader('Content-Type', 'application/json');
                //res.send(JSON.stringify(docs, null, 4));
                //callback(docs);
            });
        };*/

    },

    put: function(req, res, next){
        //require node modules (see package.json)
        var MongoClient = require('mongodb').MongoClient
            , format = require('util').format;

        //connect away
        MongoClient.connect('mongodb://127.0.0.1:27017/taxer', function(err, db) {
            if (err) throw err;
            console.log("Connected to Database");

            //simple json record
            var document = {
                    "login" : [],
                    "data" : {
                    "payments" : [
                        {
                            "date" : "20170218",
                            "bill" : [
                                {
                                    "type" : "gas",
                                    "expected" : 123,
                                    "payed" : 125
                                },
                                {
                                    "type" : "electricity",
                                    "payed" : 125
                                }
                            ]
                        }
                    ],
                        "wastes" : [
                        {
                            "type" : "gas",
                            "value" : 123,
                            "date" : "2017-02-18"
                        },
                        {
                            "type" : "gas",
                            "value" : 133,
                            "date" : "2017-03-18",
                            "payed" : 40,
                            "rate" : 4
                        },
                        {
                            "type" : "gas",
                            "value" : 143,
                            "date" : "2017-04-18",
                            "payed" : 0,
                            "rate" : 0
                        }
                    ],
                        "taxes" : [
                        {}
                    ]
                }
            };

            //insert record
            db.collection('users').insert(document, function(err, records) {
                if (err) throw err;
                res.send('Document inserted');

            });
        });

    },

    post: function(req, res, next) {

    },

    delete: function (res, req, next) {
        let id = "58cfb4e2e84af1437d49d68a";
//todo: delete element in array by index
        // Use connect method to connect to the server
            MongoClient.connect('mongodb://localhost/taxer', function(err, db) {
                db.collection('users').remove(document, function(err, records) {
                    if (err) throw err;
                    res.send('Document inserted');
                });
            });

    }
};
