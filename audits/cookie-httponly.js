'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');

class CookieHttpOnlyAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'cookie-httponly',
      description: 'Cookies are HttpOnly',
      failureDescription: 'Cookies are not HttpOnly',
      helpText: 'Using the HttpOnly flag when generating a cookie helps mitigate ' +
          'the risk of client side script accessing the protected cookie. ' +
          '[Learn more](https://www.owasp.org/index.php/HttpOnly)',
      requiredArtifacts: ['ResponseHeaders']
    };
  }

  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['set-cookie'];
    const params = parseHeader(header);
    const isHttpOnly = params['HttpOnly'] === true || !header;

    return {
      rawValue: isHttpOnly
    };
  }
}

module.exports = CookieHttpOnlyAudit;
