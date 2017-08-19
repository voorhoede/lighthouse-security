'use strict';

const Audit = require('../../audits/xss-protection-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: XSS-Protection header audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
