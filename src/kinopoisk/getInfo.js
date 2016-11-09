/* @flow */

import R from 'ramda';

import { imageUrlFromPath } from './utils';
import connector from './connector';
import getCredits from './getCredits';
import getStills from './getStills';

type KinopoiskApi$GetFilmResponse = {
  bigPosterURL?: ?string,
  country?: ?string,
  description?: ?string,
  filmID: string,
  filmLength?: ?string,
  genre?: ?string,
  imdbID?: ?string,
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
  const res: ?KinopoiskApi$GetFilmResponse =
    await connector.apiGet('getFilm', { filmID: id });

  if (!res) return null;

  const {
    description,
    filmID,
    filmLength,
    genre,
    imdbID,
    nameEN,
    nameRU,
    posterURL,
    ratingAgeLimits,
    ratingData = {},
    ratingMPAA,
    year,
  } = res;

  const credits = await getCredits(id);
  const stills = await getStills(id);

  return {
    kpId: parseInt(filmID, 10),
    imdbID,
    title: nameRU,
    originalTitle: nameEN,
    posterUrl: posterURL ? imageUrlFromPath(posterURL) : null,
    year: parseInt(year, 10),
    synopsis: description,
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
    stills,
    credits,
  };
};

export { parseRuntime as __parseRuntime };
export default getInfo;
