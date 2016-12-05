/* @flow */

import { modelFromObject } from '../../test-utils';
import Trakt from '../index';

const imdbId = 'tt2488496'; // Star Wars: The Force Awakens
const traktId = 'star-wars-the-force-awakens-2015';

describe('Trakt', () => {
  let trakt: Trakt;

  beforeAll(() => {
    trakt = new Trakt();
  });

  it('fetches movie id by imdb id', async () => {
    expect(await trakt.getId({ imdbId })).toMatchSnapshot();
  });

  it('fetches movie stats for a given id', async () => {
    expect(
      modelFromObject(await trakt.getMovieStats(traktId)),
    ).toMatchSnapshot();
  });
});
