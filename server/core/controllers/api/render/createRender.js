'use strict';

const R             = require('ramda'),
      { writeFile } = require('fs'),
      path          = require('path'),
      uuidv4        = require('uuid/v4');

const _createRender         = require('../../../models/render/methods/createRender'),
      { validateForInsert } = require('./helpers/validateRenderData');

const maybeWriteBase64ToFileAndUseFileName = filename => ({ galleryStrategyKey, galleryItemId, authorIp, image }) => {
  const base64Image = R.compose(
    R.last,
    R.split(','),
    R.defaultTo('')
  )(image);

  const imageBuffer = Buffer.from(base64Image, 'base64');

  writeFile(path.resolve(__dirname, `../../../../../renders/${filename}`), imageBuffer, () => {});

  return { galleryStrategyKey, galleryItemId, authorIp, image : filename };
};

const createRender = ({ logger }) => data => {
  console.log({ data });

  const filename = `${uuidv4()}.png`;

  return Promise.resolve(data)
    .then(validateForInsert)
    .then(maybeWriteBase64ToFileAndUseFileName(filename))
    .then(_createRender)
    .then(R.always({ filename }))
    .catch(err => {
      logger().error(err);
      throw err;
    });
};

module.exports = createRender;
