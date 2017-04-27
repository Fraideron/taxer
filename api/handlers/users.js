'use strict';
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Users'});
const mongodb = require('mongodb');
const assert = require('assert');

module.exports = {
    GET: function (req, res, next) {
        req.model.users.find(
            {_id: new mongodb.ObjectID(req.user)},
            {'data':0}).toArray(function(err, items) {
            assert.equal(null, err);
            res.json({
                result: items,
                code: 200
            })
        });

    },



    postUserProfile: function (req, res, next) {
        let body = req.body;
        let setterHash = {};
        for (let key in body) {
            let keyForChange = 'profile.'+ key;
            setterHash[keyForChange] = body[key];
        }
        req.model.users.update({
                _id: new mongodb.ObjectID(req.user)
            },
            {$set: setterHash},
            function (err, result) {
                assert.equal(err, null);
            }
        );
        res.json({
            message: `User profile with _id ${req.user} is updated`,
            code:200
        })
    },


    postUserMeta: function (req, res, next) {
        let body = req.body;
        let setterHash = {};
        for (let key in body) {
            let keyForChange = 'meta.'+ key;
            setterHash[keyForChange] = body[key];
        }
        req.model.users.update({
                _id: new mongodb.ObjectID(req.user)
            },
            {$set: setterHash},
            function (err, result) {
                assert.equal(err, null);
            }
        );
        res.json({
            message: `User meta with _id ${req.user} is updated`,
            code:200
        })
    }
};
