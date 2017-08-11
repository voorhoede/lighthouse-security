const Gatherer = require('lighthouse').Gatherer
const request = require('request-promise')

class HttpRedirect extends Gatherer {
  afterPass(options) {
    const driver = options.driver

    return driver.evaluateAsync('window.location.host')
        .then(host => {
            return request({
                uri: 'http://' + host,
                method: 'HEAD',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
                },
                resolveWithFullResponse: true,
                followRedirect: false,
                simple: false
            })
        })
  }
}

module.exports = HttpRedirect
