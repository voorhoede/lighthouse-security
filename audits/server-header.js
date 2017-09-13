'use strict';
const Audit = require('lighthouse').Audit;

class ServerHeaderAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'server-header',
      description: 'Page has no `Server` header',
      failureDescription: 'Page has `Server` header set to',
      helpText: 'Make sure to remove the Server header to prevent ' +
          'web server fingerprinting. The header exposes known vulnerabilities ' +
          'in unpatched versions as well as specific misconfigurations of the ' +
          'server. [Learn more](https://goo.gl/RjBJHw).',
      requiredArtifacts: ['ResponseHeaders']
    };
  }

  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['server'];
    const hasHeader = (typeof header === 'string');

    if (!hasHeader) {
      return {
        rawValue: true
      };
    }

    return {
      displayValue: header,
      rawValue: false
    };
  }
}

module.exports = ServerHeaderAudit;
