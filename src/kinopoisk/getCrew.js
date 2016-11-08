/* @flow */

import R from 'ramda';

import { normalizeCdnImageUrl } from './utils';
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
  name: {
    ru: ?string,
    en: ?string,
  },
  photoUrl: ?string,
};
type Crew = {
  cast: Array<CrewMember>,
  directors: Array<CrewMember>,
  producers: Array<CrewMember>,
  writers: Array<CrewMember>,
  composers: Array<CrewMember>,
};

const getCrew = async (id: number): Promise<?Crew> => {
  const res: ?KinopoiskApi$GetStaffResponse =
    await connector.apiGet('getStaff', { filmID: id });

  if (!res) return null;

  return R.pipe(
    R.flatten,
    R.groupBy(R.prop('professionKey')),
    R.pick(['actor', 'director', 'producer', 'writer', 'composer']),
    R.map(R.pipe(
      R.slice(0, 10),
      R.map(({ nameRU, nameEN, posterURL }: KinopoiskApi$CrewMember) => ({
        name: {
          ru: nameRU,
          en: nameEN,
        },
        photoUrl: posterURL ? normalizeCdnImageUrl(posterURL) : null,
      })),
    )),
    ({ actor, director, producer, writer, composer }: Object) => ({
      cast: actor,
      directors: director,
      producers: producer,
      writers: writer,
      composers: composer,
    }),
  )(res.creators);
};

export default getCrew;
