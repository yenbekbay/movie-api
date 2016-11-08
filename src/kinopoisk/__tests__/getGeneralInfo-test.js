/* @flow */

import getGeneralInfo from '../getGeneralInfo';

const kpId = 714888; // Star Wars: The Force Awakens

describe('getGeneralInfo', () => {
  it('fetches general movie info from kinopoisk for a given id', async () => {
    expect(await getGeneralInfo(kpId)).toMatchSnapshot();
  });
});
