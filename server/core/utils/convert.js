'use strict';

const fs        = require('fs'),
      uuidv4    = require('uuid/v4'),
      path      = require('path'),
      { spawn } = require('child_process');

/**
 * convert
 * @param {Buffer} source
 * @return {Promise<Buffer>}
 */
const convert = source => {
  return new Promise((resolve, reject) => {
    try {
      const options = [
        '-resize 32x32',
        '-background transparent',
        '-gravity center',
        '-extent 32x32',
        '-',
        'PNG:-'
      ];

      const convertProcess = spawn('convert', options.join(' ').split(' '));
      const resBuffer      = [];
      const image          = `${uuidv4()}.png`;
      const fileStream     = fs.createWriteStream(path.resolve(__dirname, `../../../renders/${image}`));

      convertProcess.stdout.on('data', data => {
        fileStream.write(data);
        console.log('data!', { data })
        resBuffer.push(Buffer.from(data));
      });

      convertProcess.stdout.on('end', () => {
        fileStream.end();
        console.log('end!')
        resolve({ image, buffer : Buffer.concat(resBuffer) });
      });

      convertProcess.stderr.on('data', data => {
        console.log('error!!', { data })
        fileStream.end();
        reject(data.toString());
      });

      convertProcess.stdin.end(source);

    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  convert
};
