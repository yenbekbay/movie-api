/* @flow */

import R from 'ramda';

import { imageUrlFromPath, parseRuntime } from './utils';
import type {
  KinopoiskApi$GalleryItem,
  KinopoiskApi$GetFilmResponse,
} from './types';

const filmInfoFromRes = (
  res: KinopoiskApi$GetFilmResponse,
) => ({
  kpId: parseInt(res.filmID, 10),
  title: res.nameRU,
  originalTitle: res.nameEN,
  posterUrl: res.posterURL ? imageUrlFromPath(res.posterURL) : null,
  year: parseInt(res.year, 10),
  productionCountries: (res.country || '')
    .split(', ')
    .map((country: string) => country.trim()),
  synopsis: res.description,
  runtime: parseRuntime(res.filmLength),
  genres: (res.genre || '').split(', '),
  ageRating: parseInt(res.ratingAgeLimits, 10),
  mpaaRating: res.ratingMPAA,
  kpRating: parseFloat(res.ratingData.rating),
  kpRatingVoteCount: parseInt(
    String(res.ratingData.ratingVoteCount || '').replace(' ', ''), 10,
  ),
  imdbRating: parseFloat(res.ratingData.ratingIMDb),
  imdbRatingVoteCount: parseInt(
    String(res.ratingData.ratingIMDbVoteCount || '').replace(' ', ''), 10,
  ),
  rtCriticsRating: parseInt(res.ratingData.ratingFilmCritics, 10),
  rtCriticsRatingVoteCount: parseInt(
    String(res.ratingData.ratingFilmCriticsVoteCount || '').replace(' ', ''),
    10,
  ),
  stills: (res.gallery || []).map(
    ({ preview }: KinopoiskApi$GalleryItem) => imageUrlFromPath(
      preview.replace('kadr/sm_', 'kadr/'),
    ),
  ),
});

export default filmInfoFromRes;
