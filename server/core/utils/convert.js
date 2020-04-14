'use strict';

const { spawn } = require('child_process');

/**
 * convert
 * @param {Buffer} source
 * @return {Promise<Buffer>}
 */
const convert = source => {
  return new Promise((resolve, reject) => {
    try {
      const options = [
        '-alpha set',
        '-background none',
        '-channel A',
        '-depth 16',
        '-resize 32x32',
        '-',
        'PNG:-'
      ];
      const convertProcess = spawn('convert', options.join(' ').split(' '));
      const buffer = [];

      convertProcess.stdout.on('data', (data) => buffer.push(Buffer.from(data)));
      convertProcess.stdout.on('end', () => resolve(Buffer.concat(buffer)));

      convertProcess.stderr.on('data', (data) => reject(data.toString()));
      convertProcess.stdin.end(source);

    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  convert
};
