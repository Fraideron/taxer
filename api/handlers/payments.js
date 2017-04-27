
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

        req.body.bill.forEach(function (bill) {
            console.log(bill);
            const criteria = {_id: new mongodb.ObjectID(req.user)};
            const filter = {
                'data.wastes': 1,
                'data.taxes': 1
            };
            let wastes = {};
            let taxes = {};
            req.model.users.findOne(criteria, filter, function (err, result) {
                assert.equal(null, err);
                wastes = result.data.wastes;
                taxes = result.data.taxes;
                let rate = 0;
                let billType = bill.type;
                let lastWasteId = 0;
                taxes.some(elem => {
                    if (elem.name === billType) {
                        rate = elem.amount;
                        lastWasteId = elem.lastWaste;
                        return true;
                    }
                });


                console.log(`wastes: ${wastes} \n billType  ${billType}`);
                // get unpayed wastes by type for one user
                const criteria = {
                    _id: {$in: wastes},
                    type: billType,
                    rate: {$exists: false}
                };

                req.model.wastes.find(criteria).toArray((err, resultUnpWaste) => {
                    //get last payed elemnt from taxer collection,
                    //and find it in wastes
                    req.model.wastes.find({_id: lastWasteId}).toArray((err, lastWasteinTaxes) => {
                        assert.equal(null, err);
                        resultUnpWaste.unshift(lastWasteinTaxes[0]);

                        let paymentForWastes = paymentPutHelper.scatterPayment(resultUnpWaste,
                            bill.payed);
                        paymentForWastes.forEach(function (elem) {
                            let toUpdate = {
                                'payed': elem.payment,
                                'rate': rate
                            };

                            req.model.wastes.findOneAndUpdate(
                                {_id: new mongodb.ObjectID(elem.waste._id)},
                                {$set: toUpdate},
                                {$new: true},
                                function (err, result) {
                                    assert.equal(err, null);
                                }
                            );
                        });
//коли додаються нові вейти з  типом то їх не бачить

                        let lastWasteId = resultUnpWaste[resultUnpWaste.length-1]._id;
                        console.log(lastWasteId);
                        req.model.users.findOneAndUpdate({
                            _id: new mongodb.ObjectID(req.user),
                            'data.taxes.name': billType
                        },{
                           $set:{'data.taxes.$.lastWaste': new mongodb.ObjectID(lastWasteId)}
                        }, function (err, result) {
                            assert.equal(err, null);
                            console.log(result);
                        })
                    });
                });
            });
        });

        res.json({
            message: 'the waste is updated',
            code: 200
        });
    }
};




