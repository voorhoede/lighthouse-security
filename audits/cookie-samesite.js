'use strict';
const Audit = require('lighthouse').Audit;

const testCookie = (cookie, pattern) => {
  return !!(cookie || '')
    .split(/; */)
    .find(value => pattern.test(value));
};

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
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const cookie = headers['set-cookie'];

    if (!cookie) {
      return {
        rawValue: true
      };
    }

    if (testCookie(cookie, /SameSite/)) {
      if (testCookie(cookie, /SameSite=(Strict|Lax)/)) {
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
