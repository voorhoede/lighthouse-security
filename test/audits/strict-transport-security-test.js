'use strict';

const Audit = require('../../audits/strict-transport-security.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Strict-Transport-Security audit', () => {
  it('fails if no Strict-Transport-Security header is present', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': null,
      }
    }).rawValue, false);
  });

  it('has debug message if no Strict-Transport-Security header is present', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': null,
      }
    }).debugString.length > 0, true);
  });

  it('fails if Strict-Transport-Security has no "max-age"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'includeSubdomains',
      }
    }).rawValue, false);
  });

  it('has debug message for missing "max-age"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'includeSubdomains',
      }
    }).debugString.includes('"max-age"'), true);
  });

  it('fails if Strict-Transport-Security has too short "max-age"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=86400',
      }
    }).rawValue, false);
  });

  it('has debug message for too short "max-age"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=86400',
      }
    }).debugString.includes('"max-age"'), true);
  });

  it('fails if Strict-Transport-Security has no "includeSubdomains"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=2592000',
      }
    }).rawValue, false);
  });

  it('has debug message for missing "includeSubDomains"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=2592000',
      }
    }).debugString.includes('"includeSubDomains"'), true);
  });

  it('fails if Strict-Transport-Security has no "preload"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=2592000; includeSubDomains',
      }
    }).rawValue, false);
  });

  it('has debug message for missing "preload"', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=2592000; includeSubDomains',
      }
    }).debugString.includes('"preload"'), true);
  });

  it('passes if Strict-Transport-Security has long max-age, includeSubDomains & preload', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'strict-transport-security': 'max-age=2592000; includeSubDomains; preload',
      }
    }).rawValue, true);
  });
});
