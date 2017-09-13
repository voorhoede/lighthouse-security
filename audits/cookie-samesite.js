'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');

// see https://tools.ietf.org/html/draft-west-first-party-cookies-06#section-4
class SameSiteCookieAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'cookie-samesite',
      description: 'Cookies are SameSite',
      failureDescription: 'Cookies are not SameSite',
      helpText: 'SameSite prevents the browser from sending the cookie along ' +
                'with cross-site requests. which provides some protection ' +
                'against cross-site request forgery attacks (CSRF). ' +
                '[Learn more](https://www.owasp.org/index.php/SameSite)',
      requiredArtifacts: ['ResponseHeaders']
    };
  }

  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['set-cookie'];
    const hasHeader = (typeof header === 'string');
    const params = parseHeader(header);

    if (!hasHeader) {
      return {
        rawValue: true
      };
    }

    if (params['SameSite']) {
      if (/(Strict|Lax)/.test(params['SameSite'])) {
        return {
          rawValue: true
        };
      } else {
        return {
          debugString: 'Invalid `SameSite` value. Can only be `Strict` or `Lax`.',
          rawValue: false
        };
      }
    }
  }
}

module.exports = SameSiteCookieAudit;
