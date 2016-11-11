/* @flow */

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
  type: 'KPFilm' | 'KPSerial',
  webURL: string,
  year?: ?string,
};
