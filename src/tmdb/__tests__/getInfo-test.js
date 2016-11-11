/* @flow */

import { modelFromObject } from '../../test-utils';
import getInfo from '../getInfo';

const tmdbId = 140607; // Star Wars: The Force Awakens

describe('tmdb/getInfo', () => {
  it('fetches movie info from tmdb for a given id', async () => {
    expect(modelFromObject(await getInfo(tmdbId))).toMatchSnapshot();
  });

  it('formats response according to graphql query', async () => {
    const res = await getInfo(tmdbId, `
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
