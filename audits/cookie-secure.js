'use strict';

const Audit = require('lighthouse').Audit;

class SecureCookiesAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'cookie-secure-audit',
      description: 'Secure cookies used',
      helpText: 'For more information visit https://www.owasp.org/index.php/SecureFlag',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const setCookieHeader = headers['set-cookie'];
    const isSecure = /Secure/.test(setCookieHeader) || !setCookieHeader;

    return {
      rawValue: isSecure,
      score: isSecure
    };
  }
}

module.exports = SecureCookiesAudit;
