'use strict';
// -------------------------------------------------------------------- handlers importing wrapper
const _routesDir = 'handlers';
// @todo: fraideron, check if you understand what is going on
const handler = name => {
    const path = `./${_routesDir}/${name}`;
    return require(path);
};

// -------------------------------------------------------------------- handlers list
module.exports = {
    productRoutes: {
        'get /user': handler('users').GET,
        'post /user/profile': handler('users').postUserProfile,
        'post /user/meta': handler('users').postUserMeta,
        'get /wastes': handler('wastes').GET,
        'get /wastes/:type': handler('wastes').getByType,
        'put /wastes': handler('wastes').put,
        'post /wastes/:n': handler('wastes').post,
        'delete /wastes/:id': handler('wastes').delete,
        'get /taxes': handler('taxes').GET,
        'put /taxes': handler('taxes').put,
        'post /taxes/:type': handler('taxes').post,
        'delete /taxes/:type': handler('taxes').delete,
        'get /payments': handler('payments').GET,
        'get /payments/:type': handler('payments').getByType,
        'put /payments/:type': handler('payments').put
    },

    testRoutes:{
        'get /user': handler('users').GET,
        'get /user/profile': handler('users').getUserProfile,
        'post /user/profile': handler('users').postUserProfile,
        'get /user/meta': handler('users').getUserMeta,
        'post /user/meta': handler('users').postUserMeta,
        'get /wastes': handler('wastes').GET,
        'get /wastes/:type': handler('wastes').getByType,
        'put /wastes': handler('wastes').put,
        'post /wastes/:n': handler('wastes').post,
        'delete /wastes/:id': handler('wastes').delete,
        'get /taxes': handler('taxes').GET,
        'put /taxes': handler('taxes').put,
        'post /taxes/:type': handler('taxes').post,
        'delete /taxes/:type': handler('taxes').delete,
        'get /payments': handler('payments').GET,
        'get /payments/:type': handler('payments').getByType,
        'put /payments/': handler('payments').put

    }
};

