/* @flow */

import querystring from 'querystring';

import gql from 'graphql-tag';
import graphql from 'graphql-anywhere';
import parent from 'parent-package-json';
import R from 'ramda';

const getUserAgent = () => {
  const pathToParent = parent();

  if (pathToParent) {
    const parentPkg = pathToParent.parse();

    if (parentPkg.name) return parentPkg.name;
  }

  return 'movie-api';
};

const transformResWithGqlQuery = (res: Object, query: ?string): Object => (
  query ? graphql(R.prop, gql`${query}`, res) : res
);

const applyQueryToUrl = (
  url: string,
  query: { [key: string]: mixed } = {},
) => `${url}?${querystring.stringify(query)}`;

const userAgent = getUserAgent();

export { transformResWithGqlQuery, userAgent, applyQueryToUrl };
