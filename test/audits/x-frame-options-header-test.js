'use strict';

const Audit = require('../../audits/x-frame-options-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: X-Frame-Options header audit', () => {
  it('fails if no X-Frame-Options header is present', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': null,
      }
    }).rawValue, false);
  });

  it('fails if X-Frame-Options header has invalid value', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': 'DENIAL',
      }
    }).rawValue, false);
  });

  it('fails if X-Frame-Options header is set to `ALLOW-FROM` with invalid URL', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': 'ALLOW-FROM invalid url',
      }
    }).rawValue, false);
  });

  it('header value check is case-insenstive', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': 'sameorigin',
      }
    }).rawValue, true);
  });

  it('passes if X-Frame-Options header is set to `DENY`', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': 'DENY',
      }
    }).rawValue, true);
  });

  it('passes if X-Frame-Options header is set to `SAMEORIGIN`', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': 'SAMEORIGIN',
      }
    }).rawValue, true);
  });

  it('passes if X-Frame-Options header is set to `ALLOW-FROM` with valid URL', () => {
    return assert.equal(Audit.audit({
      ResponseHeaders: {
        'x-frame-options': 'ALLOW-FROM https://example.com/',
      }
    }).rawValue, true);
  });
});
