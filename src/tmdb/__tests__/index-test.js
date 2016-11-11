/* @flow */

import { modelFromObject } from '../../test-utils';
import Tmdb from '../index';

const tmdbId = 140607; // Star Wars: The Force Awakens

describe('TMDB', () => {
  let tmdb: Tmdb;

  beforeAll(() => {
    tmdb = new Tmdb();
  });

  it('fetches movie id by imdb id', async () => {
    expect(await tmdb.getId({ imdbId: 'tt2488496' })).toMatchSnapshot();
  });

  it('fetches movie id by title', async () => {
    expect(await tmdb.getId({
      title: 'Star Wars: The Force Awakens',
    })).toMatchSnapshot();
  });

  it('fetches tv show id by imdb id', async () => {
    expect(await tmdb.getId({
      imdbId: 'tt0944947',
      isTvShow: true,
    })).toMatchSnapshot();
  });

  it('fetches tv show id by title', async () => {
    expect(await tmdb.getId({
      title: 'Game of Thrones',
      isTvShow: true,
    })).toMatchSnapshot();
  });

  it('fetches movie info from tmdb for a given id', async () => {
    expect(modelFromObject(await tmdb.getInfo(tmdbId))).toMatchSnapshot();
  });

  it('formats response according to graphql query', async () => {
    const res = await tmdb.getInfo(tmdbId, `
      {
        tmdbId
        imdbId
        title
        synopsis
      }
    `);

    expect(modelFromObject(res)).toMatchSnapshot();
  });
});
