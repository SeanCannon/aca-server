'use strict';

/**
 * Set flash message for client toast or growl.
 * @param {Object} req Node request
 * @param {Object} res Node response
 * @param {Function} next
 */
const setFlash = (req, res, next) => {
  res.locals.flash = {
    notice : req.flash('notice'),
    error  : req.flash('error')
  };
  next();
};

module.exports = setFlash;
