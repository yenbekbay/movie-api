/* @flow */

import R from 'ramda';
import similarity from 'similarity';
import words from 'lodash.words';

import type {KinopoiskApi$GetSearchInFilmsResponse} from './types';

export type SearchQuery = {
  title: string,
  year?: number,
  countries?: Array<string>,
  isTvShow?: boolean,
};

type SearchResult = {
  id: number,
  title: string,
  originalTitle?: ?string,
  countries: Array<string>,
  year: number,
};

const isTitleSimilarToQuery = (title: string, query: string): boolean => {
  const cleanTitle = title
    .replace(/ \(сериал\)$/, '')
    .replace(/ \(ТВ\)$/, '')
    .replace(/ \(видео\)$/, '');

  if (similarity(cleanTitle, query) >= 0.8) return true;

  const cleanTitleWords = words(cleanTitle);
  const queryWords = words(query);

  const diff = R.reduce(
    (acc: Array<string>, val: string) => {
      if (R.contains(val, acc)) {
        return R.remove(R.indexOf(val, acc), 1, acc);
      }

      return acc;
    },
    queryWords,
    cleanTitleWords,
  );

  return diff.length === 0;
};

const getResults = (
  res: KinopoiskApi$GetSearchInFilmsResponse,
): Array<?SearchResult> =>
  res.searchFilms.map(film => ({
    id: parseInt(film.id, 10),
    title: film.nameRU,
    originalTitle: film.nameEN,
    countries: (film.country || '').split(','),
    year: parseInt(film.year, 10),
  }));

const filterResults = (
  query: SearchQuery,
  // $FlowFixMe
  results: Array<?SearchResult>,
): Array<SearchResult> =>
  R.filter(
    R.allPass([
      result => result !== null && result !== undefined,
      ({title}: SearchResult) =>
        (title.endsWith('(сериал)') && query.isTvShow) ||
        (!title.endsWith('(сериал)') && !query.isTvShow),
      ({title, originalTitle}: SearchResult) =>
        isTitleSimilarToQuery(title, query.title) ||
        !!(originalTitle && isTitleSimilarToQuery(originalTitle, query.title)),
      query.year
        ? ({year}: SearchResult) => year === query.year
        : R.always(true),
      query.countries
        ? ({countries}: SearchResult) =>
            R.equals(
              R.intersection(countries, query.countries || []).length,
              // $FlowFixMe: countries is always available here
              query.countries.length,
            )
        : R.always(true),
    ]),
  )(results);

const filmIdFromRes = (
  res: KinopoiskApi$GetSearchInFilmsResponse,
  query: SearchQuery,
): ?number =>
  // $FlowFixMe
  R.pipe(getResults, R.curry(filterResults)(query), R.path(['0', 'id']))(res);

export {
  isTitleSimilarToQuery as __isTitleSimilarToQuery,
  getResults as __getResults,
  filterResults as __filterResults,
};
export default filmIdFromRes;
