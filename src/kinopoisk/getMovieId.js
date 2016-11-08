/* @flow */

import cheerio from 'cheerio';
import R from 'ramda';
import similarity from 'similarity';

import connector from './connector';

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

const scrapeResults = (html: string): Promise<Array<SearchResult>> => {
  const $ = cheerio.load(html);

  return $('.film-snippet_type_movie')
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
};

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

const bestIdFromResultsHtml = (query: Query, html: string): ?number => R.pipe(
  scrapeResults,
  R.curry(filterResults)(query),
  R.sortBy(({ title }: SearchResult) => similarity(title, query.title)),
  R.head,
  R.prop('id'),
)(html);

const getMovieId = async (query: Query): Promise<?number> => bestIdFromResultsHtml(
  query,
  await connector.htmlGet('search', { text: query.title }),
);

export {
  scrapeResults as __scrapeResults,
  filterResults as __filterResults,
  bestIdFromResultsHtml as __bestIdFromResultsHtml,
};
export default getMovieId;
