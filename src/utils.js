/* @flow */

import querystring from 'querystring';

import parent from 'parent-package-json';

const getUserAgent = () => {
  const pathToParent = parent();

  if (pathToParent) {
    const parentPkg = pathToParent.parse();

    if (parentPkg.name) return parentPkg.name;
  }

  return 'movie-api';
};

const applyQueryToUrl = (
  url: string,
  query: { [key: string]: mixed } = {},
) => `${url}?${querystring.stringify(query)}`;

const userAgent = getUserAgent();

export { userAgent, applyQueryToUrl };
