/* @flow */

import {modelFromObject} from '../../testUtils';
import Tmdb from '../index';

const movieId = 140607; // Star Wars: The Force Awakens
const tvShowId = 1399; // Game of Thrones

describe('TMDB', () => {
  let tmdb: Tmdb;

  beforeAll(() => {
    tmdb = new Tmdb();
  });

  it('fetches movie id by imdb id', async () => {
    expect(await tmdb.getMovieId({imdbId: 'tt2488496'})).toMatchSnapshot();
  });

  it('fetches movie id by title', async () => {
    expect(
      await tmdb.getMovieId({
        title: 'Star Wars: The Force Awakens',
      }),
    ).toMatchSnapshot();
  });

  it('fetches tv show id by imdb id', async () => {
    expect(
      await tmdb.getTvShowId({
        imdbId: 'tt0944947',
      }),
    ).toMatchSnapshot();
  });

  it('fetches tv show id by title', async () => {
    expect(
      await tmdb.getTvShowId({
        title: 'Game of Thrones',
      }),
    ).toMatchSnapshot();
  });

  it('fetches movie info from tmdb for a given id', async () => {
    expect(modelFromObject(await tmdb.getMovieInfo(movieId))).toMatchSnapshot();
  });

  it('fetches tv show info from tmdb for a given id', async () => {
    expect(
      modelFromObject(await tmdb.getTvShowInfo(tvShowId)),
    ).toMatchSnapshot();
  });
});
