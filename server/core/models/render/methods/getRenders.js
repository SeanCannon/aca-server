'use strict';

const R = require('ramda');

const DB                 = require('../../../utils/db'),
      validateRenderData = require('../helpers/validateRenderData').validateForGet;

const MAX_LIMIT = 20;

const createAndExecuteQuery = ({ galleryStrategyKey, limit=MAX_LIMIT, offset=0 }) => {
  const approvedLimit = R.unless(R.lte(R.__, MAX_LIMIT), R.always(MAX_LIMIT))(limit);

  const queryAll = () => {
    const query          = `SELECT * FROM ${DB.coreDbName}.renders
                            ORDER BY id DESC
                            LIMIT ?, ?`;
    return [query, [offset, approvedLimit]];
  };

  const queryByGallery = () => {
    const query          = `SELECT * FROM ${DB.coreDbName}.renders
                            WHERE gallery_strategy_key = ?
                            ORDER BY id DESC
                            LIMIT ?, ?`;
    return [query, [galleryStrategyKey, offset, approvedLimit]];
  };

  return DB.querySafe(galleryStrategyKey === 'all' ? queryAll() : queryByGallery())
};

/**
 * Get latest renders
 * @param {Object} params
 * @throws {Error}
 * @returns {Promise}
 */
const getRenders = params => {
  validateRenderData(params);
  return createAndExecuteQuery(params);
};

module.exports = getRenders;
