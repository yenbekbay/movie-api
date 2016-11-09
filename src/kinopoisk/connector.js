/* @flow */

import querystring from 'querystring';

import DataLoader from 'dataloader';
import rp from 'request-promise-native';

const KINOPOISK_API_ROOT = 'https://api.kinopoisk.cf';
const KINOPOISK_PLUS_ROOT = 'https://plus.kinopoisk.ru';

type Loader = { load: (url: string) => Promise<any> };

class KinopoiskConnector {
  rp: (options: Object) => Promise<any> = rp.defaults({
    headers: { 'User-Agent': 'movie-api' },
    gzip: true,
  });

  apiLoader: Loader = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map((url: string) => this.rp({ uri: url, json: true })),
    ), {
      // The Kinopoisk API doesn't have batching, so we should send requests
      // as soon as we know about them
      batch: false,
    },
  );

  htmlLoader: Loader = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map((url: string) => this.rp({ uri: url })),
    ), {
      batch: false,
    },
  );

  apiGet(endpoint: string, query: { [key: string]: mixed }) {
    return this.apiLoader.load(
      `${KINOPOISK_API_ROOT}/${endpoint}?${querystring.stringify(query)}`,
    );
  }

  htmlGet(path: string, query: ?{ [key: string]: mixed }) {
    return this.htmlLoader.load(
      `${KINOPOISK_PLUS_ROOT}/${path}${
        query ? `?${querystring.stringify(query)}` : ''
      }`,
    );
  }
}

const connector = new KinopoiskConnector();

export { KinopoiskConnector };
export default connector;
