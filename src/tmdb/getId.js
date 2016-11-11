/* @flow */

import R from 'ramda';

import connector from './connector';

type Query = {
  title?: string,
  year?: number,
  imdbId?: string,
  isTvShow?: boolean,
};

const findByImdbId = async (query: Query): Promise<?number> => {
  if (!query.imdbId) return null;

  const res = await connector.apiGet(
    `find/${query.imdbId}`,
    { external_source: 'imdb_id' },
  );

  const results = query.isTvShow
    ? R.propOr([], 'tv_results', res)
    : R.propOr([], 'movie_results', res);

  return R.pipe(R.head, R.prop('id'))(results);
};
const searchByTitle = async (query: Query): Promise<?number> => {
  if (!query.title) return null;

  const res = await connector.apiGet(
    `search/${query.isTvShow ? 'tv' : 'movie'}`,
    { query: query.title, year: query.year },
  );

  return R.pipe(R.prop('results'), R.head, R.prop('id'))(res);
};

const getId = async (query: Query): Promise<?number> => {
  if (query.imdbId) return findByImdbId(query);
  if (query.title) return searchByTitle(query);

  return null;
};

export {
  findByImdbId as __findByImdbId,
  searchByTitle as __searchByTitle,
};
export default getId;
