/* @flow */

import R from 'ramda';

import { normalizeCdnImageUrl } from './utils';
import connector from './connector';

type KinopoiskApi$GetFilmResponse = {
  filmID?: ?string,
  imdbID?: ?string,
  nameRU?: ?string,
  nameEN?: ?string,
  posterURL?: ?string,
  year?: ?string,
  description?: ?string,
  filmLength?: ?string,
  genre?: ?string,
  ratingAgeLimits?: ?string,
  ratingMPAA?: ?string,
  ratingData: {
    rating?: ?string,
    ratingVoteCount?: ?string,
    ratingIMDb?: ?string,
    ratingIMDbVoteCount?: ?string,
    ratingFilmCritics?: ?string,
    ratingFilmCriticsVoteCount?: ?string,
  },
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

const getGeneralInfo = async (id: number) => {
  const res: ?KinopoiskApi$GetFilmResponse =
    await connector.get('getFilm', { filmID: id });

  if (!res) return null;

  const {
    filmID,
    imdbID,
    nameRU,
    nameEN,
    posterURL,
    year,
    description,
    filmLength,
    genre,
    ratingAgeLimits,
    ratingMPAA,
    ratingData = {},
  } = res;

  return {
    kpId: parseInt(filmID, 10),
    imdbID,
    title: {
      ru: nameRU,
      original: nameEN,
    },
    posterUrl: posterURL ? normalizeCdnImageUrl(posterURL) : null,
    year: parseInt(year, 10),
    synopsis: {
      ru: description,
    },
    runtime: parseRuntime(filmLength),
    genres: (genre || '').split(', '),
    ageRating: parseInt(ratingAgeLimits, 10),
    mpaaRating: ratingMPAA,
    kpRating: parseFloat(ratingData.rating),
    kpRatingVoteCount: parseInt(ratingData.ratingVoteCount, 10),
    imdbRating: parseFloat(ratingData.ratingIMDb),
    imdbRatingVoteCount: parseInt(ratingData.ratingIMDbVoteCount, 10),
    rtCriticsRating: parseInt(ratingData.ratingFilmCritics, 10),
    rtCriticsRatingVoteCount: parseInt(
      ratingData.ratingFilmCriticsVoteCount,
      10,
    ),
  };
};

export { parseRuntime as __parseRuntime };
export default getGeneralInfo;
