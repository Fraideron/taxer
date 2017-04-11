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
            res.send(items);
        });
        log.info('GET request from taxes handler');
    },

    put: function (req, res, next) {
        storage.users[0].data.taxes.push(req.body);
        log.info('PUT request from taxes handler');
        res.send({
            message: 'ok',
            code: 200
        })
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
        log.info('DELETE request from taxes handler');
        let indexForDelete = parseInt(req.params.index);
        let taxesLength = storage.users[0].data.taxes.length;
        if (Number.isInteger(indexForDelete) &&
            (indexForDelete < taxesLength) &&
            (indexForDelete >= 0)){
            console.log('index:' + indexForDelete);
            storage.users[0].data.taxes.splice(indexForDelete,1);
            res.send({
                message: 'All is OK, the taxes is deleted',
                code: 200
            })
        } else {
            res.send({
                message: 'Request is bad',
                code: 500
            })
        }
    }
};