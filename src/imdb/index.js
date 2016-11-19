/* @flow */

import R from 'ramda';

import ImdbConnector from './connector';
import type { ImdbConnectorConfig } from './connector';

class Imdb {
  _connector: ImdbConnector;

  constructor(config: void | ImdbConnectorConfig) {
    this._connector = new ImdbConnector(config);
  }

  getRating = async (imdbId: string) => {
    const res = await this._connector.ratingsGet(imdbId);

    return R.pipe(
      R.propOr('{}', '1'),
      JSON.parse,
      R.prop('resource'),
      (resource: ?Object) => (
        !resource ? {} : {
          imdbRating: resource.rating,
          imdbRatingVoteCount: resource.ratingCount,
        }
      ),
    )(res.match(/^imdb\.rating\.run\((.*)\)$/));
  };
}

export default Imdb;
