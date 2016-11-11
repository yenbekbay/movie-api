/* @flow */

import R from 'ramda';

import { imageUrlFromPath } from './utils';
import connector from './connector';

type KinopoiskApi$CrewMember = {
  id: string,
  type: 'KPPeople',
  nameRU?: ?string,
  nameEN?: ?string,
  posterURL?: ?string,
  description?: ?string,
  professionText: string,
  professionKey: 'actor' | 'director' | 'producer' | 'writer' | 'composer',
};
type KinopoiskApi$GetStaffResponse = {
  creators?: Array<Array<KinopoiskApi$CrewMember>>,
};

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

const getCredits = async (id: number): Promise<?Credits> => {
  const res: ?KinopoiskApi$GetStaffResponse =
    await connector.apiGet('getStaffList', { filmID: id });

  if (!res) return null;

  return R.pipe(
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
  )(res.creators);
};

export default getCredits;
