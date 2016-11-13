/* @flow */

import { transformResWithGqlQuery } from '../utils';
import creditsFromRes from './creditsFromRes';
import galleryFromRes from './galleryFromRes';
import idFromSearchResults from './idFromSearchResults';
import infoFromRes from './infoFromRes';
import infoListFromRes from './infoListFromRes';
import KinopoiskConnector from './connector';
import type {
  KinopoiskApi$GetFilmResponse,
  KinopoiskApi$GetFilmsListResponse,
  KinopoiskApi$GetGalleryResponse,
  KinopoiskApi$GetStaffResponse,
} from './types';
import type { Endpoint } from './connector';
import type { SearchQuery } from './idFromSearchResults';

class Kinopoisk {
  _connector: KinopoiskConnector;

  constructor() {
    this._connector = new KinopoiskConnector();
  }

  getInfo = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmResponse = await this._connector.apiGet(
      'getKPFilmDetailView', { filmID: id, still_limit: 100, sr: 1 },
    );

    if (!res) return null;

    return transformResWithGqlQuery(infoFromRes(res), query);
  };

  getId = async (query: SearchQuery): Promise<?number> => {
    const html = await this._connector.htmlGet(
      `search/${query.isTvShow ? 'series' : 'films'}`,
      { text: query.title },
    );

    return idFromSearchResults(html, query);
  };

  getCredits = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetStaffResponse =
      await this._connector.apiGet('getStaffList', { filmID: id });

    if (!res) return null;

    return transformResWithGqlQuery(creditsFromRes(res), query);
  };

  getGallery = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetGalleryResponse =
      await this._connector.apiGet('getGallery', { filmID: id });

    if (!res) return null;

    return transformResWithGqlQuery(galleryFromRes(res), query);
  };

  getSimilar = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmsListResponse =
      await this._connector.apiGet('getKPFilmsList', {
        filmID: id,
        type: 'kp_similar_films',
      });

    if (!res) return null;

    return transformResWithGqlQuery(infoListFromRes(res), query);
  };
}

export default Kinopoisk;
