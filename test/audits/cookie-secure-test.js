'use strict';

const Audit = require('../../audits/cookie-secure.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Cookie Secure audit', () => {
  it('fails if Set-Cookie is used without Secure flag', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT'
      }
    }).rawValue, false);
  });

  it('passes if Set-Cookie contains Secure flag', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly'
      }
    }).rawValue, true);
  });

  it('passes if no Set-Cookie header is present', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': null
      }
    }).rawValue, true);
  });
});
