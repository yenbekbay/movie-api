/* @flow */

import parent from 'parent-package-json';

const getUserAgent = () => {
  const pathToParent = parent();

  if (pathToParent) {
    const parentPkg = pathToParent.parse();

    if (parentPkg.name) return parentPkg.name;
  }

  return 'movie-api';
};

const userAgent = getUserAgent();

export { userAgent }; // eslint-disable-line import/prefer-default-export
