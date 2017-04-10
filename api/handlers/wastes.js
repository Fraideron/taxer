'use strict';
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Wastes'});
const mongodb = require('mongodb');
const assert = require('assert');

module.exports = {

    GET:function(req, res,  next){
        req.model.wastes.find({}).toArray(function(err, items) {
            assert.equal(null, err);
            res.send(items);
        });
    },

    getByType: function(req, res, next) {
        req.model.wastes.find({"type": req.params.type}).toArray(function(err, items) {
            assert.equal(null, err);
            res.send(items);
        });
    },

    put: function(req, res, next){
        req.model.wastes.insertOne(req.body, function (err, result) {
            assert.equal(err, null);
            res.send("Inserted a document into the wastes collection.");
        });
    },

    post: function (req, res, next){
        req.model.wastes.updateDocuments();
    },



    delete: function (req, res, next) {
        req.model.wastes.remove(
            {_id: new mongodb.ObjectID(req.params.id) },
            function (err, result){
                assert.equal(err, null);
                res.send('document is deleted');
            });
        }

};
