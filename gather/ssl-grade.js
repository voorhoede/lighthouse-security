const Gatherer = require('lighthouse').Gatherer
const ssllabs = require('node-ssllabs');

const MAX_DURATION_SECONDS = 120;
const LOCAL_DOMAINS = ['localhost', '127.0.0.1'];

const isLocalDomain = host => LOCAL_DOMAINS.includes(host);

class SslGrade extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    const timeout = options._testTimeout || MAX_DURATION_SECONDS * 1000;

    const sslTestPromise = driver.evaluateAsync('window.location.host')
        .then(host => new Promise((resolve, reject) => {
            if (isLocalDomain(host)) {
                reject(new Error('Domain must be available over the public internet to test SSL.'));
            }

            ssllabs.scan({ 
                host, 
                fromCache: 'off',
                startNew: 'on',
            }, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        }));

    let sslTestTimeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        sslTestTimeout = setTimeout(_ => {
            reject(new Error(`SSL test took over ${MAX_DURATION_SECONDS} seconds.`));
        }, timeout);
    });

    return Promise.race([
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
}

module.exports = SslGrade;
