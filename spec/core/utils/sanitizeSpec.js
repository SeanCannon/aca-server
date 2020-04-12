'use strict';

var sanitize = require('../../../server/core/utils/sanitize');

var STRING_CONTAINING_HTML = '<font color="mauve">Win</font>',
    STRING_ABSENT_HTML     = 'Hello world',
    STRING_SANITIZED_HTML  = '&lt;font color="mauve"&gt;Win&lt;/font&gt;',
    A_NUMBER               = 1337;

describe('sanitizeHtml', () => {
  it('replaces HTML with encoded text', () => {
    expect(sanitize.sanitizeHtml(STRING_CONTAINING_HTML)).toBe(STRING_SANITIZED_HTML);
  });
  it('ignores non-html text', () => {
    expect(sanitize.sanitizeHtml(STRING_ABSENT_HTML)).toBe(STRING_ABSENT_HTML);
  });
});

describe('maybeSanitizeHtml', () => {
  it('replaces HTML with encoded text when given a string', () => {
    expect(sanitize.maybeSanitizeHtml(STRING_CONTAINING_HTML)).toBe(STRING_SANITIZED_HTML);
  });
  it('returns given value when said value is not of type String', () => {
    expect(sanitize.maybeSanitizeHtml(A_NUMBER)).toBe(A_NUMBER);
  });
});
