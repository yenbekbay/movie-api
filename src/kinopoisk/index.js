/* @flow */

import { transformResWithGqlQuery } from '../utils';
import filmCreditsFromRes from './filmCreditsFromRes';
import filmGalleryFromRes from './filmGalleryFromRes';
import filmIdFromSearchResults from './filmIdFromSearchResults';
import filmInfoFromRes from './filmInfoFromRes';
import filmInfoListFromRes from './filmInfoListFromRes';
import KinopoiskConnector from './connector';
import type {
  KinopoiskApi$City,
  KinopoiskApi$Country,
  KinopoiskApi$GetAllCitiesViewResponse,
  KinopoiskApi$GetCountryViewResponse,
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

  getFilmInfo = async (filmId: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmResponse = await this._connector.apiGet(
      'getKPFilmDetailView', { filmID: filmId, still_limit: 100, sr: 1 },
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

  getFilmCredits = async (filmId: number, query: void | string) => {
    const res: ?KinopoiskApi$GetStaffResponse =
      await this._connector.apiGet('getStaffList', { filmID: filmId });

    if (!res) return null;

    return transformResWithGqlQuery(filmCreditsFromRes(res), query);
  };

  getFilmGallery = async (filmId: number, query: void | string) => {
    const res: ?KinopoiskApi$GetGalleryResponse =
      await this._connector.apiGet('getGallery', { filmID: filmId });

    if (!res) return null;

    return transformResWithGqlQuery(filmGalleryFromRes(res), query);
  };

  getSimilarFilms = async (filmId: number, query: void | string) => {
    const res: ?KinopoiskApi$GetFilmsListResponse =
      await this._connector.apiGet('getKPFilmsList', {
        filmID: filmId,
        type: 'kp_similar_films',
      });

    if (!res) return null;

    return transformResWithGqlQuery(filmInfoListFromRes(res), query);
  };

  getSupportedCountries = async () => {
    const res: ?KinopoiskApi$GetCountryViewResponse =
      await this._connector.apiGet('getKPCountryView');

    if (!res) return null;

    return res.countryData.map(
      ({ countryID, countryName }: KinopoiskApi$Country,
    ) => ({
      id: parseInt(countryID, 10),
      name: countryName,
    }));
  };

  getSupportedCities = async (countryId: number) => {
    const res: ?KinopoiskApi$GetAllCitiesViewResponse =
      await this._connector.apiGet('getKPAllCitiesView', {
        countryID: countryId,
      });

    if (!res) return null;

    return (res.cityData || []).map(
      ({ cityID, cityName }: KinopoiskApi$City,
    ) => ({
      id: parseInt(cityID, 10),
      name: cityName,
    }));
  };
}

export default Kinopoisk;
