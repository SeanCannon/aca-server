'use strict';

const btoa = require('btoa');

const { setCacheArray, getCache, throwWhenMissing } = require('./helpers/cache');

const _search = ({ ArtSvc : { search }, logger }) => data => {
  const cacheKey = `search:${btoa(JSON.stringify(data.query))}`;
  return getCache(cacheKey)
    .then(JSON.parse)
    .then(throwWhenMissing(cacheKey))
    .catch(() => Promise.resolve(data)
      .then(search({ logger }))
      .then(setCacheArray(cacheKey))
    );
};

module.exports = _search;
