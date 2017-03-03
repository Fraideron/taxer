'use strict';

const app = require('./server');
const conf = require('./configs/app');

app.listen(conf.port, ()=>{
	const msg = `Serving ${conf.name} on http://127.0.0.1:${conf.port}`;
	console.log(msg);
});

