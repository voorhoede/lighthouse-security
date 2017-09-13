'use strict';
const ManualAudit = require('./manual-audit');

class ManualSslGradeAudit extends ManualAudit {
  /**
   * @return {!AuditMeta}
   */
  static get meta() {
    return Object.assign({}, super.meta, {
      category: 'Security',
      name: 'maual-ssl-grade',
      description: 'Site has strong SSL configuration',
      helpText: 'The security level of a site\'s connection with its servers depends on the ' +
          'strength of the SSL configuration, which includes the certificates, protocol support, ' +
          'key exchange and cipher strength. ' +
          '[Check SSL Grade with SSL Test](https://www.ssllabs.com/ssltest/).'
    });
  }
}

module.exports = ManualSslGradeAudit;
