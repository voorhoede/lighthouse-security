'use strict';

const Audit = require('../../audits/x-frame-options-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: X-Frame-Options header audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
