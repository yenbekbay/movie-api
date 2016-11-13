/* @flow */

import { __filterResults } from '../filmIdFromSearchResults';

describe('kinopoisk/filmIdFromSearchResults', () => {
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
});
