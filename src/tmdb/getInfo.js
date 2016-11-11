/* @flow */

import gql from 'graphql-tag';
import graphql from 'graphql-anywhere';
import R from 'ramda';

import { imageUrlFromPath } from './utils';
import connector from './connector';

type TmdbApi$Collection = {
  id: number,
  name: string,
  poster_path?: ?string,
  backdrop_path?: ?string,
};
type TmdbApi$Genre = {
  id: number,
  name: string,
};
type TmdbApi$ProductionCompany = {
  id: number,
  name: string,
};
type TmdbApi$ProductionCountry = {
  iso_3166_1: string,
  name: string,
};
type TmdbApi$Language = {
  iso_639_1: string,
  name: string,
};
type TmdbApi$CastMember = {
  cast_id: number,
  character: ?string,
  credit_id: string,
  id: number,
  name: string,
  order: number,
  profile_path: ?string,
};
type TmdbApi$CrewMember = {
  credit_id: string,
  department: string,
  id: number,
  job: string,
  name: string,
  profile_path: ?string,
};
type TmdbApi$Keyword = {
  id: number,
  name: string,
};
type TmdbApi$Video = {
  id: string,
  iso_639_1: string,
  iso_3166_1: string,
  key: string,
  name: string,
  site: 'YouTube',
  size: number,
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette',
};

type TmdbApi$GetMovieDetailsResponse = {
  adult: boolean,
  backdrop_path: ?string,
  belongs_to_collection: ?TmdbApi$Collection,
  budget: number,
  genres: Array<TmdbApi$Genre>,
  homepage: ?string,
  id: string,
  imdb_id: ?string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: ?string,
  production_companies: Array<TmdbApi$ProductionCompany>,
  production_countries: Array<TmdbApi$ProductionCountry>,
  release_date: ?string,
  revenue: number,
  runtime: number,
  spoken_languages: ?Array<TmdbApi$Language>,
  status: 'Released',
  tagline: ?string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,

  credits?: {
    cast: Array<TmdbApi$CastMember>,
    crew: Array<TmdbApi$CrewMember>,
  },
  keywords?: {
    keywords: Array<TmdbApi$Keyword>,
  },
  videos?: {
    results: Array<TmdbApi$Video>,
  },
};

const detailMethods = [
  'credits',
  'keywords',
  'videos',
];

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

const getInfo = async (id: number, query: void | string) => {
  const res: ?TmdbApi$GetMovieDetailsResponse = await connector.apiGet(
    `movie/${id}`,
    { append_to_response: detailMethods.join(',') },
  );

  if (!res) return null;

  const {
    backdrop_path: backdropPath,
    budget,
    genres,
    homepage,
    id: tmdbId,
    imdb_id: imdbId,
    original_language: originalLanguage,
    original_title: originalTitle,
    overview: synopsis,
    popularity: tmdbPopularity,
    poster_path: posterPath,
    production_companies: productionCompanies,
    production_countries: productionCountries,
    release_date: releaseDate,
    revenue,
    runtime,
    tagline,
    title,
    vote_average: tmdbRating,
    vote_count: tmdbRatingVoteCount,
    credits,
  } = res;

  const finalRes = {
    backdropUrl: backdropPath ? imageUrlFromPath(backdropPath, 1000) : null,
    budget,
    genres: genres.map(({ name }: TmdbApi$Genre) => name),
    homepage,
    tmdbId,
    imdbId,
    originalLanguage,
    originalTitle,
    synopsis,
    tmdbPopularity,
    posterUrl: posterPath ? imageUrlFromPath(posterPath, 500) : null,
    productionCompanies: productionCompanies.map(
      ({ name }: TmdbApi$ProductionCompany) => name,
    ),
    productionCountries,
    releaseDate,
    revenue: revenue === 0 ? null : revenue,
    runtime: runtime === 0 ? null : runtime,
    tagline,
    title,
    tmdbRating,
    tmdbRatingVoteCount,
    credits: {
      cast: getCast(credits),
      crew: {
        directors: getCreditsByJob(credits, ['Director']),
        producers: getCreditsByJob(credits, [
          'Associate Producer',
          'Co-Producer',
          'Executive Producer',
          'Producer',
        ]),
        writers: getCreditsByJob(credits, ['Screenplay', 'Characters']),
        composers: getCreditsByJob(credits, ['Original Music Composer']),
        cinematographers: getCreditsByJob(credits, ['Director of Photography']),
      },
    },
  };

  if (!query) return finalRes;

  return graphql(R.prop, gql`${query}`, finalRes);
};

export default getInfo;
