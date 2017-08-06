/* @flow */

import {imageUrlFromPath, parseRuntime} from './utils';
import type {
  KinopoiskApi$GalleryItem,
  KinopoiskApi$GetFilmResponse,
} from './types';

// eslint-disable-next-line complexity
const filmInfoFromRes = (res: KinopoiskApi$GetFilmResponse) => {
  const ratingData = res.ratingData || {};

  return {
    kpId: parseInt(res.filmID, 10),
    title: res.nameRU || null,
    originalTitle: res.nameEN || null,
    posterUrl: res.posterURL ? imageUrlFromPath(res.posterURL) : null,
    year: parseInt(res.year, 10),
    productionCountries: (res.country || '')
      .split(', ')
      .map((country: string) => country.trim()),
    synopsis: res.description || null,
    runtime: parseRuntime(res.filmLength),
    genres: (res.genre || '').split(', '),
    ageRating: parseInt(res.ratingAgeLimits, 10),
    mpaaRating: res.ratingMPAA || null,
    kpRating: parseFloat(ratingData.rating),
    kpRatingVoteCount: parseInt(
      String(ratingData.ratingVoteCount || '').replace(' ', ''),
      10,
    ),
    imdbRating: parseFloat(ratingData.ratingIMDb),
    imdbRatingVoteCount: parseInt(
      String(ratingData.ratingIMDbVoteCount || '').replace(' ', ''),
      10,
    ),
    rtCriticsRating: parseInt(ratingData.ratingFilmCritics, 10),
    rtCriticsRatingVoteCount: parseInt(
      String(ratingData.ratingFilmCriticsVoteCount || '').replace(' ', ''),
      10,
    ),
    stills: (res.gallery || [])
      .map(({preview}: KinopoiskApi$GalleryItem) =>
        imageUrlFromPath(preview.replace('kadr/sm_', 'kadr/')),
      ),
  };
};

export default filmInfoFromRes;
