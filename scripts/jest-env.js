/* @flow */

// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

if (!('CI' in process.env)) {
  dotenv.config();
}
