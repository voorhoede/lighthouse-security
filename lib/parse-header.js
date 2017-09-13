'use strict';

const isInteger = (value) => /^\d+$/.test(value);

/**
 *
 * @param {string} [header]
 * @returns {object}
 */
const parseHeader = (header = '') => {
  return (typeof header === 'string' ? header : '')
    .split(/; */)
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      if (key.length) {
        params[key] = isInteger(value) ? parseInt(value) : value || true;
      }
      return params;
    }, {});
};


module.exports = parseHeader;
