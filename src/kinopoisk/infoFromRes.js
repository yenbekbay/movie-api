/* @flow */

import gql from 'graphql-tag';
import graphql from 'graphql-anywhere';
import R from 'ramda';

import { imageUrlFromPath } from './utils';
import type {
  KinopoiskApi$GalleryItem,
  KinopoiskApi$GetFilmResponse,
} from './types';

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

const infoFromRes = (
  res: KinopoiskApi$GetFilmResponse,
  query: void | string,
) => {
  const finalRes = {
    kpId: parseInt(res.filmID, 10),
    title: res.nameRU,
    originalTitle: res.nameEN,
    posterUrl: res.posterURL ? imageUrlFromPath(res.posterURL) : null,
    year: parseInt(res.year, 10),
    productionCountries: res.country ? res.country.split(', ').map(R.trim) : [],
    synopsis: res.description,
    runtime: parseRuntime(res.filmLength),
    genres: (res.genre || '').split(', '),
    ageRating: parseInt(res.ratingAgeLimits, 10),
    mpaaRating: res.ratingMPAA,
    kpRating: parseFloat(res.ratingData.rating),
    kpRatingVoteCount: parseInt(
      (res.ratingData.ratingVoteCount || '').replace(' ', ''), 10,
    ),
    imdbRating: parseFloat(res.ratingData.ratingIMDb),
    imdbRatingVoteCount: parseInt(
      (res.ratingData.ratingIMDbVoteCount || '').replace(' ', ''), 10,
    ),
    rtCriticsRating: parseInt(res.ratingData.ratingFilmCritics, 10),
    rtCriticsRatingVoteCount: parseInt(
      (res.ratingData.ratingFilmCriticsVoteCount || '').replace(' ', ''), 10,
    ),
    stills: (res.gallery || []).map(
      ({ preview }: KinopoiskApi$GalleryItem) => imageUrlFromPath(
        preview.replace('kadr/sm_', 'kadr/'),
      ),
    ),
  };

  if (!query) return finalRes;

  return graphql(R.prop, gql`${query}`, finalRes);
};

export { parseRuntime as __parseRuntime };
export default infoFromRes;
