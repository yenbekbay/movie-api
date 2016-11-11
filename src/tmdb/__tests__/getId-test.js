/* @flow */

import getId from '../getId';

describe('tmdb/getId', () => {
  it('fetches movie id by imdb id', async () => {
    expect(await getId({ imdbId: 'tt2488496' })).toMatchSnapshot();
  });

  it('fetches movie id by title', async () => {
    expect(await getId({
      title: 'Star Wars: The Force Awakens',
    })).toMatchSnapshot();
  });

  it('fetches tv show id by imdb id', async () => {
    expect(await getId({
      imdbId: 'tt0944947',
      isTvShow: true,
    })).toMatchSnapshot();
  });

  it('fetches tv show id by title', async () => {
    expect(await getId({
      title: 'Game of Thrones',
      isTvShow: true,
    })).toMatchSnapshot();
  });
});
