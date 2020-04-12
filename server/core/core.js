'use strict';

// Dependencies
const path                 = require('path'),
      config               = require('config'),
      bodyParser           = require('body-parser'),
      multipart            = require('connect-multiparty'),
      logger               = require('./services/log/Log'),
      apiUtils             = require('alien-node-api-utils'),

      // Express app
      express              = require('express'),
      app                  = express(),

      // Middleware
      allowCors            = require('./middleware/allowCors'),
      secureHeaders        = require('./middleware/secureHeaders'),

      // Routes
      ping                 = (req, res) => res.send('pong ' + new Date().toISOString()),
      unknown              = (req, res) => res.status(404).json({ data : { code : 1234, message : 'unknown' } }),
      health               = require('./routes/health'),
      pageRoutes           = require('./routes/index'),
      lensMetricsApiRoutes = require('./routes/api/art');

const clientGlobals = `
if (!window) {
  window = {};
}
window.ACA = { 
  errors        : ${ JSON.stringify(config.errors) }
};`;

const globals = (req, res) => res.set('Content-Type', 'application/javascript').send(clientGlobals);


const logUncaughtExceptions = (err, req, res) => {
  logger({}).error('Uncaught Platform Exception at highest level: ', err);
  return apiUtils.jsonResponseError(req, res, config.errors.decorateForJson(config.errors.system.UNCAUGHT));
};

// Load Environment variables
// App requires a .env file in root directory which is NOT included in the repo!
// The .env file should be a populated version of the .env.example file which is included in the repo.
require('dotenv-safe').config({
  path : path.resolve(__dirname, `../../run/env/${process.env.NODE_ENV}/.env`)
});

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

// Uploads
app.use(multipart({ uploadDir : '/tmp' }));

// CORS middleware must come before routes
app.use(allowCors);
app.use(secureHeaders);

// Routing
app.use('/', pageRoutes);
app.use('/ping', ping);
app.use('/health', health);
app.use('/globals', globals);
app.use('/api/v1/lensMetrics', lensMetricsApiRoutes);
app.use('*', unknown);

app.use(logUncaughtExceptions);

process.on('unhandledRejection', error => {
  logger({ context : 'unhandledRejection' }).error(error);
});

module.exports = app;
