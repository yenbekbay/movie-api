/* @flow */

const CDN_ROOT = 'https://image.tmdb.org/t/p';

const imageUrlFromPath = (imagePath: string, width: number) =>
  `${CDN_ROOT}/w${width}${imagePath}`;

export {imageUrlFromPath};
