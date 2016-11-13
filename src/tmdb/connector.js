/* @flow */

import querystring from 'querystring';

import DataLoader from 'dataloader';
import rp from 'request-promise-native';

import { userAgent } from '../utils';
import env from '../env';

const TMDB_API_ROOT = 'https://api.themoviedb.org/3';

export type TmdbConnectorConfig = {
  apiKey?: string,
  language: string,
};

class TmdbConnector {
  _apiKey: string;
  _language: string;
  _rp: (options: Object) => Promise<any>;

  constructor({ apiKey, language = 'ru' }: TmdbConnectorConfig = {}) {
    this._apiKey = apiKey || env.getTmdbApiKey();
    this._language = language;

    this._rp = rp.defaults({
      headers: { 'User-Agent': userAgent },
      gzip: true,
      qs: {
        api_key: this._apiKey,
        language: this._language,
      },
    });
  }

  apiLoader: { load: (url: string) => Promise<any> } = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map((url: string) => this._rp({ uri: url, json: true })),
    ), {
      // The TMDB API doesn't have batching, so we should send requests
      // as soon as we know about them
      batch: false,
    },
  );

  apiGet = (
    endpoint: string,
    query: { [key: string]: mixed },
  ) => this.apiLoader.load(
    `${TMDB_API_ROOT}/${endpoint}?${querystring.stringify(query)}`,
  );
}

export default TmdbConnector;
