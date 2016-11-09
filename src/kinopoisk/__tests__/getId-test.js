/* @flow */

import getId, {
  __scrapeResults,
  __filterResults,
} from '../getId';
import connector from '../connector';

const movieQuery = {
  title: 'Звёздные войны: Пробуждение силы',
};
const tvShowQuery = {
  title: 'Игра престолов',
  isTvShow: true,
};

describe('kinopoisk/getId', () => {
  it('scrapes movie search results', async () => {
    expect(__scrapeResults(
      await connector.htmlGet('search/films', { text: movieQuery.title }),
    )).toMatchSnapshot();
  }, 7000);

  it('scrapes tv show search results', async () => {
    expect(__scrapeResults(
      await connector.htmlGet('search/series', { text: tvShowQuery.title }),
    )).toMatchSnapshot();
  }, 7000);

  it('filters results', () => {
    expect(__filterResults({ title: 'foo' }, [
      null,
      undefined,
      { id: 1, title: 'foo', countries: [], year: 2016 },
    ])).toMatchSnapshot();

    expect(__filterResults({ title: 'Звёздные войны' }, [
      { id: 1, title: 'Звёздные войны', countries: [], year: 2015 },
      { id: 2, title: 'Звездные войны', countries: [], year: 2016 },
      { id: 3, title: 'Звёздная пыль', countries: [], year: 2014 },
      { id: 4, title: 'Звёздный путь', countries: [], year: 2016 },
    ])).toMatchSnapshot();

    expect(__filterResults({ title: 'foo', year: 2016 }, [
      { id: 1, title: 'foo', countries: [], year: 2015 },
      { id: 2, title: 'foo', countries: [], year: 2016 },
      { id: 3, title: 'foo', countries: [], year: 2014 },
      { id: 4, title: 'foo', countries: [], year: 2016 },
    ])).toMatchSnapshot();

    expect(__filterResults({ title: 'foo', countries: ['США', 'Россия'] }, [
      { id: 1, title: 'foo', countries: ['США'], year: 2016 },
      // eslint-disable-next-line max-len
      { id: 2, title: 'foo', countries: ['США', 'Россия', 'Германия'], year: 2016 },
      { id: 3, title: 'foo', countries: ['Россия'], year: 2016 },
      { id: 4, title: 'foo', countries: ['США', 'Россия'], year: 2016 },
    ])).toMatchSnapshot();
  });

  it('finds best movie id for a given query', async () => {
    expect(await getId(movieQuery)).toMatchSnapshot();
  }, 7000);

  it('finds best tv show id for a given query', async () => {
    expect(await getId(tvShowQuery)).toMatchSnapshot();
  }, 7000);
});
