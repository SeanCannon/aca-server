'use strict';

const R      = require('ramda'),
      config = require('config');

const VALIDATION_ERROR_KEY_ILLEGAL_PARAM                   = 'VALUE',
      VALIDATION_ERROR_KEY_MISSING_PARAM                   = 'REQUIRED',
      VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM               = 'UNSUPPORTED',
      MAX_CONTROLLERS_TO_WHICH_EVENT_EMITTER_SHOULD_LISTEN = 100;

const COMMON_TIMESTAMP = new Date('2016-02-01T17:23:30.000Z');

const COMMON_REQUEST_BODY = {
  flash   : R.identity,
  session : {
    flash : {}
  }
};

const COMMON_EMPTY_REQUEST_ERROR = new TypeError('Cannot set property "flash" of undefined');

const COMMON_RESPONSE_BODY = {
  locals : {},
  set    : () => COMMON_RESPONSE_BODY,
  status : () => COMMON_RESPONSE_BODY,
  send   : R.identity,
  json   : R.identity
};

const validationErr = R.curry((errorKey, namespace, param) => {
  const errorTemplate  = R.path(['errors', 'validation', errorKey], config),
        message        = '[' + R.toUpper(namespace) + '] : ' + errorTemplate.message + ': ' + param,
        displayMessage = errorTemplate.message + ': ' + param,
        property       = param;

  return R.mergeDeepRight(errorTemplate, {
    message,
    displayMessage,
    property
  });
});


const override = R.curry((originalObj, overrideKey, overrideVal) => {
  return R.assoc(overrideKey, overrideVal, originalObj);
});

const recursivelyOmitProps = R.curry((omittedPropsArr, v) => {
  if (!R.is(Object, v)) {
    return v;
  }
  if (!R.is(Array, v)) {
    v = R.omit(omittedPropsArr, v);
  }
  return R.map(recursivelyOmitProps(omittedPropsArr), v);
});

const ensureTrueNullInCsvData = R.map(R.when(R.identical('NULL'), R.always(null)));

// Fix for redis-mock that is misusing EventEmitter
require('events').EventEmitter.prototype._maxListeners = MAX_CONTROLLERS_TO_WHICH_EVENT_EMITTER_SHOULD_LISTEN;

module.exports = {
  illegalParamErr     : validationErr(VALIDATION_ERROR_KEY_ILLEGAL_PARAM),
  missingParamErr     : validationErr(VALIDATION_ERROR_KEY_MISSING_PARAM),
  unsupportedParamErr : validationErr(VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM),
  override,
  recursivelyOmitProps,
  ensureTrueNullInCsvData,
  COMMON_TIMESTAMP,
  COMMON_REQUEST_BODY,
  COMMON_EMPTY_REQUEST_ERROR,
  COMMON_RESPONSE_BODY
};
