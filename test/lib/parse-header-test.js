'use strict';

const parseHeader = require('../../lib/parse-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('parseHeader', () => {
  it('returns empty object if no header is provided', () => {
    return assert.deepEqual(parseHeader(), {});
  });

  it('returns empty object if no header is empty string', () => {
    return assert.deepEqual(parseHeader(''), {});
  });

  it('returns object with pair for each header parameter', () => {
    return assert.equal(Object.keys(
      parseHeader('max-age=2592000; includeSubDomains; preload')
    ).length, 3);
  });

  it('returns object with string value for parameter with string value', () => {
    const params = parseHeader('id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; HttpOnly');
    return assert.equal(params.Expires, 'Wed, 21 Oct 2015 07:28:00 GMT');
  });

  it('returns object with number value for parameter with number value', () => {
    const params = parseHeader('max-age=2592000; includeSubDomains; preload');
    return assert.equal(params['max-age'], 2592000);
  });

  it('returns object with true value for parameter without value (flag directive)', () => {
    const params = parseHeader('max-age=2592000; includeSubDomains; preload');
    return assert.equal(params.includeSubDomains, true);
  });
});
