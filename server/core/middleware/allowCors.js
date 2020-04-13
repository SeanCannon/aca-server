'use strict';

const R      = require('ramda'),
      config = require('config');

const allowCors = (req, res, next) => {
  const origin = req.headers.origin;

  if (R.test(new RegExp(config.server.corsWhitelist.patternString, config.server.corsWhitelist.flags), origin)) {
    res.set('Access-Control-Allow-Origin',   origin);
    res.set('Access-Control-Allow-Methods',  'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Expose-Headers', 'x-auth-token, x-refresh-token, x-request-id, x-profile');
    res.set('Access-Control-Allow-Headers',  'origin, cache-control, x-auth-token, x-refresh-token, x-profile, x-requested-with, x-request-id, content-type, accept, authorization');
  }

  next();
};

module.exports = allowCors;
