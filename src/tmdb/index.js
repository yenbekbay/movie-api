/* @flow */

import R from 'ramda';

import movieInfoFromRes from './movieInfoFromRes';
import TmdbConnector from './connector';
import tvShowInfoFromRes from './tvShowInfoFromRes';
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

      return R.pipe(R.propOr([], 'tv_results'), R.path([0, 'id']))(res);
    }

    if (query.title) {
      const res = await this._connector.apiGet(
        'search/tv',
        { query: query.title, year: query.year },
      );

      return R.pipe(R.propOr([], 'results'), R.path([0, 'id']))(res);
    }

    throw new Error('Either an IMDB ID or a title required in query');
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

      return R.pipe(R.propOr([], 'movie_results'), R.path([0, 'id']))(res);
    }

    if (query.title) {
      const res = await this._connector.apiGet(
        'search/movie',
        { query: query.title, year: query.year },
      );

      return R.pipe(R.propOr([], 'results'), R.path([0, 'id']))(res);
    }

    throw new Error('Either an IMDB ID or a title required in query');
  };

  getMovieInfo = async (id: number, language: void | string) => {
    const res: ?TmdbApi$GetMovieDetailsResponse = await this._connector.apiGet(
      `movie/${id}`,
      {
        append_to_response: ['credits', 'keywords', 'videos'].join(','),
        language: language || undefined,
      },
    );

    return res ? movieInfoFromRes(res) : null;
  };

  getTvShowInfo = async (id: number, language: void | string) => {
    const res: ?Object = await this._connector.apiGet(
      `tv/${id}`,
      {
        append_to_response: ['credits', 'keywords', 'videos'].join(','),
        language: language || undefined,
      },
    );

    return res ? tvShowInfoFromRes(res) : null;
  };
}

export default Tmdb;
