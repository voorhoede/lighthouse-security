'use strict';

const Gatherer = require('lighthouse').Gatherer;

class CspMetaGatherer extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    const metaSelector = 'meta[http-equiv=Content-Security-Policy]';
    return driver.evaluateAsync(`window.document.querySelectorAll('${metaSelector}')`);
  }
}

module.exports = CspMetaGatherer;
