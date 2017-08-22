'use strict';

const Audit = require('../../audits/xss-protection-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: XSS-Protection header audit', () => {
  it('fails when no XSS-Protection header is present', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'x-xss-protection': null
      }
    }).rawValue, false);
  });

  it('passes when no XSS-Protection header is present', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'x-xss-protection': '1; mode=block'
      }
    }).rawValue, true);
  });
});
