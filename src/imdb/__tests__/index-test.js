/* @flow */

import {modelFromObject} from '../../testUtils';
import Imdb from '../index';

const movieId = 'tt3330764'; // Star Wars: The Force Awakens

describe('IMDB', () => {
  let imdb: Imdb;

  beforeAll(() => {
    imdb = new Imdb();
  });

  it('fetches movie rating by id', async () => {
    expect(modelFromObject(await imdb.getRating(movieId))).toMatchSnapshot();
  });

  it('fetches movie popularity by id', async () => {
    expect(typeof await imdb.getPopularity(movieId)).toEqual('number');
  });
});
