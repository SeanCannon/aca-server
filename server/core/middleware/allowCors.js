'use strict';

const R      = require('ramda'),
      config = require('config');

const allowCors = (req, res, next) => {
  const origin = req.headers.origin;

  if (R.test(new RegExp(config.server.corsWhitelist.patternString, config.server.corsWhitelist.flags), origin)) {
    res.set('Access-Control-Allow-Origin',   origin);
    res.set('Access-Control-Allow-Methods',  'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'X-Auth-Token, X-Refresh-Token, X-profile');
    res.set('Access-Control-Allow-Headers',  'Origin, Cache-Control, X-Auth-Token, X-Refresh-Token, X-profile, X-Requested-With, Content-Type, Accept, Authorization');
  }

  next();
};

module.exports = allowCors;
