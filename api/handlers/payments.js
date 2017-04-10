
'use strict';
const paymentPutHelper = require('./../components/paymentsPutHelper')
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Payments'});

module.exports = {
    GET: function (req, res, next) {
        res.json(storage.users[0].data.payments);
        log.info('GET request from payments');
    },

    getByType: function (req, res, next) {
        const filter = req.params.type;
        const payments = storage.users[0].data.payments[0].bill;
        let result = payments.filter(function (element) {
            return(element.type === filter);
        })
        log.info('GET ByType request from payments');

        res.json(result);
    },

    put: function (req, res, next) {      
        storage.users[0].data.payments.push({
            date:  new Date().toISOString(),
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
        log.info('PUT request from payments');

        res.send({
            message: 'ok',
            code: 200
        })
    }

};