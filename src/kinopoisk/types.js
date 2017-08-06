/* @flow */

export type KinopoiskApi$MovieType = 'KPFilm' | 'KPSerial';
export type KinopoiskApi$RatingData = {
  rating?: ?string,
  ratingVoteCount?: ?(string | number),
  ratingIMDb?: ?string,
  ratingIMDbVoteCount?: ?(string | number),
  ratingFilmCritics?: ?string,
  ratingFilmCriticsVoteCount?: ?(string | number),
};
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
export type KinopoiskApi$Cinema = {
  class: 'KPCinemaCell',
  cinemaID: string,
  cinemaName: string,
  address?: ?string,
  lon: string,
  lat: string,
  metro?: ?string,
  hasNoSeances?: boolean,
};
export type KinopoiskApi$Showtime = {
  time: string,
  formats: {format: Array<string>},
};
export type KinopoiskApi$MovieShowtimes = {
  class: 'KPSeanceCell',
  filmID: string,
  nameRU: string,
  nameEN?: ?string,
  year?: ?string,
  rating?: ?string,
  ratingVoteCount?: ?string,
  posterURL?: ?string,
  country?: ?string,
  genre?: ?string,
  seance: Array<KinopoiskApi$Showtime>,
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
  ratingData?: ?KinopoiskApi$RatingData,
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
export type KinopoiskApi$GetCinemasResponse = {
  class: 'KPCinemas',
  cityID: string,
  cityName: string,
  items?: Array<KinopoiskApi$Cinema>,
};
export type KinopoiskApi$GetCinemaDetailView = {
  class: 'KPCinemaDetailView',
  cinemaDetail?: {
    cinemaID: string,
    cinemaName: string,
    rating?: ?string,
    voteCount?: ?string,
    cinemaLocation?: {
      lon: string,
      lat: string,
      addressDescription: string,
    },
    phones: Array<{phone: string}>,
    cinemaWeb?: ?string,
    cinemaUrl: string,
    seance?: {
      date: string,
      items: Array<KinopoiskApi$MovieShowtimes>,
    },
  },
};
