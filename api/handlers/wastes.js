/**
 * Created by valeriy on 03.03.17.
 */
'use strict';

//todo: git push -u
let storage = require('./../storage');

module.exports = {

    GET:function(req, res,  next) {
        res.json(storage.users.data.wastes)
    },

    getByType: function(req, res, next) {
        let wastes = storage.users.data.wastes;
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
        storage.users.data.wastes.push(dataForInsert);
        res.send({
            message: 'All is OK, the waste is added',
            code: 200
        });
    },

    post: function(req, res, next){
        //todo: check if key existing in array
    },

    delete: function (req, res, next) {
        let indexForDelete = parseInt(req.params.id);
        let wastesLength = storage.users.data.wastes.length;
        if (Number.isInteger(indexForDelete) &&
            (indexForDelete < wastesLength) &&
            (indexForDelete >= 0)){
            // todo: slice is not workink
            console.log('index:' + indexForDelete);
            storage.users.data.wastes.splice(indexForDelete,1);
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
