'use strict';

const Audit = require('lighthouse').Audit;

class ServerHeaderAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'server-header',
      description: 'Page has no `Server` header',
      failureDescription: 'Page has `Server` header set to',
      helpText: 'Make sure to remove the Server header to prevent ' +
          'web server fingerprinting. The header exposes known vulnerabilities ' +
          'in unpatched versions as well as specific misconfigurations of the ' +
          'server. ' +
          '[Learn more](https://goo.gl/RjBJHw).',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const headerValue = headers['server'];
    const hasValue = (typeof headerValue === 'string');

    if (!hasValue) {
      return {
        rawValue: true
      };
    }

    return {
      displayValue: headerValue,
      rawValue: false
    };
  }
}

module.exports = ServerHeaderAudit;
