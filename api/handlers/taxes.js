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

    },

    post: function (req, res, next) {

    },

    delete: function (req, res, next) {

    }
};