/* @flow */

import R from 'ramda';

import { imageUrlFromPath } from './utils';
import type {
  TmdbApi$CastMember,
  TmdbApi$CrewMember,
  TmdbApi$Genre,
  TmdbApi$GetMovieDetailsResponse,
  TmdbApi$ProductionCompany,
} from './types';

type CastMember = {
  character: ?string,
  name: string,
  photoUrl: ?string,
};

const getCast = (
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

const getCreditsByJob = (
  credits: ?{ crew: Array<TmdbApi$CrewMember> },
  jobs: Array<string>,
): Array<CrewMember> => R.pipe(
  R.propOr([], 'crew'),
  R.filter(R.pipe(R.prop('job'), R.contains(R.__, jobs))),
  R.map(({ job, name, profile_path: profilePath }: TmdbApi$CrewMember) => ({
    job,
    name,
    photoUrl: profilePath ? imageUrlFromPath(profilePath, 300) : null,
  })),
)(credits);

const infoFromRes = (
  res: TmdbApi$GetMovieDetailsResponse,
) => ({
  backdropUrl: res.backdrop_path
    ? imageUrlFromPath(res.backdrop_path, 1000)
    : null,
  budget: res.budget,
  genres: res.genres.map(({ name }: TmdbApi$Genre) => name),
  homepage: res.homepage,
  tmdbId: res.id,
  imdbId: res.imdb_id,
  originalLanguage: res.original_language,
  originalTitle: res.original_title,
  synopsis: res.overview,
  tmdbPopularity: res.popularity,
  posterUrl: res.poster_path ? imageUrlFromPath(res.poster_path, 500) : null,
  productionCompanies: res.production_companies.map(
    ({ name }: TmdbApi$ProductionCompany) => name,
  ),
  productionCountries: res.production_countries,
  releaseDate: res.release_date,
  revenue: res.revenue === 0 ? null : res.revenue,
  runtime: res.runtime === 0 ? null : res.runtime,
  tagline: res.tagline,
  title: res.title,
  tmdbRating: res.vote_average,
  tmdbRatingVoteCount: res.vote_count,
  credits: {
    cast: getCast(res.credits),
    crew: {
      directors: getCreditsByJob(res.credits, ['Director']),
      producers: getCreditsByJob(res.credits, [
        'Associate Producer',
        'Co-Producer',
        'Executive Producer',
        'Producer',
      ]),
      writers: getCreditsByJob(res.credits, ['Screenplay', 'Characters']),
      composers: getCreditsByJob(res.credits, ['Original Music Composer']),
      cinematographers: getCreditsByJob(
        res.credits, ['Director of Photography'],
      ),
    },
  },
});

export {
  getCast as __getCast,
  getCreditsByJob as __getCreditsByJob,
};
export default infoFromRes;
