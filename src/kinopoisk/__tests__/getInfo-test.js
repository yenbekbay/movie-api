/* @flow */

import { modelFromObject } from '../../test-utils';
import getInfo from '../getInfo';

const kpId = 714888; // Star Wars: The Force Awakens

describe('kinopoisk/getInfo', () => {
  it('fetches movie info from kinopoisk for a given id', async () => {
    expect(modelFromObject(await getInfo(kpId))).toMatchSnapshot();
  });
});
