'use strict';
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'Users'});

module.exports = {
    GET: function (req, res, next) {
        log.info('GET request from users handler');
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
        log.info('postUserProfile request from users handler');
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
        log.info('postUserMeta request from users handler');
        res.send({
            message: 'ok',
            code: 200
        });
    }
}
