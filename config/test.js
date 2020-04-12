'use strict';

const winston  = require('winston'),
      logUtils = require('alien-node-winston-utils');

const config = {
  server : {
    corsWhitelist : {
      patternString : 'localhost',
      flags         : 'i'
    }
  },
  logging : {
    winston : {
      transports : [
        {
          name             : 'file',
          level            : 'debug',
          timestamp        : logUtils.getDateString,
          colorize         : true,
          transportType    : 'file',
          filename         : __dirname + '/../spec/support/logs/log.log',
          json             : false, // required for formatter to work
          formatter        : logUtils.getFormatter,
          handleExceptions : true
        }
      ],
      strategies : {
        file : winston.transports.File
      }
    }
  },

  redis : {
    client   : 'redistub',
    host     : 'localhost',
    port     : 6379,
    password : ''
  }

};

module.exports = config;

/* eslint-disable-next-line */
console.log('USING TEST CONFIG');
