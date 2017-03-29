/**
 * Created by valeriy on 03.03.17.
 */
'use strict';
const storage = require('./../storage');
const paymentPutHelper = require('./../components/paymentsPutHelper')

module.exports = {
    GET: function (req, res, next) {
        res.json(storage.users[0].data.payments);
    },

    getByType: function (req, res, next) {
        let filter = req.params.type;
        let payments = storage.users[0].data.payments[0].bill;
        let result = payments.filter(function (element) {
            return(element.type === filter);
        })
        res.json(result);
    },

    put: function (req, res, next) {
        let time = new Date().toISOString();
        storage.users[0].data.payments.push({
            date: time,
            bill:[
                req.body
            ]
        });

        let paymentForWastes = paymentPutHelper.scatterPayment(paymentPutHelper.getUnpayed('gas'),
            paymentPutHelper.calcTotalWaste(paymentPutHelper.getUnpayed('gas')));
        let unpayedWastes = paymentPutHelper.getUnpayed('gas');

        unpayedWastes.forEach(function (unpWaste, index, array) {
           unpWaste[index]['payment'] = paymentForWastes[index].payment
        });


        res.send({
            message: 'ok',
            code: 200
        })
    }

};