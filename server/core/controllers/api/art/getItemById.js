'use strict';

const { setCacheObject, getCache, throwWhenMissing } = require('./helpers/cache');

const _getItemById = ({ ArtSvc : { getItemById }, logger }) => id => {
  const cacheKey = 'getItemById';
  return getCache(cacheKey, id)
    .then(JSON.parse)
    .then(throwWhenMissing(cacheKey))
    .catch(() => Promise.resolve(id)
      .then(getItemById({ logger }))
      .then(setCacheObject)
    );
};

module.exports = _getItemById;
