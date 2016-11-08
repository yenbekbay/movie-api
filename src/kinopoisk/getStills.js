/* @flow */

import R from 'ramda';

import { normalizeCdnImageUrl } from './utils';
import connector from './connector';

type KinopoiskApi$GalleryItem = {
  image: string,
  preview: string,
};
type KinopoiskApi$GetGalleryResponse = {
  gallery?: {
    kadr?: ?Array<KinopoiskApi$GalleryItem>,
    kadr_sp?: ?Array<KinopoiskApi$GalleryItem>,
    poster?: ?Array<KinopoiskApi$GalleryItem>,
  },
};

const getStills = async (id: number): Promise<?Array<string>> => {
  const res: ?KinopoiskApi$GetGalleryResponse =
    await connector.get('getGallery', { filmID: id });

  if (!res) return null;

  return R.pipe(
    R.propOr([], 'kadr'),
    R.map(
      ({ image }: KinopoiskApi$GalleryItem) => normalizeCdnImageUrl(image),
    ),
  )(res.gallery);
};

export default getStills;
