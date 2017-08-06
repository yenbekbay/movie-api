/* @flow */

import DataLoader from 'dataloader';
import PromiseThrottle from 'promise-throttle';
import rp from 'request-promise-native';

import {userAgent} from '../utils';
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

  constructor({apiKey, language = 'ru'}: TmdbConnectorConfig = {}) {
    this._apiKey = apiKey || env.getTmdbApiKey();
    this._language = language;

    this._rp = rp.defaults({
      headers: {'User-Agent': userAgent},
      gzip: true,
      qs: {
        api_key: this._apiKey,
        language: this._language,
      },
      json: true,
    });
  }

  _throttleQueue = new PromiseThrottle({
    requestsPerSecond: 3, // TMDB's rate limit is 40 requests / 10 seconds
    promiseImplementation: Promise,
  });

  apiLoader: DataLoader<string, any> = new DataLoader(
    (optionsHashes: Array<string>) =>
      this._throttleQueue.addAll(
        optionsHashes.map((optionsHash: string) => () =>
          this._rp(JSON.parse(optionsHash)),
        ),
      ),
    {
      batch: false,
    },
  );

  apiGet = (endpoint: string, query: {[key: string]: mixed}) =>
    this.apiLoader.load(
      JSON.stringify({
        uri: `${TMDB_API_ROOT}/${endpoint}`,
        qs: query,
      }),
    );
}

export default TmdbConnector;
