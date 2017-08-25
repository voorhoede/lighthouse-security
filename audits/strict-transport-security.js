'use strict';
const Audit = require('lighthouse').Audit;

const valueContainsDirective = (value, directive) => {
  return !!value
    .split(/; */)
    .find(str => str === directive);
};

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
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const value = headers['strict-transport-security'];
    const hasValue = (typeof value === 'string');

    if (!hasValue) {
      return {
        debugString: '`Strict-Transport-Security` header is not set.',
        rawValue: false
      };
    }

    const hasMaxAge = /max-age/.test(value);
    if (!hasMaxAge) {
      return {
        debugString: 'The "max-age" directive is required.',
        rawValue: false
      };
    }

    const maxAge = parseInt(value.match(/max-age=([0-9]+)/)[1], 10);
    if (maxAge < 30 * 24 * 60 * 60) {
      return {
        debugString: 'The "max-age" directive is too small. ' +
          'The minimum recommended value is 2592000 (30 days).',
        rawValue: false
      };
    }

    if (!valueContainsDirective(value, 'includeSubDomains')) {
      return {
        debugString: 'The "includeSubDomains" directive should be added to ' +
          'also force HTTPS for all sub domains.',
        rawValue: false
      };
    }

    if (!valueContainsDirective(value, 'preload')) {
      return {
        debugString: 'The "preload" directive should be added so browsers ' +
          'will never connect to your domain using an insecure connection.',
        rawValue: false
      };
    }

    return {
      displayValue: `\`${value}\``,
      rawValue: true
    };
  }
}

module.exports = StrictTransportSecurityAudit;
