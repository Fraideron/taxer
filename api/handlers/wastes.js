'use strict';
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Wastes'});
const db = require('./../server');
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
        const options = ['type', 'value', 'date', 'payed', 'rate'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                storage.users[0].data.wastes[req.params.n][key] = req.body[key];
            }
        };
        log.info('POST request from wastes handler');
        res.send({
            code: '200',
            message: 'ok'
        });
    },



    delete: function (req, res, next) {
        let indexForDelete = parseInt(req.params.id);
        let wastesLength = storage.users[0].data.wastes.length;
        if (Number.isInteger(indexForDelete) &&
            (indexForDelete < wastesLength) &&
            (indexForDelete >= 0)){
            console.log('index:' + indexForDelete);
            storage.users[0].data.wastes.splice(indexForDelete,1);
            log.info('DELETE request from wastes handler');
            res.send({
                message: 'All is OK, the waste is deleted',
                code: 200
            })
        } else {
            log.warn('DELETE request is bad from wastes handler');
            res.send({
                message: 'Request is bad',
                code: 500
            })
        }
    }

};
