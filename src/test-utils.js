/* @flow */

import R from 'ramda';
// eslint-disable-next-line import/no-extraneous-dependencies
import type from 'type-detect';

const childTypesForArray = R.memoize(R.pipe(R.map(type), R.uniq));

const modelFromObject = (obj: ?Object) => R.map(
  R.cond([
    [
      R.allPass([
        R.pipe(type, R.equals('Array')),
        R.pipe(childTypesForArray, R.head, R.equals('Object')),
      ]),
      (val: Array<any>) => [R.pipe(R.head, modelFromObject)(val)],
    ],
    [
      R.allPass([
        R.pipe(type, R.equals('Array')),
        R.pipe(childTypesForArray, R.length, R.equals(1)),
      ]),
      (val: Array<any>) => `Array<${R.pipe(childTypesForArray, R.head)(val)}>`,
    ],
    [R.pipe(type, R.contains(R.__, ['Object', 'Array'])), modelFromObject],
    [R.T, type],
  ]),
  obj,
);

export { modelFromObject }; // eslint-disable-line import/prefer-default-export
