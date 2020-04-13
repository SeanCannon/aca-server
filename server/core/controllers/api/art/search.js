'use strict';

const btoa = require('btoa');

const { setCacheArray, getCache } = require('./helpers/cache');

const _search = ({ ArtSvc : { search }, logger }) => data => {
  const cacheKey = `search:${btoa(JSON.stringify(data.query))}`;
  return getCache(cacheKey)
    .then(JSON.parse)
    .catch(() => {
      return Promise.resolve(data)
        .then(search({ logger }))
        .then(setCacheArray(cacheKey))
    });
};

module.exports = _search;
