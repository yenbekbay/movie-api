/* @flow */

import R from 'ramda';

import getGeneralInfo from '../getGeneralInfo';

const kpId = 714888; // Star Wars: The Force Awakens

const childTypesForArray = R.memoize(R.pipe(R.map(R.type), R.uniq));
const modelFromObject = (obj: ?Object) => R.map(
  R.cond([
    [
      R.allPass([
        R.pipe(R.type, R.equals('Array')),
        R.pipe(childTypesForArray, R.length, R.equals(1)),
      ]),
      (val: Array<any>) => `Array<${R.pipe(childTypesForArray, R.head)(val)}>`,
    ],
    [R.pipe(R.type, R.contains(R.__, ['Object', 'Array'])), modelFromObject],
    [R.T, R.type],
  ]),
  obj,
);

describe('kinopoisk/getGeneralInfo', () => {
  it('fetches general movie info from kinopoisk for a given id', async () => {
    expect(modelFromObject(await getGeneralInfo(kpId))).toMatchSnapshot();
  });
});
