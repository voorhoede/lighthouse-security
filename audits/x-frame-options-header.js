'use strict';
const Audit = require('lighthouse').Audit;
const validUrl = require('valid-url');

/**
 * A valid X-Frame-Header option is `DENY`, `SAMEORIGIN` or `ALLOW :url`.
 * The value is case-insenstive and can optionally have trailing whitespaces and a trailing semicolon.
 * See https://tools.ietf.org/html/rfc7034#section-2.1
 *
 * @param {string} [value]
 * @returns {boolean}
 */
const isValidOption = value => {
  if (!(typeof value === 'string')) {
    return false;
  }
  value = value.toUpperCase();
  return /DENY *;?/i.test(value) ||
         /SAMEORIGIN *;?/i.test(value) ||
         /ALLOW-FROM .*;?/i.test(value) && validUrl.isUri(value.substr('ALLOW-FROM '.length));
};

class FrameOptionsHeaderAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
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
