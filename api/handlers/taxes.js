/**
 * Created by valeriy on 03.03.17.
 */
'use strict';
let storage = require('./../storage');

module.exports={
    GET: function (req, res, next) {
        res.json(storage.users.data.taxes);
    },

    put: function (req, res, next) {
        storage.users.data.taxes.push(req.body);

        res.send({
            message: 'ok',
            code: 200
        })
    },

    post: function (req, res, next) {
        let options = ['name', 'type'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                for (let objTaxes in storage.users.data.taxes){
                    for(let elementInObjTaxes in storage.users.data.taxes[objTaxes]){
                        if(req.params.name === storage.users.data.taxes[objTaxes][elementInObjTaxes]){
                            storage.users.data.taxes[objTaxes][key] = req.body[key];
                            console.log(storage.users.data.taxes[objTaxes][elementInObjTaxes]);
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
        let indexForDelete = parseInt(req.params.index);
        let taxesLength = storage.users.data.taxes.length;
        if (Number.isInteger(indexForDelete) &&
            (indexForDelete < taxesLength) &&
            (indexForDelete >= 0)){
            console.log('index:' + indexForDelete);
            storage.users.data.taxes.splice(indexForDelete,1);
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