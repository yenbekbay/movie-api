/* @flow */

import { parse as parseUrl } from 'url';
import crypto from 'crypto';
import querystring from 'querystring';

import DataLoader from 'dataloader';
import dateFormat from 'date-fns/format';
import R from 'ramda';
import rp from 'request-promise-native';

import { userAgent } from '../utils';

const KINOPOISK_API_ROOT = 'https://ext.kinopoisk.ru/ios/3.11.0';
const KINOPOISK_API_KEY = 'a17qbcw1du0aedm';
const KINOPOISK_PLUS_ROOT = 'https://plus.kinopoisk.ru';

type Rp = (options: Object) => Promise<any>;
type Loader = { load: (url: string) => Promise<any> };

class KinopoiskConnector {
  apiRp: Rp = rp.defaults({
    headers: {
      'Accept-Encoding': 'gzip',
      'Android-Api-Version': '22',
      'Cache-Control': 'max-stale=0',
      'Image-Scale': '3',
      'User-Agent': 'Android client (5.1 / api22), ru.kinopoisk/3.7.0 (45)',
      cityID: '2',
      clientDate: dateFormat(new Date(), 'HH:mm MM.dd.YYYY'),
      ClientId: crypto
        .createHash('md5')
        .update(String(Math.floor(Math.random() * (99999 + 1))))
        .digest('hex'),
      Cookie: 'user_country=ru',
      countryID: '2',
      device: 'android',
    },
    json: true,
  });
  htmlRp: Rp = rp.defaults({
    headers: { 'User-Agent': userAgent },
    gzip: true,
  });

  apiLoader: Loader = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map(async (url: string) => {
        const json = await this.apiRp({
          uri: url,
          qs: {
            key: crypto
              .createHash('md5')
              // eslint-disable-next-line max-len
              .update(`${(parseUrl(url).path || '').replace('/ios/3.11.0/', '')}${KINOPOISK_API_KEY}`)
              .digest('hex'),
          },
        });

        return R.prop('data')(json);
      }),
    ), {
      batch: false,
    },
  );

  htmlLoader: Loader = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map((url: string) => this.htmlRp({ uri: url })),
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
