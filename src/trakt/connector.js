/* @flow */

import DataLoader from 'dataloader';
import PromiseThrottle from 'promise-throttle';
import rp from 'request-promise-native';

import {userAgent} from '../utils';
import env from '../env';

const TRAKT_API_ROOT = 'https://api.trakt.tv';
const TRAKT_API_VERSION = 2;

export type TraktConnectorConfig = {
  apiKey?: string,
};

class TraktConnector {
  _apiKey: string;
  _language: string;
  _rp: (options: Object) => Promise<any>;

  constructor({apiKey}: TraktConnectorConfig = {}) {
    this._apiKey = apiKey || env.getTraktApiKey();

    this._rp = rp.defaults({
      headers: {
        'User-Agent': userAgent,
        'trakt-api-version': TRAKT_API_VERSION,
        'trakt-api-key': this._apiKey,
      },
      gzip: true,
      json: true,
    });
  }

  _throttleQueue = new PromiseThrottle({
    requestsPerSecond: 3,
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

  apiGet = (endpoint: string, query: void | {[key: string]: mixed}) =>
    this.apiLoader.load(
      JSON.stringify({
        uri: `${TRAKT_API_ROOT}/${endpoint}`,
        qs: query || {},
      }),
    );
}

export default TraktConnector;
