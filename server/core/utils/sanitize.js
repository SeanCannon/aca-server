'use strict';

const R   = require('ramda'),
      prr = require('prettycats');

const sanitizeHtml = str => {
  const lt = R.replace(/</g, '&lt;'),
        gt = R.replace(/>/g, '&gt;');

  return R.compose(gt, lt)(str);
};

const maybeSanitizeHtml = R.when(prr.isString, sanitizeHtml);

module.exports = {
  sanitizeHtml,
  maybeSanitizeHtml
};
