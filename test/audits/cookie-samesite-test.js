'use strict';

const Audit = require('../../audits/cookie-samesite.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: SameSite Cookie audit', () => {
  it('fails if Set-Cookie contains SameSite flag without value', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite; HttpOnly'
      }
    }).rawValue, false);
  });

  it('fails if Set-Cookie contains SameSite flag with invalid value', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Invalid; HttpOnly'
      }
    }).rawValue, false);
  });

  it('gives debug message when flag is missing or invalid', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Invalid; HttpOnly'
      }
    }).debugString.length > 0, true);
  });

  it('passes if Set-Cookie contains SameSite=Strict flag', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Strict; HttpOnly'
      }
    }).rawValue, true);
  });

  it('passes if Set-Cookie contains SameSite=Lax flag', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'set-cookie': 'id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; SameSite=Lax; HttpOnly'
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
