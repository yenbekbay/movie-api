/* @flow */

import R from 'ramda';

const CDN_ROOT = 'http://st.kp.yandex.net/images';

const imageUrlFromPath = (imagePath: string) => `${CDN_ROOT}/${imagePath}`
  .replace('iphone_', 'iphone360_')
  .replace('iphone60', 'iphone360');

const parseRuntime = (rawRuntime: ?string): number => (
  rawRuntime
    ? R.pipe(
        R.split(':'),
        R.slice(0, 2),
        ([hours, minutes]: [string, string]): number => R.sum([
          parseInt(hours, 10) * 60,
          parseInt(minutes, 10),
        ]),
        (runtime: number) => (runtime === 0 ? NaN : runtime),
      )(rawRuntime)
    : NaN
);

export { imageUrlFromPath, parseRuntime };
