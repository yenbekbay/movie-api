/* @flow */

import { imageUrlFromPath } from './utils';
import type {
  KinopoiskApi$GalleryItem,
  KinopoiskApi$GetGalleryResponse,
} from './types';

type Gallery = {
  stills: Array<string>,
  posters: Array<string>,
  behindTheScenes: Array<string>,
};

const imageUrlFromGalleryItem = (
  { preview }: KinopoiskApi$GalleryItem,
) => imageUrlFromPath(
  preview.replace('kadr/sm_', 'kadr/'),
);

const filmGalleryFromRes = ({
  gallery: { kadr, poster, kadr_sp: kadrSp } = {},
}: KinopoiskApi$GetGalleryResponse): Gallery => ({
  stills: (kadr || []).map(imageUrlFromGalleryItem),
  posters: (poster || []).map(imageUrlFromGalleryItem),
  behindTheScenes: (kadrSp || []).map(imageUrlFromGalleryItem),
});

export default filmGalleryFromRes;
