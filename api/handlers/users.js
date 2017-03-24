/**
 * Created by valeriy on 23.03.17.
 */
'use strict';
let storage = require('./../storage');
module.exports = {
    GET: function (req, res, next) {
        res.json({
            profile: storage.users.profile,
            meta: storage.users.meta
        });
    },



    postUserProfile: function (req, res, next) {
        let options = ['name', 'birth'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                storage.users.profile[key] = req.body[key];
            }
        };
        res.send('ok');
    },


    postUserMeta: function (req, res, next) {
        let options = ['login', 'password', 'hash'];
        if (!req.body) return res.sendStatus(400);
        for (let key in req.body){
            if (options.indexOf(key) >= 0){
                storage.users.meta[key] = req.body[key];
            }
        }
        res.send('ok');
    }
}
