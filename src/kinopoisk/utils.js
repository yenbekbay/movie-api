/* @flow */

const CDN_ROOT = 'http://st.kp.yandex.net/images';

const imageUrlFromPath = (imagePath: string) => `${CDN_ROOT}/${imagePath}`
  .replace('iphone_', 'iphone360_')
  .replace('iphone60', 'iphone360');

// eslint-disable-next-line import/prefer-default-export
export { imageUrlFromPath };
