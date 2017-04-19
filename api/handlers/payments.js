
'use strict';
const paymentPutHelper = require('./../components/paymentsPutHelper')
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Payments'});
const mongodb = require('mongodb');
const assert = require('assert');

module.exports = {
    GET: function (req, res, next) {
        req.model.payments.find({}).toArray(
            function(err, items) {
                assert.equal(null, err);
                res.json(items);
            });
    },

    getByType: function (req, res, next) {
        let userIdPayments = {};
        let result = [];
        const criteria = {_id: new mongodb.ObjectID(req.user)};
        const filter = {'data.payments':1};
        req.model.users.find(criteria, filter).toArray(function (err, items) {
            assert.equal(null, err);

            userIdPayments = items;

            let subrequestsAmount = userIdPayments[0].data.payments.length;
            function finalizeRequest(result) {
                subrequestsAmount--;
                if (!subrequestsAmount){
                    if (result.length){
                        res.json(result);
                    } else {
                        res.json({
                            status: 500,
                            message: 'Error, parse "payments by type" data'
                        })
                    }
                }
            }

            userIdPayments[0].data.payments.forEach(function (element) {
                const criteria = {_id: new mongodb.ObjectID(element._id), 'bill.type': req.params.type};
                req.model.payments.find(criteria).toArray(function (err, item) {
                    if(item.length > 0) result.push(item);
                    finalizeRequest(result);
                });
            })
        });
    },

    put: function (req, res, next) {
        let puttingObj = req.body;
        let usersPaymentsObject = {};
        if (puttingObj){
            req.model.payments.insertOne(puttingObj, function (err, result) {
                assert.equal(err, null);
                usersPaymentsObject = {
                    "_id" : puttingObj._id
                };

                //insert _id of the last inserted document in payments collection
                // to the users collection
                req.model.users.update(
                    {_id: new mongodb.ObjectID(req.user)},
                    {$push:{'data.payments': usersPaymentsObject}}, function (err, result) {
                        assert.equal(null, err);
                    });


            });
        }

        let wastes = {};
        let unpayedWastes = {};
        let usersID = {};
        req.model.wastes.find({}).toArray( function (err, result) {
            assert.equal(null, err);
            wastes = result;
        });

        for(let waste in wastes){

        }

        // let unpayedWastes = paymentPutHelper.getUnpayed('gas');
        // let paymentForWastes = paymentPutHelper.scatterPayment(unpayedWastes,
        //     paymentPutHelper.calcTotalWaste(unpayedWastes));




        res.json({
            message:`payments inserted with id: ${puttingObj._id}`,
            code: 200
        });
// unpayedWastes.forEach(function (unpWaste, index, array) {
//     unpWaste[index]['payment'] = paymentForWastes[index].payment
// });
// log.info('PUT request from payments');


    }

};