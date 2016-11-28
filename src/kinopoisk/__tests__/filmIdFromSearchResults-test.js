/* @flow */

import { __filterResults } from '../filmIdFromSearchResults';

describe('kinopoisk/filmIdFromSearchResults', () => {
  it('filters results', () => {
    /* eslint-disable max-len */
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

    expect(__filterResults({
      title: 'Star Wars: Episode VII - The Force Awakens',
    }, [
      { id: 1, title: 'Звёздные войны', originalTitle: 'Star Wars: Episode VI', countries: [], year: 2015 },
      { id: 2, title: 'Звёздные войны', originalTitle: 'Star Wars: Episode VII - The Force Awakens', countries: [], year: 2016 },
      { id: 3, title: 'Звёздные войны', originalTitle: 'Star Wars: Episode V', countries: [], year: 2014 },
      { id: 4, title: 'Звёздные войны', originalTitle: 'Star Wars: Episode IV', countries: [], year: 2016 },
    ])).toMatchSnapshot();

    expect(__filterResults({ title: 'foo', year: 2016 }, [
      { id: 1, title: 'foo', countries: [], year: 2015 },
      { id: 2, title: 'foo', countries: [], year: 2016 },
      { id: 3, title: 'foo', countries: [], year: 2014 },
      { id: 4, title: 'foo', countries: [], year: 2016 },
    ])).toMatchSnapshot();

    expect(__filterResults({ title: 'foo', countries: ['США', 'Россия'] }, [
      { id: 1, title: 'foo', countries: ['США'], year: 2016 },
      { id: 2, title: 'foo', countries: ['США', 'Россия', 'Германия'], year: 2016 },
      { id: 3, title: 'foo', countries: ['Россия'], year: 2016 },
      { id: 4, title: 'foo', countries: ['США', 'Россия'], year: 2016 },
    ])).toMatchSnapshot();
    /* eslint-enable max-len */
  });
});
