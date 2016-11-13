/* @flow */

import R from 'ramda';

import { transformResWithGqlQuery } from '../utils';
import movieInfoFromRes from './movieInfoFromRes';
import TmdbConnector from './connector';
import type { TmdbApi$GetMovieDetailsResponse } from './types';
import type { TmdbConnectorConfig } from './connector';

class Tmdb {
  _connector: TmdbConnector;

  constructor(config: void | TmdbConnectorConfig) {
    this._connector = new TmdbConnector(config);
  }

  getTvShowId = async (query: {
    title?: string,
    year?: number,
    imdbId?: string,
  }) => {
    if (query.imdbId) {
      const res = await this._connector.apiGet(
        `find/${query.imdbId}`,
        { external_source: 'imdb_id' },
      );

      return R.pipe(R.propOr([], 'tv_results'), R.head, R.prop('id'))(res);
    }

    if (query.title) {
      const res = await this._connector.apiGet(
        'search/tv',
        { query: query.title, year: query.year },
      );

      return R.pipe(R.prop('results'), R.head, R.prop('id'))(res);
    }

    return null;
  };

  getMovieId = async (query: {
    title?: string,
    year?: number,
    imdbId?: string,
  }) => {
    if (query.imdbId) {
      const res = await this._connector.apiGet(
        `find/${query.imdbId}`,
        { external_source: 'imdb_id' },
      );

      return R.pipe(R.propOr([], 'movie_results'), R.head, R.prop('id'))(res);
    }

    if (query.title) {
      const res = await this._connector.apiGet(
        'search/movie',
        { query: query.title, year: query.year },
      );

      return R.pipe(R.prop('results'), R.head, R.prop('id'))(res);
    }

    return null;
  };

  getMovieInfo = async (id: number, query: void | string) => {
    const res: ?TmdbApi$GetMovieDetailsResponse = await this._connector.apiGet(
      `movie/${id}`,
      { append_to_response: ['credits', 'keywords', 'videos'].join(',') },
    );

    if (!res) return null;

    return transformResWithGqlQuery(movieInfoFromRes(res), query);
  };
}

export default Tmdb;
