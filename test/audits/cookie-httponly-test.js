'use strict';

const Audit = require('../../audits/cookie-httponly.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Cookie HttpOnly audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
