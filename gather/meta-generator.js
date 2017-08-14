'use strict';

const Gatherer = require('lighthouse').Gatherer

class MetaGenerator extends Gatherer {

  /**
   * @param {{driver: !Object}} options Run options
   * @return {!Promise<?string>} The value of the generator meta's content attribute, or null
   */
  afterPass(options) {
    const driver = options.driver;

    return driver.querySelector('head meta[name="generator"]')
      .then(node => node && node.getAttribute('content'));
  }
}

module.exports = MetaGenerator;