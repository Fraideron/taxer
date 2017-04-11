'use strict';
// -------------------------------------------------------------------- handlers importing wrapper

const _routesDir = 'handlers';
const handler = name => {
    const path = `./${_routesDir}/${name}`;
    return require(path);
};



// -------------------------------------------------------------------- handlers list
module.exports = {
    api: {
        'get /user': handler('users').GET,
        'post /user/profile': handler('users').postUserProfile,
        'post /user/meta': handler('users').postUserMeta,
        'get /wastes': handler('wastes').GET,
        'get /wastes/:type': handler('wastes').getByType,
        'put /wastes': handler('wastes').put,
        'post /wastes/:id': handler('wastes').post,
        'delete /wastes/:id': handler('wastes').delete,
        'get /taxes': handler('taxes').GET,
        'put /taxes': handler('taxes').put,
        'post /taxes/:type': handler('taxes').post,
        'delete /taxes/:id': handler('taxes').delete,
        'get /payments': handler('payments').GET,
        'get /payments/:type': handler('payments').getByType,
        'put /payments/': handler('payments').put
    },

    test: {
        'get /error': (req, res) => {
            throw new Error();
        }
    }
};
