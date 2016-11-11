/* @flow */

import { modelFromObject } from '../../test-utils';
import Kinopoisk from '../';

const kpId = 714888; // Star Wars: The Force Awakens
const movieQuery = {
  title: 'Звёздные войны: Пробуждение силы',
};
const tvShowQuery = {
  title: 'Игра престолов',
  isTvShow: true,
};

describe('Kinopoisk', () => {
  let kp: Kinopoisk;

  beforeAll(() => {
    kp = new Kinopoisk();
  });

  it('fetches movie info from kinopoisk for a given id', async () => {
    expect(modelFromObject(await kp.getInfo(kpId))).toMatchSnapshot();
  });

  it('formats response according to graphql query', async () => {
    const res = await kp.getInfo(kpId, `
      {
        kpId
        title
        synopsis
      }
    `);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('finds best movie id for a given query', async () => {
    expect(await kp.getId(movieQuery)).toMatchSnapshot();
  }, 7000);

  it('finds best tv show id for a given query', async () => {
    expect(await kp.getId(tvShowQuery)).toMatchSnapshot();
  }, 7000);

  it('fetches movie credits from kinopoisk for a given id', async () => {
    expect(await kp.getCredits(kpId)).toMatchSnapshot();
  });
});
