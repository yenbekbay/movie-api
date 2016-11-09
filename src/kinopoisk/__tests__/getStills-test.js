/* @flow */

import getStills from '../getStills';

const kpId = 714888; // Star Wars: The Force Awakens

describe('kinopoisk/getStills', () => {
  it('fetches movie stills from kinopoisk for a given id', async () => {
    expect(await getStills(kpId)).toMatchSnapshot();
  });
});
