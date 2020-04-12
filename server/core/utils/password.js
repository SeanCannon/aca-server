'use strict';

const bcrypt = require('bcrypt'),
      crypto = require('crypto');

const SALT_ROUNDS_EXPONENT = 10,
      ALGORITHM            = 'aes-256-ctr';

/**
 * Encrypt a string
 * @param {String} text
 * @param {String} secret
 * @returns {String}
 */
const encrypt = (text, secret) => {
  const iv        = crypto.randomBytes(16).toString('hex').slice(0, 16);
  const key       = crypto.createHash('sha256').update(String(secret)).digest();
  const cipher    = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

  return iv + encrypted;
};

/**
 * Decrypt an encrypted string
 * @param {String} text
 * @param {String} secret
 * @returns {String}
 */
const decrypt = (text, secret) => {
  const iv        = text.slice(0, 16);
  const key       = crypto.createHash('sha256').update(String(secret)).digest();
  const encrypted = text.slice(16);
  const decipher  = crypto.createDecipheriv(ALGORITHM, key, iv);

  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
};

/**
 * Create a hash from a provided plaintext password.
 * @param {String} plaintextPassword
 * @param {Number} saltRoundsExponent The higher, the more secure and slower.
 * @returns {String}
 */
const makePasswordHash = (plaintextPassword, saltRoundsExponent) => {
  const salt = bcrypt.genSaltSync(saltRoundsExponent || SALT_ROUNDS_EXPONENT);
  return bcrypt.hashSync(plaintextPassword, salt);
};

/**
 * Returns true if a provided password matches the provided hash.
 * @returns {Boolean}
 */
const passwordMatchesHash = bcrypt.compareSync;

module.exports = {
  makePasswordHash,
  passwordMatchesHash,
  encrypt,
  decrypt
};
