/* @flow */

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
    const res: string = await this._connector.ratingsGet(imdbId);
    const rawJson: ?string =
      (res.match(/^imdb\.rating\.run\((.*)\)$/) || [])[1];
    const json: ?{
      resource?: {
        ratingCount: number,
        rating: number,
      },
    } = rawJson ? JSON.parse(rawJson) : null;
    const resource = json ? json.resource : null;

    return {
      imdbRating: resource ? resource.rating : NaN,
      imdbRatingVoteCount: resource ? resource.ratingCount : NaN,
    };
  };

  getPopularity = async (imdbId: string) => {
    const $ = await this._connector.htmlGet(`title/${imdbId}`);
    const popularityHtml: ?string =
      $('.titleReviewBar > div:last-child .titleReviewBarSubItem .subText').html(); // eslint-disable-line max-len
    const popularityText: ?string = popularityHtml
      ? (popularityHtml.replace(',', '').match(/\d+/) || [])[0]
      : null;

    return popularityText ? parseInt(popularityText, 10) : NaN;
  };
}

export default Imdb;
