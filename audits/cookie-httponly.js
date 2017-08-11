const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;


class CookieHttpOnlyAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'cookie-httpOnly-audit',
      description: 'Cookies are httpOnly',
      helpText: 'For more information visit https://www.owasp.org/index.php/HttpOnly',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders
    const setCookieHeader = headers['set-cookie']

    const httpOnly = /HttpOnly/.test(setCookieHeader) || !setCookieHeader

    return {
      rawValue: httpOnly.toString(),
      score: httpOnly
    };
  }
}

module.exports = CookieHttpOnlyAudit
