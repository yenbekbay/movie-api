/* @flow */

const CDN_ROOT = 'http://st.kp.yandex.net/images';

const normalizeCdnImageUrl = (imageUrl: string) => `${CDN_ROOT}/${imageUrl}`
  .replace('iphone_', 'iphone360_')
  .replace('iphone60', 'iphone360');

// eslint-disable-next-line import/prefer-default-export
export { normalizeCdnImageUrl };
