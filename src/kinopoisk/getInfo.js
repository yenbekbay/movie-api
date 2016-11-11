/* @flow */

import R from 'ramda';

import { imageUrlFromPath } from './utils';
import connector from './connector';
import getCredits from './getCredits';

type KinopoiskApi$GalleryItem = {
  preview: string,
};
type KinopoiskApi$GetFilmResponse = {
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

const parseRuntime = (rawRuntime: ?string): number => (
  rawRuntime
    ? R.pipe(
        R.split(':'),
        R.slice(0, 2),
        ([hours, minutes]: [string, string]): number => R.sum([
          parseInt(hours, 10) * 60,
          parseInt(minutes, 10),
        ]),
        (runtime: number) => (runtime === 0 ? NaN : runtime),
      )(rawRuntime)
    : NaN
);

const getInfo = async (id: number) => {
  const [res, credits] = await Promise.all([
    (connector.apiGet(
      'getKPFilmDetailView', { filmID: id, still_limit: 100 },
    ): Promise<?KinopoiskApi$GetFilmResponse>),
    getCredits(id),
  ]);

  if (!res) return null;

  const {
    country,
    description,
    filmID,
    filmLength,
    gallery,
    genre,
    nameEN,
    nameRU,
    posterURL,
    ratingAgeLimits,
    ratingData = {},
    ratingMPAA,
    year,
  } = res;

  return {
    kpId: parseInt(filmID, 10),
    title: nameRU,
    originalTitle: nameEN,
    posterUrl: posterURL ? imageUrlFromPath(posterURL) : null,
    year: parseInt(year, 10),
    productionCountries: country ? country.split(', ').map(R.trim) : [],
    synopsis: description,
    runtime: parseRuntime(filmLength),
    genres: (genre || '').split(', '),
    ageRating: parseInt(ratingAgeLimits, 10),
    mpaaRating: ratingMPAA,
    kpRating: parseFloat(ratingData.rating),
    kpRatingVoteCount: parseInt(
      (ratingData.ratingVoteCount || '').replace(' ', ''), 10,
    ),
    imdbRating: parseFloat(ratingData.ratingIMDb),
    imdbRatingVoteCount: parseInt(
      (ratingData.ratingIMDbVoteCount || '').replace(' ', ''), 10,
    ),
    rtCriticsRating: parseInt(ratingData.ratingFilmCritics, 10),
    rtCriticsRatingVoteCount: parseInt(
      (ratingData.ratingFilmCriticsVoteCount || '').replace(' ', ''), 10,
    ),
    stills: (gallery || []).map(
      ({ preview }: KinopoiskApi$GalleryItem) => imageUrlFromPath(
        preview.replace('kadr/sm_', 'kadr/'),
      ),
    ),
    credits,
  };
};

export { parseRuntime as __parseRuntime };
export default getInfo;
