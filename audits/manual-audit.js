'use strict';
/**
 * ManualAudit
 * is not available on Lighthouse module like regular Audit (`require('lighthouse').Audit`),
 * so export here so all Manual Security Audits can use it.
 */
const ManualAudit = require('lighthouse/lighthouse-core/audits/manual/manual-audit');
module.exports = ManualAudit;
