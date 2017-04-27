'use strict';
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Taxes'});
const mongodb = require('mongodb');
const assert = require('assert');

module.exports={
    GET: function (req, res, next) {
        req.model.users.update(
            {_id: new mongodb.ObjectID(req.user)},
            {'data.taxes':1}).toArray(function(err, items) {
            assert.equal(null, err);
            res.send(items);
        });
        log.info('GET request from taxes handler');
    },

    put: function (req, res, next) {
        req.model.users.update(
            {_id: new mongodb.ObjectID(req.user)},
            {$push:{'data.taxes': req.body}}, function (err, result) {
                assert.equal(null, err);
                res.send('Iserted document with _id: ' + result);
            });
        //todo: add inserted _id
    },

    post: function (req, res, next) {
        log.info('POST request from taxes handler');
        let options = ['name', 'type'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                for (let objTaxes in storage.users[0].data.taxes){
                    for(let elementInObjTaxes in storage.users[0].data.taxes[objTaxes]){
                        if(req.params.name === storage.users[0].data.taxes[objTaxes][elementInObjTaxes]){
                            storage.users[0].data.taxes[objTaxes][key] = req.body[key];
                            console.log(storage.users[0].data.taxes[objTaxes][elementInObjTaxes]);
                        }
                    }
                }
            };
        }
        res.send({
            message: 'ok',
            code: 200
        });
    },

    delete: function (req, res, next) {
        req.model.users.update(
            {_id: new mongodb.ObjectID(req.user)},
            {$set:{'data.taxes':{'name':req.body.name}}},
            function (err, result){
                assert.equal(err, null);
                log.info('Document removed from users collection')
            });
        res.send('Document removed with id: ' + req.body.name);
    }
};