/* @flow */

import { __getInfo, __getCrew, __getStills } from '../getMovieInfo';

const kpId = 714888; // Star Wars: The Force Awakens

describe('getMovieInfo', () => {
  it('fetches movie info from kinopoisk for a given id', async () => {
    expect(await __getInfo(kpId)).toMatchSnapshot();
  });

  it('fetches movie crew from kinopoisk for a given id', async () => {
    expect(await __getCrew(kpId)).toMatchSnapshot();
  });

  it('fetches movie stills from kinopoisk for a given id', async () => {
    expect(await __getStills(kpId)).toMatchSnapshot();
  });
});
