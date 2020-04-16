'use strict';

const R                = require('ramda'),
      { readFileSync } = require('fs');

const { convert }            = require('../../../utils/convert'),
      { validateForConvert } = require('../../../services/art/helpers/validateArtData');

const _convert = ({ logger }) => data => {
  return Promise.resolve(data)
    .then(validateForConvert)
    .then(R.path(['source', 'path']))
    .then(readFileSync)
    .then(convert)
    .then(R.tap(console.log))
    .catch(err => {
      logger.error(err);
      throw err;
    });
};

module.exports = _convert;
