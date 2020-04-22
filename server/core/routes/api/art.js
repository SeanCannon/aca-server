'use strict';

const express  = require('express'),
      router   = express.Router(),
      logger   = require('../../services/log/Log'),
      apiUtils = require('../../utils/api');

const getItemById = require('../../controllers/api/art/getItemById'),
      search      = require('../../controllers/api/art/search');

const maybeParseIntFromPath = require('../../controllers/api/_helpers/maybeParseIntFromPath');

const ensureAuthorized = (req, res, next) => next();
// const ensureAuthorized = require('../../middleware/ensureAuthorized')(apiUtils);

// https://api.animalcrossingart/com/v1/art/met/search?foo=bar&baz=bat
router.get('/:strategy/search', ensureAuthorized, (req, res) => {

  const { strategy } = req.params;
  const { query }    = req;

  const ArtSvc = require('../../services/art/Art')(strategy);

  apiUtils.respondWithErrorHandling(
    req,
    res,
    logger({ strategy, query }),
    'search',
    () => search({ ArtSvc, logger })({ query })
  );
});


// https://api.animalcrossingart/com/v1/art/met/item/itemId?foo=bar&baz=bat
router.get('/:strategy/item/:itemId', ensureAuthorized, (req, res) => {

  const itemId       = maybeParseIntFromPath(['params', 'itemId'], req);
  const { strategy } = req.params;

  const ArtSvc = require('../../services/art/Art')(strategy);

  apiUtils.respondWithErrorHandling(
    req,
    res,
    logger({ strategy, itemId }),
    'getItemById',
    () => getItemById({ ArtSvc, logger })(itemId)
  );
});

// https://api.animalcrossingart/com/v1/art/met/items
router.post('/:strategy/items', ensureAuthorized, (req, res) => {

  const { itemIds }  = req.body;
  const { strategy } = req.params;

  const ArtSvc = require('../../services/art/Art')(strategy);

  apiUtils.respondWithErrorHandling(
    req,
    res,
    logger({ strategy, itemIds }),
    'getItemsByIds',
    () => Promise.all((itemIds || []).map(getItemById({ ArtSvc, logger })))
  );
});

module.exports = router;
