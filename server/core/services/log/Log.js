'use strict';

const winston     = require('winston'),
      R           = require('ramda'),
      winstonConf = require('config').logging.winston;

const getTransportInstances = R.curry((winstonConf, transportConfig) => {
  const transportConstructor = winstonConf.strategies[transportConfig.transportType];
  return new (transportConstructor)(transportConfig);
});

const logger = new (winston.Logger)({
  transports : winstonConf.transports.map(getTransportInstances(winstonConf))
});

const appendMetaToEveryLog = (logType, meta) => {
  return R.partialRight(R.bind(logger[logType], logger), [{ meta }]);
};

const decorateInfoLogForPerformanceMetrics = meta => R.compose(
  R.partial(appendMetaToEveryLog('info', meta)),
  R.append(R.__, []),
  R.concat('PERFORMANCE TIMER ')
);

module.exports = meta => {
  return {
    error          : appendMetaToEveryLog('error', meta),
    info           : appendMetaToEveryLog('info',  meta),
    debug          : appendMetaToEveryLog('debug', meta),
    warn           : appendMetaToEveryLog('warn',  meta),
    perfStart      : decorateInfoLogForPerformanceMetrics(meta)('START'),
    perfEndSuccess : decorateInfoLogForPerformanceMetrics(meta)('END (SUCCESS)'),
    perfEndFail    : decorateInfoLogForPerformanceMetrics(meta)('END (FAIL)')
  };
};
