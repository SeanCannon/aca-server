'use strict';

const R           = require('ramda'),
      config      = require('config'),
      redisConfig = R.prop(R.__, R.prop('redis', config)),
      redis       = require(redisConfig('client')),
      redisClient = redis.createClient(redisConfig('port'), redisConfig('host'), {}),
      cacheUtils  = require('alien-node-redis-utils')(redisClient);

redisClient.auth(redisConfig('password'));
redisClient.on('error', () => redisClient.quit());

module.exports = cacheUtils;
