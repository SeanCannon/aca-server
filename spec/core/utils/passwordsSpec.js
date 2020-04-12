'use strict';

const R = require('ramda');

const passwordUtils = require('../../../server/core/utils/password');

const FAKE_SALT_ROUNDS_EXPONENT = 2,
      FAKE_PLAINTEXT            = 'testtest',
      FAKE_EXPECTED_ENCRYPTED   = '143e7f5d339cb7665504e0053796a019',
      FAKE_PASSWORD             = 'foobar',
      FAKE_WRONG_PASSWORD       = 'barfoo',
      EXPECTED_HASH_LENGTH      = 60,
      EXPECTED_ENCRYPTED_LENGTH = 32;

describe('password utils', () => {

  it('creates a hash when given a salting exponent', () => {
    const hash = passwordUtils.makePasswordHash(FAKE_PASSWORD, FAKE_SALT_ROUNDS_EXPONENT);
    expect(R.length(hash)).toBe(EXPECTED_HASH_LENGTH);
  });

  it('creates a hash when given no exponent', () => {
    const hash = passwordUtils.makePasswordHash(FAKE_PASSWORD, null);
    expect(R.length(hash)).toBe(EXPECTED_HASH_LENGTH);
  });

  it('validates a hash when given expected password', () => {
    const hash = passwordUtils.makePasswordHash(FAKE_PASSWORD, null);
    expect(passwordUtils.passwordMatchesHash(FAKE_PASSWORD, hash)).toBe(true);
  });

  it('invalidates a hash when given incorrect password', () => {
    const hash = passwordUtils.makePasswordHash(FAKE_PASSWORD, null);
    expect(passwordUtils.passwordMatchesHash(FAKE_WRONG_PASSWORD, hash)).toBe(false);
  });

  it('encrypts a string', () => {
    expect(passwordUtils.encrypt(FAKE_PLAINTEXT, FAKE_PASSWORD).length).toBe(EXPECTED_ENCRYPTED_LENGTH);
  });

  it('decrypts an encrypted string when given the correct password', () => {
    expect(passwordUtils.decrypt(FAKE_EXPECTED_ENCRYPTED, FAKE_PASSWORD)).toBe(FAKE_PLAINTEXT);
  });
});
