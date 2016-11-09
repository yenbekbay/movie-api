/* @flow */

import getCrew from '../getCrew';

const kpId = 714888; // Star Wars: The Force Awakens

describe('kinopoisk/getCrew', () => {
  it('fetches movie crew from kinopoisk for a given id', async () => {
    expect(await getCrew(kpId)).toMatchSnapshot();
  });
});
