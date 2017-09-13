'use strict';

const Audit = require('../../audits/cookie-httponly.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Cookie HttpOnly audit', () => {
  it('fails if Set-Cookie is used without HttpOnly flag', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'sessionid=38afes7a8; Path=/'
      }
    }).rawValue, false);
  });

  it('passes if Set-Cookie contains HttpOnly flag', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'sessionid=38afes7a8; HttpOnly; Path=/'
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
