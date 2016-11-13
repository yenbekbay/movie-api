/* @flow */

import R from 'ramda';

const childTypesForArray = R.memoize(
  R.pipe(R.map(R.type), R.uniq),
);

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

const modelFromFirstElement = R.pipe(
  R.head,
  modelFromObject,
);
const modelFromFirstElementAtPath = (path: string) => R.pipe(
  R.pathOr([], path.split('.')),
  modelFromFirstElement,
);

export { modelFromObject, modelFromFirstElement, modelFromFirstElementAtPath };
