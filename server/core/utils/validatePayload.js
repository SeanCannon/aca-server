'use strict';

const V      = require('o-validator'),
      R      = require('ramda'),
      config = require('config');

const _customErrorHandler = R.curry((identifier, errors) => {
  const firstError    = R.head(errors),
        errorTemplate = R.path(['errors', 'validation', firstError.errorCode], config),
        errorMessage  = errorTemplate.message + ': ' + firstError.property,
        error         = R.mergeDeepRight(errorTemplate, {
          message        : '[' + R.toUpper(identifier) + '] : ' + errorMessage,
          displayMessage : errorMessage,
          property       : firstError.property
        });

  throw error;
});

const validateWithIdentifier = R.curry((identifier, schema, props) => {
  return V.validateWithErrorHandler(_customErrorHandler(identifier), schema, props);
});

module.exports = validateWithIdentifier;
