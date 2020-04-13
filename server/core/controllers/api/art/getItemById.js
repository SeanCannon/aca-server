'use strict';

const { setCacheObject, getCache } = require('./helpers/cache');

const _getItemById = ({ ArtSvc : { getItemById }, logger }) => id => {
  return getCache('getItemById', id)
    .then(JSON.parse)
    .catch(() => Promise.resolve(id)
      .then(getItemById({ logger }))
      .then(setCacheObject)
    );
};

module.exports = _getItemById;
