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
    expect(await tmdb.getMovieId({ imdbId: 'tt2488496' })).toMatchSnapshot();
  });

  it('fetches movie id by title', async () => {
    expect(await tmdb.getMovieId({
      title: 'Star Wars: The Force Awakens',
    })).toMatchSnapshot();
  });

  it('fetches tv show id by imdb id', async () => {
    expect(await tmdb.getTvShowId({
      imdbId: 'tt0944947',
    })).toMatchSnapshot();
  });

  it('fetches tv show id by title', async () => {
    expect(await tmdb.getTvShowId({
      title: 'Game of Thrones',
    })).toMatchSnapshot();
  });

  it('fetches movie info from tmdb for a given id', async () => {
    expect(modelFromObject(await tmdb.getMovieInfo(tmdbId))).toMatchSnapshot();
  });

  it('formats movie info response according to graphql query', async () => {
    const res = await tmdb.getMovieInfo(tmdbId, `
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
