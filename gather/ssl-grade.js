const Gatherer = require('lighthouse').Gatherer
const ssllabs = require('node-ssllabs');
const { URL } = require('url');

const MAX_DURATION_SECONDS = 120;
const LOCAL_DOMAINS = ['localhost', '127.0.0.1'];

const isLocalDomain = host => LOCAL_DOMAINS.includes(host);

class SslGrade extends Gatherer {
  beforePass(options) {
    const driver = options.driver;
    const origin = new URL(options.url).origin;
    const timeout = options._testTimeout || MAX_DURATION_SECONDS * 1000;

    const sslTestPromise = new Promise((resolve, reject) => {
        if (isLocalDomain(origin)) {
            reject(new Error('Domain must be available over the public internet to test SSL.'));
        }

        ssllabs.scan({ 
            host: origin, 
            fromCache: 'off',
            startNew: 'on',
        }, (err, result) => {
            err ? reject(err) : resolve(result);
        });
    });

    let sslTestTimeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        sslTestTimeout = setTimeout(_ => {
            reject(new Error(`SSL test took over ${MAX_DURATION_SECONDS} seconds.`));
        }, timeout);
    });

    options._sslGradePromise = Promise.race([
        sslTestPromise,
        timeoutPromise
    ]).then(result => {
      // Clear timeout. No effect if it won, no need to wait if it lost.
      clearTimeout(sslTestTimeout);
      return result;
    }).catch(err => {
      clearTimeout(sslTestTimeout);
      throw err;
    });
  }

  afterPass(options) {
      return options._sslGradePromise;
  }
}

module.exports = SslGrade;
