'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');

class SecureCookiesAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'cookie-secure',
      description: 'Cookies are Secure',
      failureDescription: 'Cookies are not Secure',
      helpText: 'Using the Secure flag ensures a cookie can only be transmitted ' +
                'over an encrypted connection and not over the insecure HTTP. ' +
                '[Learn more](https://www.owasp.org/index.php/SecureFlag)',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const header = artifacts.RequestHeaders['set-cookie'];
    const params = parseHeader(header);
    const isSecure = params['Secure'] === true || !header;

    return {
      rawValue: isSecure
    };
  }
}

module.exports = SecureCookiesAudit;
