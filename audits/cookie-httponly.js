'use strict';

const Audit = require('lighthouse').Audit;

class CookieHttpOnlyAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'cookie-httpOnly-audit',
      description: 'Cookies are HttpOnly',
      failureDescription: 'Cookies are not HttpOnly',
      helpText: 'Using the HttpOnly flag when generating a cookie helps mitigate ' +
          'the risk of client side script accessing the protected cookie. ' +
          '[Learn more](https://www.owasp.org/index.php/HttpOnly)',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const setCookieHeader = headers['set-cookie'];
    const httpOnly = /HttpOnly/.test(setCookieHeader) || !setCookieHeader;

    return {
      rawValue: httpOnly.toString(),
      score: httpOnly
    };
  }
}

module.exports = CookieHttpOnlyAudit;
