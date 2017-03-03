/**
 * Created by valeriy on 03.03.17.
 */
'use strict';

let MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

let id = "58b5b9b1c3bdb025cf8c4d06";

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

        var findDocuments = function(db, callback) {
        // Get the documents collection
            var collection = db.collection('users');

            collection.find({}, { 'data.wastes':1, _id:0}).toArray(function(err, docs) {
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

    },

    put: function(req, res, next){

    },

    post: function(req, res, next) {

    },

    delete: function (res, req, next) {

    }
};
