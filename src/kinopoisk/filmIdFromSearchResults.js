/* @flow */

import R from 'ramda';
import similarity from 'similarity';

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

const scrapeResults = (
  $: () => Object,
): Array<SearchResult> => $('.film-snippet')
  .get()
  .map((snippet: any) => {
    const titleNode = $(snippet).find('.film-snippet__title-link');
    const id = parseInt(
      R.nth(1, titleNode.attr('href').match(/\/film\/(.+)\//) || []),
      10,
    );

    if (isNaN(id)) return null;

    const infoNode = $(snippet).find('.film-snippet__info');
    const title = $(snippet).find('meta[itemprop="name"]').attr('content');
    const originalTitle = $(snippet)
      .find('meta[itemprop="alternateName"]')
      .attr('content');
    const countries = R.pipe(
      R.split(','),
      R.map(R.trim),
      R.filter(
        (country: ?string) => !!country && isNaN(parseInt(country, 10)),
      ),
    )(infoNode.text());
    const year = parseInt(R.head(infoNode.text().match(/\d+/) || []), 10);

    return { id, title, originalTitle, countries, year };
  });

const filterResults = (
  query: SearchQuery,
  results: Array<?SearchResult>,
): Array<SearchResult> => R.filter(R.allPass([
  Boolean,
  ({ title, originalTitle }: SearchResult) =>
    similarity(title, query.title) >= 0.8 ||
    (originalTitle && similarity(originalTitle, query.title) >= 0.8),
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

const filmIdFromSearchResults = (html: string, query: SearchQuery) => R.pipe(
  scrapeResults,
  R.curry(filterResults)(query),
  R.path(['0', 'id']),
)(html);

export {
  scrapeResults as __scrapeResults,
  filterResults as __filterResults,
};
export default filmIdFromSearchResults;
