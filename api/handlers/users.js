/**
 * Created by valeriy on 23.03.17.
 */
'use strict';
let storage = require('./../storage');
module.exports = {
    GET: function (req, res, next) {
        res.json({
            profile: storage.users[0].profile,
            meta: storage.users[0].meta
        });
    },



    postUserProfile: function (req, res, next) {
        let options = ['name', 'birth'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                storage.users[0].profile[key] = req.body[key];
            }
        };
        res.send({
            message: 'ok',
            code: 200
        });
    },


    postUserMeta: function (req, res, next) {
        let options = ['login', 'password', 'hash'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                storage.users[0].meta[key] = req.body[key];
            }
        }
        res.send({
            message: 'ok',
            code: 200
        });
    }
}
