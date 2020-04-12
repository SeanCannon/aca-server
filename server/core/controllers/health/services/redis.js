'use strict';

const failed = report => err => [report, { status : 1, err }];

module.exports = report => {

  try {

    const R           = require('ramda'),
          config      = require('config'),
          redisConfig = R.prop(R.__, R.prop('redis', config)),
          redis       = require(redisConfig('client')),
          redisClient = redis.createClient(redisConfig('port'), redisConfig('host'), {}),
          cacheUtils  = require('alien-node-redis-utils')(redisClient),
          key         = '__health_test__',
          expires     = 30;

    return new Promise(resolve => {

      redisClient.on('error', err => {
        resolve(failed(report)(err));
      });

      cacheUtils.setItem(key, expires, { status : 0 })
        .then(() => cacheUtils.getItem(key))
        .then(JSON.parse)
        .then(res => resolve([report, res]))
        .catch(err => resolve(failed(report)(err)));
    });

  } catch (err) {
    return Promise.resolve(failed(err));
  }

};
