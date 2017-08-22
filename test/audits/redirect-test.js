'use strict';

const Audit = require('../../audits/redirect.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Redirect audit', () => {
  it('fails if page responds with status 200 OK', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 200}
    }).rawValue, false);
  });

  xit('fails if page responds with status 308 Permanent Redirect without protocol change', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 308}
    }).rawValue, false);
  });

  it('fails if page responds with status 404 Not Found', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 404}
    }).rawValue, false);
  });

  it('fails if page responds with status 500 Internal Server Error', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 500}
    }).rawValue, false);
  });

  it('passes if page responds with status 300 Redirect', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 300}
    }).rawValue, true);
  });

  it('passes if page responds with status 301 Moved Permanently', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 301}
    }).rawValue, true);
  });

  it('passes if page responds with status 307 Temporary Redirect', () => {
    return assert.equal(Audit.audit({
      HttpRedirect: {statusCode: 307}
    }).rawValue, true);
  });
});
