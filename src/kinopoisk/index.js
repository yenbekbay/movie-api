/* @flow */

import { transformResWithGqlQuery } from '../utils';
import filmCreditsFromRes from './filmCreditsFromRes';
import filmGalleryFromRes from './filmGalleryFromRes';
import filmIdFromSearchResults from './filmIdFromSearchResults';
import filmInfoFromRes from './filmInfoFromRes';
import filmInfoListFromRes from './filmInfoListFromRes';
import KinopoiskConnector from './connector';
import type {
  KinopoiskApi$GetFilmResponse,
  KinopoiskApi$GetFilmsListResponse,
  KinopoiskApi$GetGalleryResponse,
  KinopoiskApi$GetStaffResponse,
} from './types';
import type { SearchQuery } from './filmIdFromSearchResults';

class Kinopoisk {
  _connector: KinopoiskConnector;

  constructor() {
    this._connector = new KinopoiskConnector();
  }

  getFilmInfo = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmResponse = await this._connector.apiGet(
      'getKPFilmDetailView', { filmID: id, still_limit: 100, sr: 1 },
    );

    if (!res) return null;

    return transformResWithGqlQuery(filmInfoFromRes(res), query);
  };

  getFilmId = async (query: SearchQuery): Promise<?number> => {
    const html = await this._connector.htmlGet(
      `search/${query.isTvShow ? 'series' : 'films'}`,
      { text: query.title },
    );

    return filmIdFromSearchResults(html, query);
  };

  getFilmCredits = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetStaffResponse =
      await this._connector.apiGet('getStaffList', { filmID: id });

    if (!res) return null;

    return transformResWithGqlQuery(filmCreditsFromRes(res), query);
  };

  getFilmGallery = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetGalleryResponse =
      await this._connector.apiGet('getGallery', { filmID: id });

    if (!res) return null;

    return transformResWithGqlQuery(filmGalleryFromRes(res), query);
  };

  getSimilarFilms = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmsListResponse =
      await this._connector.apiGet('getKPFilmsList', {
        filmID: id,
        type: 'kp_similar_films',
      });

    if (!res) return null;

    return transformResWithGqlQuery(filmInfoListFromRes(res), query);
  };
}

export default Kinopoisk;
