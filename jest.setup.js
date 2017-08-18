const dotenv = require('dotenv'); // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line no-process-env
if (!('CI' in process.env)) {
  dotenv.config();
}
