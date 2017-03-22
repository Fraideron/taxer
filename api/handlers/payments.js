/**
 * Created by valeriy on 03.03.17.
 */
'use strict';
let storage = require('./../storage');
module.exports = {
    GET: function (req, res, next) {
        res.json(storage.users.data.payments);
    },

    getByType: function (req, res, next) {
        let filter = req.params.type;
        let payments = storage.users.data.payments[0].bill;
        let result = payments.filter(function (element) {
            return(element.type === filter);
        })
        res.json(result);
    },

    put: function (req, res, next) {
        //коли додавать у пайментс, додати пайд і рате
    }

};