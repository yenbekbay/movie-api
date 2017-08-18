/* @flow */

import {__isTitleSimilarToQuery, __filterResults} from '../filmIdFromRes';

describe('kinopoisk/filmIdFromRes', () => {
  it('checks title and query for similarity', () => {
    expect(
      __isTitleSimilarToQuery(
        'Star Wars: Episode VII - The Force Awakens',
        'Star Wars: The Force Awakens',
      ),
    ).toBe(true);
  });

  it('filters results by title', () => {
    expect(
      __filterResults({title: 'foo'}, [
        null,
        undefined,
        {id: 1, title: 'foo', countries: [], year: 2016},
      ]),
    ).toMatchSnapshot();

    expect(
      __filterResults({title: 'Звёздные войны'}, [
        {id: 1, title: 'Звёздные войны', countries: [], year: 2015},
        {id: 2, title: 'Звездные войны', countries: [], year: 2016},
        {id: 3, title: 'Звёздная пыль', countries: [], year: 2014},
        {id: 4, title: 'Звёздный путь', countries: [], year: 2016},
      ]),
    ).toMatchSnapshot();

    expect(
      __filterResults({title: 'Star Wars: Episode VII - The Force Awakens'}, [
        {
          id: 1,
          title: 'Звёздные войны',
          originalTitle: 'Star Wars: Episode VI',
          countries: [],
          year: 2015,
        },
        {
          id: 2,
          title: 'Звёздные войны',
          originalTitle: 'Star Wars: Episode VII - The Force Awakens',
          countries: [],
          year: 2016,
        },
        {
          id: 3,
          title: 'Звёздные войны',
          originalTitle: 'Star Wars: Episode V',
          countries: [],
          year: 2014,
        },
        {
          id: 4,
          title: 'Звёздные войны',
          originalTitle: 'Star Wars: Episode IV',
          countries: [],
          year: 2016,
        },
      ]),
    ).toMatchSnapshot();
  });

  it('filters results by year', () => {
    expect(
      __filterResults({title: 'foo', year: 2016}, [
        {id: 1, title: 'foo', countries: [], year: 2015},
        {id: 2, title: 'foo', countries: [], year: 2016},
        {id: 3, title: 'foo', countries: [], year: 2014},
        {id: 4, title: 'foo', countries: [], year: 2016},
      ]),
    ).toMatchSnapshot();
  });

  it('filters results by countries', () => {
    expect(
      __filterResults({title: 'foo', countries: ['США', 'Россия']}, [
        {id: 1, title: 'foo', countries: ['США'], year: 2016},
        {
          id: 2,
          title: 'foo',
          countries: ['США', 'Россия', 'Германия'],
          year: 2016,
        },
        {id: 3, title: 'foo', countries: ['Россия'], year: 2016},
        {id: 4, title: 'foo', countries: ['США', 'Россия'], year: 2016},
      ]),
    ).toMatchSnapshot();
  });

  it('filters results by type (movie or tv show)', () => {
    expect(
      __filterResults({title: 'Игра престолов', year: 2011, isTvShow: true}, [
        {id: 1, title: 'Игра престолов', countries: [], year: 2011},
        {id: 2, title: 'Игра престолов (сериал)', countries: [], year: 2011},
        {id: 3, title: 'Игра престолов (сериал)', countries: [], year: 2012},
        {id: 4, title: 'foo', countries: [], year: 2011},
      ]),
    ).toMatchSnapshot();

    expect(
      __filterResults({title: 'Звёздные войны', year: 2016, isTvShow: false}, [
        {id: 1, title: 'Звёздные войны (сериал)', countries: [], year: 2016},
        {id: 2, title: 'Звёздные войны', countries: [], year: 2015},
        {id: 3, title: 'Звёздные войны', countries: [], year: 2016},
        {id: 4, title: 'foo', countries: [], year: 2011},
      ]),
    ).toMatchSnapshot();
  });
});
