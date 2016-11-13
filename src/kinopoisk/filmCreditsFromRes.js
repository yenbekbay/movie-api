/* @flow */

import R from 'ramda';

import { imageUrlFromPath } from './utils';
import type {
  KinopoiskApi$CrewMember,
  KinopoiskApi$GetStaffResponse,
} from './types';

type CrewMember = {
  name: string,
  photoUrl: ?string,
};
type Credits = {
  cast: Array<CrewMember>,
  crew: {
    directors: Array<CrewMember>,
    producers: Array<CrewMember>,
    writers: Array<CrewMember>,
    composers: Array<CrewMember>,
    cinematographers: Array<CrewMember>,
  },
};

const filmCreditsFromRes = (
  { creators }: KinopoiskApi$GetStaffResponse,
): Credits => R.pipe(
  R.flatten,
  R.groupBy(R.prop('professionKey')),
  R.pick(['actor', 'director', 'producer', 'writer', 'composer', 'operator']),
  R.map(R.pipe(
    R.slice(0, 10),
    R.map(({ nameRU, posterURL }: KinopoiskApi$CrewMember) => ({
      name: nameRU,
      photoUrl: posterURL ? imageUrlFromPath(posterURL) : null,
    })),
  )),
  ({ actor, director, producer, writer, composer, operator }: Object) => ({
    cast: actor,
    crew: {
      directors: director,
      producers: producer,
      writers: writer,
      composers: composer,
      cinematographers: operator,
    },
  }),
)(creators);

export default filmCreditsFromRes;
