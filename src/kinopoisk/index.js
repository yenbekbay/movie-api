/* @flow */

import cinemaInfoFromRes from './cinemaInfoFromRes';
import filmCreditsFromRes from './filmCreditsFromRes';
import filmGalleryFromRes from './filmGalleryFromRes';
import filmIdFromSearchResults from './filmIdFromSearchResults';
import filmInfoFromRes from './filmInfoFromRes';
import filmInfoListFromRes from './filmInfoListFromRes';
import KinopoiskConnector from './connector';
import type {
  KinopoiskApi$Cinema,
  KinopoiskApi$City,
  KinopoiskApi$Country,
  KinopoiskApi$GetAllCitiesViewResponse,
  KinopoiskApi$GetCinemaDetailView,
  KinopoiskApi$GetCinemasResponse,
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

  getFilmInfo = async (filmId: number) => {
    const res: ?KinopoiskApi$GetFilmResponse = await this._connector.apiGet(
      'getKPFilmDetailView', { filmID: filmId, still_limit: 100, sr: 1 },
    );

    return res ? filmInfoFromRes(res) : null;
  };

  getFilmId = async (query: SearchQuery): Promise<?number> => {
    const html = await this._connector.htmlGet(
      `search/${query.isTvShow ? 'series' : 'films'}`,
      { text: query.title },
    );

    return filmIdFromSearchResults(html, query);
  };

  getFilmCredits = async (filmId: number) => {
    const res: ?KinopoiskApi$GetStaffResponse =
      await this._connector.apiGet('getStaffList', { filmID: filmId });

    return res ? filmCreditsFromRes(res) : null;
  };

  getFilmGallery = async (filmId: number) => {
    const res: ?KinopoiskApi$GetGalleryResponse =
      await this._connector.apiGet('getGallery', { filmID: filmId });

    return res ? filmGalleryFromRes(res) : null;
  };

  getSimilarFilms = async (filmId: number) => {
    const res: ?KinopoiskApi$GetFilmsListResponse =
      await this._connector.apiGet('getKPFilmsList', {
        filmID: filmId,
        type: 'kp_similar_films',
      });

    return res ? filmInfoListFromRes(res) : null;
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

  getCinemasInCity = async (cityId: number) => {
    const res: ?KinopoiskApi$GetCinemasResponse =
      await this._connector.apiGet('getKPCinemas', {
        cityID: cityId,
      });

    if (!res) return null;

    return (res.items || []).map(({
      cinemaID, cinemaName, address, lon, lat,
    }: KinopoiskApi$Cinema) => ({
      id: parseInt(cinemaID, 10),
      name: cinemaName,
      address,
      location: {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      },
    }));
  };

  getCinemaInfo = async ({ cinemaId, date, utcOffset }: {
    cinemaId: number,
    date?: string,
    utcOffset?: string,
  }) => {
    if (date && !/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      // eslint-disable-next-line max-len
      throw new Error(`Invalid date "${date}". Please provide a date in the DD.MM.YYYY format`);
    }

    const res: ?KinopoiskApi$GetCinemaDetailView =
      await this._connector.apiGet('getKPCinemaDetailView', {
        cinemaID: cinemaId,
        date,
      });

    return res ? cinemaInfoFromRes(res, utcOffset) : null;
  };
}

export default Kinopoisk;
