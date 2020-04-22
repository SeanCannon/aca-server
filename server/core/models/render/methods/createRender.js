'use strict';

const R = require('ramda');

const DB                 = require('../../../utils/db'),
      validateRenderData = require('../helpers/validateRenderData').validateForInsert;

const decorateDataForDbInsertion = R.identity;

const createAndExecuteQuery = _data => {
  const data = decorateDataForDbInsertion(_data);

  const fields = R.keys(data);
  const query  = `INSERT INTO ${DB.coreDbName}.renders 
                  SET ${DB.prepareProvidedFieldsForSet(fields)}`;

  const queryStatement = [query, DB.prepareValues(data)];
  return DB.query(queryStatement);
};

/**
 * Create an render record
 * @param {Object} data
 * @throws {Error}
 * @returns {Promise}
 */
const createRender = data => {
  validateRenderData(R.defaultTo({}, data));
  return createAndExecuteQuery(data);
};

module.exports = createRender;
