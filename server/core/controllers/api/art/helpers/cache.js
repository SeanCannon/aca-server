'use strict';

const R = require('ramda');

const cacheUtils = require('../../../../utils/cache');

const CACHE_EXPIRE_ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

const makeCacheKey = (...args) => `api.aca.${ args.filter(a=>a).join(':') }`;

const getCache = (...args) => cacheUtils.getItem(makeCacheKey.apply(null, args));

const setCacheObject = item => {
  const { id } = item;

  const CACHE_KEY_BY_ID = makeCacheKey('getItemById', id);

  return Promise.resolve(item)
    .then(cacheUtils.setItem(CACHE_KEY_BY_ID, CACHE_EXPIRE_ONE_WEEK_IN_SECONDS));
};

const setCacheArray = (...args) => arr => Promise.resolve(arr)
  .then(cacheUtils.setItem(makeCacheKey.apply(null, args), CACHE_EXPIRE_ONE_WEEK_IN_SECONDS));

const throwWhenMissing = k => R.when(R.isNil, () => { throw new Error(`No cache for ${k}`); });

module.exports = { setCacheObject, setCacheArray, getCache, throwWhenMissing };
