'use strict';

const R      = require('ramda'),
      config = require('config');

const COMMON_PRIVATE_FIELDS = R.path(['api', 'COMMON_PRIVATE_FIELDS'], config),
      RENDER_PRIVATE_FIELDS = R.path(['api', 'RENDER_PRIVATE_FIELDS'], config);

const privateFields = R.concat(COMMON_PRIVATE_FIELDS, RENDER_PRIVATE_FIELDS);

const _getRenders = require('../../../models/render/methods/getRenders');

/**
 * Get latest renders from the database
 * @param {Object} params
 */
const getRenders = params => Promise.resolve(params)
  .then(_getRenders)
  .then(R.map(R.omit(privateFields)));

module.exports = getRenders;
