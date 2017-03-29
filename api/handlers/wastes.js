/**
 * Created by valeriy on 03.03.17.
 */
'use strict';

//todo: git push -u
let storage = require('./../storage');
let bodyParser = require('body-parser');

module.exports = {

    GET:function(req, res,  next) {
        res.json(storage.users[0].data.wastes);
    },

    getByType: function(req, res, next) {
        let wastes = storage.users[0].data.wastes;
        var result = wastes.filter(function (value) {
                return (value.type === req.params.type);
            }
        );
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
        res.send({
            message: 'All is OK, the waste is added',
            code: 200
        });
    },

    post: function (req, res, next){
        let options = ['type', 'value', 'date', 'payed', 'rate'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                    storage.users[0].data.wastes[req.params.n][key] = req.body[key];
            }
        };
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
            res.send({
                message: 'All is OK, the waste is deleted',
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
