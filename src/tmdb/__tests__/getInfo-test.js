/* @flow */

import { modelFromObject } from '../../test-utils';
import getInfo from '../getInfo';

const tmdbId = 140607; // Star Wars: The Force Awakens

describe('tmdb/getInfo', () => {
  it('fetches movie info from tmdb for a given id', async () => {
    expect(modelFromObject(await getInfo(tmdbId))).toMatchSnapshot();
  });
});
