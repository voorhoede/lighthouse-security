const Gatherer = require('lighthouse').Gatherer;

/**
 * @fileoverview Extracts `window.myLoadMetrics` from the test page.
 */

class PageProtocol extends Gatherer {
  afterPass(options) {
    const driver = options.driver;

    return driver.evaluateAsync('window.location.protocol')
  }
}

module.exports = PageProtocol;
