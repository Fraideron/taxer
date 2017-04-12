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
        });
    },

    post: function (req, res, next){
        req.model.wastes.update(
            {_id: new mongodb.ObjectID(req.params.id)},
            {$set: req.body},
            {},
            function (err, result) {
                assert.equal(err, null);
            }
        );
        res.send(`Document with _id ${req.params.id} is updated`)
    },

    
    delete: function (req, res, next) {
        req.model.wastes.remove(
            {_id: new mongodb.ObjectID(req.params.id)},
            function (err, result){
                assert.equal(err, null);
            });

        req.model.users.update(
            {_id: new mongodb.ObjectID(req.user)},
            {$pull:{'data.wastes':{_id: new mongodb.ObjectID(req.params.id)}}},
            function (err, result){
                assert.equal(err, null);
            });
        res.send('Document removed with id: ' + req.params.id);
    }


};
