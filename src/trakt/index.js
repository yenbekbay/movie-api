/* @flow */

import R from 'ramda';

import { transformResWithGqlQuery } from '../utils';
import TraktConnector from './connector';
import type { TraktApi$MovieStatsResponse } from './types';
import type { TraktConnectorConfig } from './connector';

class Trakt {
  _connector: TraktConnector;

  constructor(config: void | TraktConnectorConfig) {
    this._connector = new TraktConnector(config);
  }

  getId = async (query: {
    imdbId: string,
  }) => {
    const res = await this._connector.apiGet(`search/imdb/${query.imdbId}`);

    return R.pipe(
      R.head,
      R.path(['movie', 'ids', 'slug']),
    )(res || []);
  };

  getMovieStats = async (id: string, query: void | string) => {
    const res: ?TraktApi$MovieStatsResponse = await this._connector.apiGet(
      `movies/${id}/stats`,
    );

    if (!res) return null;

    return transformResWithGqlQuery(res, query);
  };
}

export default Trakt;
