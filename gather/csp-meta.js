const Gatherer = require('lighthouse').Gatherer

class CspMetaGatherer extends Gatherer {
    afterPass(options) {
        const driver = options.driver

        return driver.evaluateAsync('window.document.querySelectorAll(\'meta[http-equiv=Content-Security-Policy]\')')
    }
}

module.exports = CspMetaGatherer
