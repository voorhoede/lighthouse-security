'use strict';

const Gatherer = require('lighthouse').Gatherer;
const request = require('request-promise');

class RequestHeaders extends Gatherer {
  afterPass(options) {
    const driver = options.driver;

    return driver.evaluateAsync('window.location.href')
      .then(location => {
        return request({
          uri: location,
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) ' +
                          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                          'Chrome/59.0.3071.115 Safari/537.36'
          }
        });
      });
  }
}

module.exports = RequestHeaders;
