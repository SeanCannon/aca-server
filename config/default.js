'use strict';

const R       = require('ramda'),
      winston = require('winston'),
      mysqlUtils = require('alien-node-mysql-utils')(null);

const config = {
  server  : {
    host          : R.pathOr('localhost', ['env', 'HOST'], process),
    https         : R.pathOr('true', ['env', 'HTTPS'], process),
    nodePorts     : R.compose(
      R.map(R.partialRight(parseInt, [10])),
      R.split(','),
      R.concat('')
    )(R.pathOr('1137,1138,1139', ['env', 'NODE_PORTS'], process)),
    corsWhitelist : {
      patternString : 'animalcrossingart.[com]',
      flags         : 'i'
    }
  },

  session : {
    secret : R.pathOr('secret', ['env', 'SESSION_SECRET'], process)
  },

  logging : {
    winston : {
      transports : [
        {
          transportType : 'console'
        }
      ],
      strategies : {
        console : winston.transports.Console
      }
    }
  },

  redis : {
    client   : 'redis',
    host     : R.pathOr('localhost', ['env', 'REDIS_HOST'],     process),
    port     : R.pathOr(6379,        ['env', 'REDIS_PORT'],     process),
    password : R.pathOr('',          ['env', 'REDIS_PASSWORD'], process)
  },

  db : {
    mysql   : {
      poolConfig : {
        connectionLimit    : R.pathOr(30,          ['env', 'CORE_DB_CONNECTION_LIMIT'], process),
        host               : R.pathOr('localhost', ['env', 'CORE_DB_HOST'],             process),
        port               : R.pathOr(3306,        ['env', 'CORE_DB_PORT'],             process),
        user               : R.pathOr('root',      ['env', 'CORE_DB_USER'],             process),
        password           : R.pathOr('root',      ['env', 'CORE_DB_PASSWORD'],         process),
        multipleStatements : true
      },
      searchableFields                 : {},
      DYNAMICALLY_POPULATED_DB_COLUMNS : ['timestamp']
    }
  },

  errors : {

    decorateForJson : err => {
      const statusCode = R.pathOr(err.statusCode, ['errors', 'errorCodeToHttpStatusCodeMap', err.code], config);

      return {
        err        : R.omit(['statusCode'], err),
        statusCode : R.defaultTo(501, statusCode)
      };
    },

    system : {
      UNCAUGHT : {
        code    : 9999,
        message : 'System hiccup! We have been alerted and will be resolving the issue as soon as we can.'
      }
    },

    auth : {
      UNAUTHORIZED_API_ACCESS       : {
        code    : 5000,
        message : 'Unauthorized API Access'
      },
      TOKEN_INVALID                 : {
        code    : 5002,
        message : 'Invalid auth token'
      },
      TOKEN_EXPIRED                 : {
        code    : 5003,
        message : 'Expired auth token'
      },
      FORBIDDEN_API_ACCESS          : {
        code    : 5004,
        message : 'Forbidden API Access'
      },
      MISSING_REFRESH_TOKEN_PAYLOAD : {
        code    : 5004,
        message : 'Missing refresh token payload'
      },
      MISSING_REFRESH_TOKEN_SECRET  : {
        code    : 5004,
        message : 'Missing refresh token secret'
      },
      MISSING_REQ                   : {
        code    : 5005,
        message : 'Missing req, can not get token from header or query string'
      },
      CANNOT_SIGN_TOKEN             : {
        code    : 5006,
        message : 'Could not sign token'
      },
      INVALID_CREDENTIALS           : {
        code    : 5007,
        message : 'Invalid credentials'
      }
    },

    errorCodeToHttpStatusCodeMap : {
      5000 : 401,
      5001 : 200,
      5002 : 401,
      5003 : 401,
      5004 : 403,
      5005 : 401,
      5006 : 401,
      5007 : 401,
      6000 : 200,
      6001 : 501,
      6002 : 501,
      6999 : 501,
      7000 : 200,
      7001 : 200,
      7002 : 200,
      8000 : 415,
      8001 : 413
    },

    db : R.path(['constants', 'errors'], mysqlUtils),

    validation : {
      REQUIRED    : {
        code    : 7000,
        message : 'Missing required property'
      },
      UNSUPPORTED : {
        code    : 7001,
        message : 'Unsupported property'
      },
      VALUE       : {
        code    : 7002,
        message : 'Illegal value for property'
      }
    }
  },
  auth : {
    SALT_ROUNDS_EXPONENT : 10,
    strategy             : 'jwt',
    userStrategies       : ['cloudUser'],
    jwtOptions           : {
      expiresIn : '20s'
    },
    tokenProfileFields   : ['id', 'firstName', 'lastName', 'email', 'portrait', 'strategy', 'alg', 'aud', 'key'],
    strategies           : {}
  },

  api : {
    COMMON_PRIVATE_FIELDS : ['password'],
    RENDER_PRIVATE_FIELDS : ['authorIp']
  }
};

module.exports = config;

/* eslint-disable-next-line */
console.log('USING DEFAULT CONFIG');
