/* @flow */

import { transformResWithGqlQuery } from '../utils';
import creditsFromRes from './creditsFromRes';
import idFromSearchResults from './idFromSearchResults';
import infoFromRes from './infoFromRes';
import KinopoiskConnector from './connector';
import type {
  KinopoiskApi$GetFilmResponse,
  KinopoiskApi$GetStaffResponse,
} from './types';
import type { SearchQuery } from './idFromSearchResults';

class Kinopoisk {
  _connector: KinopoiskConnector;

  constructor() {
    this._connector = new KinopoiskConnector();
  }

  getInfo = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmResponse = await this._connector.apiGet(
      'getKPFilmDetailView', { filmID: id, still_limit: 100 },
    );

    if (!res) return null;

    return transformResWithGqlQuery(infoFromRes(res, query), query);
  }

  getId = async (query: SearchQuery): Promise<?number> => {
    const html = await this._connector.htmlGet(
      `search/${query.isTvShow ? 'series' : 'films'}`,
      { text: query.title },
    );

    return idFromSearchResults(html, query);
  }

  getCredits = async (id: number, query: void | string) => {
    const res: ?KinopoiskApi$GetStaffResponse =
      await this._connector.apiGet('getStaffList', { filmID: id });

    if (!res) return null;

    return transformResWithGqlQuery(creditsFromRes(res), query);
  }
}

export default Kinopoisk;
