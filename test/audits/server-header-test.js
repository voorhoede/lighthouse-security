'use strict';

const Audit = require('../../audits/server-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Server header audit', () => {
  it('fails when Server header is present', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'server': 'Apache/2.4.9 (Unix)'
      }
    }).rawValue, false);
  });

  it('displays value of the Server header', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'server': 'Apache/2.4.9 (Unix)'
      }
    }).displayValue, 'Apache/2.4.9 (Unix)');
  });

  it('passes when no Server header is present', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'server': null
      }
    }).rawValue, true);
  });
});
