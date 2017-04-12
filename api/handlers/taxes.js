'use strict';
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Taxes'});
const mongodb = require('mongodb');
const assert = require('assert');

module.exports={
    GET: function (req, res, next) {
        req.model.users.find(
            {_id: new mongodb.ObjectID(req.user)},
            {'data.taxes':1}).toArray(function(err, items) {
            assert.equal(null, err);
            res.json({
                message: 'GET method for taxes',
                code: 200
            })
        });
    },

    put: function (req, res, next) {
        req.model.users.update(
            {_id: new mongodb.ObjectID(req.user)},
            {$push:{'data.taxes': req.body}}, function (err, result) {
                assert.equal(null, err);
                res.json({
                    message: 'inserted document to taxes',
                    code: 200
                });
            });
    },

    post: function (req, res, next) {
        let body = req.body;
        let setterHash = {};
        for (let key in body) {
            let keyForChange = 'data.taxes.$.'+ key;
            setterHash[keyForChange] = body[key];
        }
        req.model.users.update({
                _id: new mongodb.ObjectID(req.user),
                'data.taxes.id': +req.params.id
            },
            {$set: setterHash},
            function (err, result) {
                assert.equal(err, null);
            }
        );
        res.json({
            message: `Document with _id ${req.params.id} is updated`,
            code:200
        })
    },

    delete: function (req, res, next) {
        req.model.users.update({
                _id: new mongodb.ObjectID(req.user),
                'data.taxes.id': +req.params.id
            },
            {$set: {'data.taxes.$.status': 'deleted'}},
            function (err, result){
                assert.equal(err, null);
                res.json({
                    message: `Document removed with id: ${req.params.id}`,
                    code:200
                })
        });
    }
};