'use strict';

const R = require('ramda');

/**
 * Accept a path to a value. If the value is undefined,
 * we return that, otherwise we pass to parseInt. This allows
 * for a clear fork of illegalParamError and missingParamError.
 * @param {Array}  path
 * @param {Object} obj
 * @returns {Number|undefined}
 */
const maybeParseIntFromPath = R.curry((path, obj) => {
  const item = R.path(path, obj);
  return !R.isNil(item) ? parseInt(item, 10) : undefined;
});

module.exports = maybeParseIntFromPath;
