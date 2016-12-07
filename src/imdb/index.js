/* @flow */

import R from 'ramda';

import ImdbConnector from './connector';
import type { ImdbConnectorConfig } from './connector';

type ImdbRating = {
  imdbRating: ?number,
  imdbRatingVoteCount: ?number,
};

class Imdb {
  _connector: ImdbConnector;

  constructor(config: void | ImdbConnectorConfig) {
    this._connector = new ImdbConnector(config);
  }

  getRating = async (imdbId: string): Promise<ImdbRating> => {
    const res = await this._connector.ratingsGet(imdbId);

    return R.pipe(
      R.propOr('{}', '1'),
      JSON.parse,
      R.prop('resource'),
      (resource: ?Object) => ({
        imdbRating: resource ? resource.rating : NaN,
        imdbRatingVoteCount: resource ? resource.ratingCount : NaN,
      }),
    )(res.match(/^imdb\.rating\.run\((.*)\)$/));
  };

  getPopularity = async (imdbId: string) => {
    const $ = await this._connector.htmlGet(`title/${imdbId}`);

    const popularity = $(
      '.titleReviewBar > div:last-child .titleReviewBarSubItem .subText',
    ).html();

    return popularity
      ? (parseInt(
          R.head(popularity.replace(',', '').match(/\d+/) || []),
          10,
        ) || null)
      : null;
  };
}

export default Imdb;
