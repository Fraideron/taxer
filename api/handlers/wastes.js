'use strict';

let MongoClient = require('./../mongoClient');
let bodyParser = require('body-parser');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Wastes'});


module.exports = {

    GET:function(req, res,  next) {
        log.info('GET request from wastes handler');
        res.json(storage.users[0].data.wastes);
    },

    getByType: function(req, res, next) {
        let wastes = storage.users[0].data.wastes;
        var result = wastes.filter(function (value) {
                return (value.type === req.params.type);
            }
        );
        log.info('getByType request from wastes handler');
        res.json(result);
    },

    put: function(req, res, next){
        let dataForInsert = {
                "type" : "oil",
                "value" : 133,
                "date" : "2017-03-18",
                "payed" : 40,
                "rate" : 4
        };
        storage.users[0].data.wastes.push(dataForInsert);
        log.info('PUT request from wastes handler');
        res.send({
            message: 'All is OK, the waste is added',
            code: 200
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
