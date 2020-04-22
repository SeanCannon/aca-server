'use strict';

const express  = require('express'),
      router   = express.Router(),
      logger   = require('../../services/log/Log'),
      apiUtils = require('../../utils/api');

const getRenders   = require('../../controllers/api/render/getRenders'),
      createRender = require('../../controllers/api/render/createRender');

const maybeParseIntFromPath = require('../../controllers/api/_helpers/maybeParseIntFromPath');

const ensureAuthorized = (req, res, next) => next();
// const ensureAuthorized = require('../../middleware/ensureAuthorized')(apiUtils);

// https://api.animalcrossingart/com/v1/render/met/latest?limit=20&offset=240
router.get('/:galleryStrategyKey/latest', ensureAuthorized, (req, res) => {
  const { galleryStrategyKey } = req.params;

  const limit  = maybeParseIntFromPath(['query', 'limit'],  req);
  const offset = maybeParseIntFromPath(['query', 'offset'], req);

  apiUtils.respondWithErrorHandling(
    req,
    res,
    logger({ galleryStrategyKey, limit, offset }),
    'search',
    () => getRenders({ galleryStrategyKey, limit, offset })
  );
});

// https://api.animalcrossingart/com/v1/render
router.post('/', ensureAuthorized, (req, res) => {

  const { galleryStrategyKey, image } = req.body;
  const galleryItemId                 = maybeParseIntFromPath(['body', 'galleryItemId'])(req);
  const authorIp                      = req.headers['x-forwarded-for'];

  apiUtils.respondWithErrorHandling(
    req,
    res,
    logger({ image : '[omitted]', galleryStrategyKey, galleryItemId, authorIp }),
    'createRender',
    () => createRender({ logger })({ image, galleryStrategyKey, galleryItemId, authorIp })
  );
});

module.exports = router;
