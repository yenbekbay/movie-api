/* @flow */

import R from 'ramda';

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

    return R.path([0, 'movie', 'ids', 'slug'], res);
  };

  getMovieStats = async (id: string) => {
    const res: ?TraktApi$MovieStatsResponse = await this._connector.apiGet(
      `movies/${id}/stats`,
    );

    return res || null;
  };
}

export default Trakt;
