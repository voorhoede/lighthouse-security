'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');

class StrictTransportSecurityAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'strict-transport-security',
      description: 'Has strong `Strict-Transport-Security` (HSTS) header',
      failureDescription: 'Has no or weak `Strict-Transport-Security` (HSTS) header',
      helpText: 'The `Strict-Transport-Security` (HSTS) tells web browsers to always connect ' +
                'to your server server via HTTPS, even when following an `http://` reference. ' +
                'This defeats attacks such as SSL Stripping. ' +
                '[Learn more](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet#Description).',
      requiredArtifacts: ['ResponseHeaders']
    };
  }

  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['strict-transport-security'];
    const hasHeader = (typeof header === 'string');
    const params = parseHeader(header);

    if (!hasHeader) {
      return {
        debugString: '`Strict-Transport-Security` header is not set.',
        rawValue: false
      };
    }

    if (!params['max-age']) {
      return {
        debugString: 'The "max-age" directive is required.',
        rawValue: false
      };
    }

    if (params['max-age'] < 30 * 24 * 60 * 60) {
      return {
        debugString: 'The "max-age" directive is too small. ' +
          'The minimum recommended value is 2592000 (30 days).',
        rawValue: false
      };
    }

    if (!params['includeSubDomains']) {
      return {
        debugString: 'The "includeSubDomains" directive should be added to ' +
          'also force HTTPS for all sub domains.',
        rawValue: false
      };
    }

    if (!params['preload']) {
      return {
        debugString: 'The "preload" directive should be added so browsers ' +
          'will never connect to your domain using an insecure connection.',
        rawValue: false
      };
    }

    return {
      displayValue: `\`${header}\``,
      rawValue: true
    };
  }
}

module.exports = StrictTransportSecurityAudit;
