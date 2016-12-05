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

  it('fetches trakt slug by imdb id', async () => {
    expect(await trakt.getSlug({ imdbId })).toMatchSnapshot();
  });

  it('fetches movie info for a given trakt slug', async () => {
    expect(
      modelFromObject(await trakt.getMovieInfo(traktId)),
    ).toMatchSnapshot();
  });

  it('fetches movie stats for a given trakt slug', async () => {
    expect(
      modelFromObject(await trakt.getMovieStats(traktId)),
    ).toMatchSnapshot();
  });
});
