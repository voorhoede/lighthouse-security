'use strict';

const Audit = require('lighthouse').Audit;
const validUrl = require('valid-url');

const isValidOption = value => {
  if (!(typeof value === 'string')) {
    return false;
  }
  value = value.toUpperCase();
  return value === 'DENY' ||
         value === 'SAMEORIGIN' ||
         value.startsWith('ALLOW-FROM ') && validUrl.isUri(value.substr('ALLOW-FROM '.length));
};

class FrameOptionsHeaderAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'x-frame-options-header',
      description: 'Page has valid `X-Frame-Options` value',
      failureDescription: 'Page `X-Frame-Options` header is missing or invalid',
      helpText: 'The `X-Frame-Options` header protects your visitors ' +
          'against clickjacking attacks. It prevents your content ' +
          'from being loaded in a frame on an attacker\'s site. ' +
          '[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const headerValue = headers['x-frame-options'];
    const hasValue = (typeof headerValue === 'string');

    if (!hasValue) {
      return {
        debugString: 'X-Frame-Options header is not set.',
        rawValue: false
      };
    }

    if (!isValidOption(headerValue)) {
      return {
        debugString: `${headerValue} is not a valid X-Frame-Options value.`,
        rawValue: false
      };
    }

    return {
      displayValue: headerValue,
      rawValue: true
    };
  }
}

module.exports = FrameOptionsHeaderAudit;
