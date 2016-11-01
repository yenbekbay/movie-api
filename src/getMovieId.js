/* @flow */

import cheerio from 'cheerio';
import R from 'ramda';
import rp from 'request-promise-native';
import similarity from 'similarity';

const request = rp.defaults({
  headers: { 'User-Agent': 'movie-api' },
  gzip: true,
  json: true,
});

type Query = {
  title: string,
  year?: number,
  countries?: Array<string>,
};
type SearchResult = {
  id: number,
  title: string,
  countries: Array<string>,
  year: number,
};

const loadResults = async (query: Query): Promise<Object> => {
  const html = await request({
    url: 'http://plus.kinopoisk.ru/search',
    qs: { text: query.title },
  });

  return cheerio.load(html);
};

const scrapeResults = (
  $: () => Object,
): Promise<Array<SearchResult>> => $('.film-snippet_type_movie')
  .get()
  .map((snippet: any) => {
    const titleNode = $(snippet).find('.film-snippet__title-link');
    const id = parseInt(
      R.nth(1, titleNode.attr('href').match(/\/film\/(.+)\//)),
      10,
    );

    if (isNaN(id)) return null;

    const infoNode = $(snippet).find('.film-snippet__info');
    const title = titleNode.text().replace(/\s\s+/g, ' ');
    const countries = R.pipe(
      R.split(','),
      R.map(R.trim),
      R.filter((country: ?string) => !!country && isNaN(country)),
    )(infoNode.text());
    const year = parseInt(R.head(infoNode.text().match(/\d+/)), 10);

    return { id, title, countries, year };
  });

const filterResults = (
  query: Query,
  results: Array<?SearchResult>,
): Array<SearchResult> => R.filter(R.allPass([
  Boolean,
  ({ title }: SearchResult) => similarity(title, query.title) >= 0.8,
  (query.year
    ? ({ year }: SearchResult) => year === query.year
    : R.always(true)),
  (query.countries
    ? ({ countries }: SearchResult) => R.equals(
        R.intersection(countries, query.countries).length,
        // $FlowFixMe: countries is always available here
        query.countries.length,
      )
    : R.always(true)),
]))(results);

const bestIdFromResults = (query: Query, results: Object) => R.pipe(
  scrapeResults,
  R.curry(filterResults)(query),
  R.sortBy(({ title }: SearchResult) => similarity(title, query.title)),
  R.head,
  R.prop('id'),
)(results);

const getMovieId = async (query: Query): Promise<?number> =>
  bestIdFromResults(query, await loadResults(query));

export {
  loadResults as __loadResults,
  scrapeResults as __scrapeResults,
  filterResults as __filterResults,
  bestIdFromResults as __bestIdFromResults,
};
export default getMovieId;
