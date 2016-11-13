/* @flow */

export type KinopoiskApi$MovieType = 'KPFilm' | 'KPSerial';
export type KinopoiskApi$GalleryItem = {
  preview: string,
};
export type KinopoiskApi$CrewMember = {
  id: string,
  type: 'KPPeople',
  nameRU?: ?string,
  nameEN?: ?string,
  posterURL?: ?string,
  description?: ?string,
  professionText: string,
  professionKey: 'actor' | 'director' | 'producer' | 'writer' | 'composer',
};
export type KinopoiskApi$FilmsListItem = {
  type: KinopoiskApi$MovieType,
  id: string,
  nameRU: string,
  nameEN?: ?string,
  year?: ?string,
  rating?: ?string,
  ratingVoteCount?: ?string,
  posterURL?: ?string,
  filmLength?: ?string,
  country?: ?string,
  genre?: ?string,
  filmTypeText: 'Похожие фильмы',
};
export type KinopoiskApi$Country = {
  countryID: string,
  countryName: string,
};
export type KinopoiskApi$City = {
  cityID: string,
  cityName: string,
};

export type KinopoiskApi$GetStaffResponse = {
  creators?: Array<Array<KinopoiskApi$CrewMember>>,
};
export type KinopoiskApi$GetFilmResponse = {
  bigPosterURL?: ?string,
  country?: ?string,
  description?: ?string,
  filmID: string,
  filmLength?: ?string,
  gallery?: ?Array<KinopoiskApi$GalleryItem>,
  genre?: ?string,
  nameEN?: ?string,
  nameRU: string,
  posterURL?: ?string,
  ratingAgeLimits?: ?string,
  ratingData: {
    rating?: ?string,
    ratingVoteCount?: ?string,
    ratingIMDb?: ?string,
    ratingIMDbVoteCount?: ?string,
    ratingFilmCritics?: ?string,
    ratingFilmCriticsVoteCount?: ?string,
  },
  ratingMPAA?: ?string,
  slogan?: ?string,
  type: KinopoiskApi$MovieType,
  webURL: string,
  year?: ?string,
};
export type KinopoiskApi$GetGalleryResponse = {
  class: 'Gallery',
  gallery?: {
    kadr?: Array<KinopoiskApi$GalleryItem>,
    kadr_sp?: Array<KinopoiskApi$GalleryItem>,
    poster?: Array<KinopoiskApi$GalleryItem>,
  },
};
export type KinopoiskApi$GetFilmsListResponse = {
  class: 'KPFilmsList',
  items?: Array<KinopoiskApi$FilmsListItem>,
};
export type KinopoiskApi$GetCountryViewResponse = {
  class: 'KPCountryView',
  countryData: Array<KinopoiskApi$Country>,
};
export type KinopoiskApi$GetAllCitiesViewResponse = {
  class: 'KPAllCitiesView',
  countryID: string,
  countryName: string,
  cityData?: Array<KinopoiskApi$City>,
};
