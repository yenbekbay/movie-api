/* @flow */

import {imageUrlFromPath, parseRuntime} from './utils';
import type {
  KinopoiskApi$FilmsListItem,
  KinopoiskApi$GetFilmsListResponse,
} from './types';

const filmInfoListFromRes = ({
  items = [],
}: KinopoiskApi$GetFilmsListResponse) => ({
  items: items.map((item: KinopoiskApi$FilmsListItem) => ({
    kpId: parseInt(item.id, 10),
    title: item.nameRU,
    originalTitle: item.nameEN,
    posterUrl: item.posterURL ? imageUrlFromPath(item.posterURL) : null,
    year: parseInt(item.year, 10),
    productionCountries: (item.country || '')
      .split(', ')
      .map((country: string) => country.trim()),
    runtime: parseRuntime(item.filmLength),
    genres: (item.genre || '').split(', '),
    kpRating: parseFloat(item.rating),
    kpRatingVoteCount: parseInt(
      (item.ratingVoteCount || '').replace(' ', ''),
      10,
    ),
  })),
});

export default filmInfoListFromRes;
