/* @flow */

import querystring from 'querystring';

import DataLoader from 'dataloader';
import rp from 'request-promise-native';

const KINOPOISK_API_ROOT = 'http://api.kinopoisk.cf';

class KinopoiskConnector {
  rp: (options: Object) => Promise<any>;
  loader: { load: (url: string) => Promise<any> };

  constructor() {
    this.rp = rp.defaults({
      headers: { 'User-Agent': 'movie-api' },
      gzip: true,
      json: true,
    });
    this.loader = new DataLoader(this.fetch.bind(this), {
      // The Kinoposik API doesn't have batching, so we should send requests as
      // soon as we know about them
      batch: false,
    });
  }

  fetch(urls: Array<string>) {
    return Promise.all(urls.map((url: string) => this.rp({ uri: url })));
  }

  get(endpoint: string, query: { [key: string]: mixed }) {
    return this.loader.load(
      `${KINOPOISK_API_ROOT}/${endpoint}?${querystring.stringify(query)}`,
    );
  }
}

const connector = new KinopoiskConnector();

export { KinopoiskConnector };
export default connector;
