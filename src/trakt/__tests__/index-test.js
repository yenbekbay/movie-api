/* @flow */

import {modelFromObject} from '../../testUtils';
import Trakt from '../index';

const sampleImdbId = 'tt2488496'; // Star Wars: The Force Awakens
const sampleTraktId = 'star-wars-the-force-awakens-2015';

describe('Trakt', () => {
  let trakt: Trakt;

  beforeAll(() => {
    trakt = new Trakt();
  });

  it('fetches trakt slug by imdb id', async () => {
    expect(await trakt.getSlug({imdbId: sampleImdbId})).toMatchSnapshot();
  });

  it('fetches movie info for a given trakt slug', async () => {
    expect(
      modelFromObject(await trakt.getMovieInfo(sampleTraktId)),
    ).toMatchSnapshot();
  });

  it('fetches movie stats for a given trakt slug', async () => {
    expect(
      modelFromObject(await trakt.getMovieStats(sampleTraktId)),
    ).toMatchSnapshot();
  });
});
