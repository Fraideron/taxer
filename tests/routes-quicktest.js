'use strict';

const config = require('./../api/configs/app');
config.environment = 'test';

const _routes = require('./../api/routes');
const app = require('./../api/server');
const request = require('supertest');
const assert = require('assert');
const formatUrl = require('./../api/components/formattingUrl');

let apiRoutes = Object.keys(_routes.api);

describe('Routes validity', () => {

  const routeValidationRegexp = /(get|post|put|delete|all) \/.*/i;
  apiRoutes.forEach(r => {
    it(r, done => {
      assert(routeValidationRegexp.test(r));
      done();
    });
  }); 

});

describe('Routes sanity test', () => {

  apiRoutes.forEach(r => {
    const formatted = formatUrl('api', r);
    const route = formatted.url.replace(/:(.*?)(\/|$)/, '1$2');
    it(`'${formatted.method} ${route}' respond with json`, done => {
      request(app)[formatted.method](route)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});

describe('Misc', () => {

  it('Uncaught error handling', done => {
    const url = formatUrl('test', 'get /error').url;
    console.log(url);
    request(app).get(url)
      .expect(500, done);
  });

});