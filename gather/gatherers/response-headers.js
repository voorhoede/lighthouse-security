'use strict';

const Gatherer = require('lighthouse').Gatherer;
const request = require('request');

class ResponseHeaders extends Gatherer {
  afterPass(options) {
    return options.driver.evaluateAsync('window.location.href')
      .then(location => new Promise((resolve, reject) => {
        request({
          uri: location,
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) ' +
                          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                          'Chrome/59.0.3071.115 Safari/537.36'
          }
        }, (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.headers);
        });
      }));
  }
}

module.exports = ResponseHeaders;
