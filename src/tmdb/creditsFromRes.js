/* @flow */

import R from 'ramda';

import { imageUrlFromPath } from './utils';
import type {
  TmdbApi$CastMember,
  TmdbApi$CrewMember,
} from './types';

type CastMember = {
  character: ?string,
  name: string,
  photoUrl: ?string,
};

const castFromCredits = (
  credits: ?{ cast: Array<TmdbApi$CastMember> },
): Array<CastMember> => R.pipe(
  R.propOr([], 'cast'),
  R.map(({
    character,
    name,
    profile_path: profilePath,
  }: TmdbApi$CastMember): CastMember => ({
    character,
    name,
    photoUrl: profilePath ? imageUrlFromPath(profilePath, 300) : null,
  })),
)(credits);

type CrewMember = {
  job: string,
  name: string,
  photoUrl: string,
};

const crewFromCredits = (
  credits: ?{ crew: Array<TmdbApi$CrewMember> },
  jobs?: Array<string>,
): Array<CrewMember> => R.pipe(
  R.propOr([], 'crew'),
  jobs
    ? R.filter(R.pipe(R.prop('job'), R.contains(R.__, jobs)))
    : R.identity,
  R.map(({
    department,
    job,
    name,
    profile_path: profilePath,
  }: TmdbApi$CrewMember) => ({
    department,
    job,
    name,
    photoUrl: profilePath ? imageUrlFromPath(profilePath, 300) : null,
  })),
)(credits);

export { castFromCredits, crewFromCredits };
