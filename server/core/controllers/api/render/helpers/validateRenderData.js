'use strict';

/* This is pre-model validation. Provided image is a base64 string at this point */

const R   = require('ramda'),
      V   = require('o-validator'),
      prr = require('prettycats');

const validate = require('../../../../utils/validatePayload')('renderData');

const isBase64 = R.compose(
  R.test(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/),
  R.last,
  R.split(','),
  R.defaultTo('')
);

const validateForInsert = validate({
  image              : V.required(isBase64),
  galleryStrategyKey : V.required(prr.isStringOfLengthAtMost(20)),
  galleryItemId      : V.required(prr.isPositiveNumber),
  authorIp           : prr.isString
});

module.exports = {
  validateForInsert
};
