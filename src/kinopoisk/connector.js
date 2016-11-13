/* @flow */

import crypto from 'crypto';
import querystring from 'querystring';

import DataLoader from 'dataloader';
import moment from 'moment';
import R from 'ramda';
import rp from 'request-promise-native';

import { userAgent } from '../utils';

const KINOPOISK_API_ROOT = 'https://ext.kinopoisk.ru/ios/3.11.0';
const KINOPOISK_API_KEY = 'a17qbcw1du0aedm';
const KINOPOISK_PLUS_ROOT = 'https://plus.kinopoisk.ru';

type Endpoint =
 // Movie info
 | 'getGallery'
 | 'getStaffList'
 | 'getKPFilmDetailView'
 | 'getKPFilmsList'
 | 'getKPPeopleDetailView'
 // Genres
 | 'getKPGenresView'
 | 'getKPTopGenre'
 // Reviews
 | 'getKPReviews'
 | 'getKPReviewDetail'
 // News
 | 'getKPNewsView'
 | 'getKPNewsDetail'
 // Coming soon
 | 'getKPSoonFilms'
 | 'getKPSoonDVD'
 | 'getDatesForSoonFilms'
 | 'getDatesForSoonDVD'
 // Showtimes
 | 'getKPTodayFilms'
 | 'getKPCinemas'
 | 'getKPCinemaDetailView'
 | 'getSeance'
 | 'getDatesForDetailCinema'
 | 'getDatesForSeance'
 // Top
 | 'getKPTop'
 | 'getPopularIndex'
 // Search
 | 'getKPGlobalSearch'
 | 'getKPLiveSearch'
 | 'getKPSearchInCinemas'
 | 'getKPSearchInFilms'
 | 'getKPSearchInPeople'
 | 'navigator'
 | 'navigatorFilters'
 // Geo Reference
 | 'getKPCountryView'
 | 'getKPAllCitiesView';

const applyQueryToUrl = (
  url: string,
  query: { [key: string]: mixed } = {},
) => `${url}?${querystring.stringify(query)}`;

type Rp = (options: Object) => Promise<any>;
type Loader = { load: (url: string) => Promise<any> };

class KinopoiskConnector {
  _apiRp: Rp = rp.defaults({
    headers: {
      'Android-Api-Version': '22',
      'Cache-Control': 'max-stale=0',
      'Image-Scale': '3',
      'User-Agent': 'Android client (5.1 / api22), ru.kinopoisk/3.7.0 (45)',
      cityID: '1',
      clientDate: moment(new Date()).format('HH:mm MM.dd.YYYY'),
      ClientId: crypto
        .createHash('md5')
        .update(String(Math.floor(Math.random() * (99999 + 1))))
        .digest('hex'),
      countryID: '2',
      device: 'android',
    },
    timeout: 4000,
    json: true,
    gzip: true,
    jar: true,
  });

  _htmlRp: Rp = rp.defaults({
    headers: { 'User-Agent': userAgent },
    gzip: true,
  });

  apiLoader: Loader = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map(async (url: string) => this._apiRp({
        uri: url,
        qs: {
          key: crypto
            .createHash('md5')
            // eslint-disable-next-line max-len
            .update(`${url.replace(`${KINOPOISK_API_ROOT}/`, '')}${KINOPOISK_API_KEY}`)
            .digest('hex'),
        },
      })),
    ), {
      batch: false,
    },
  );

  htmlLoader: Loader = new DataLoader(
    (urls: Array<string>) => Promise.all(
      urls.map((url: string) => this._htmlRp({ uri: url })),
    ), {
      batch: false,
    },
  );

  apiGet = async (
    endpoint: Endpoint,
    query: void | { [key: string]: mixed },
  ) => {
    const json = await this.apiLoader.load(
      applyQueryToUrl(
        `${KINOPOISK_API_ROOT}/${endpoint}`, query,
      ),
    );

    return R.prop('data')(json);
  };

  htmlGet = (
    path: string,
    query: void | { [key: string]: mixed },
  ) => this.htmlLoader.load(
    applyQueryToUrl(`${KINOPOISK_PLUS_ROOT}/${path}`, query),
  );
}

export default KinopoiskConnector;
