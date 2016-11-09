/* @flow */

import getCredits from '../getCredits';

const kpId = 714888; // Star Wars: The Force Awakens

describe('kinopoisk/getCredits', () => {
  it('fetches movie credits from kinopoisk for a given id', async () => {
    expect(await getCredits(kpId)).toMatchSnapshot();
  });
});
