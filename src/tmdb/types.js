/* @flow */

export type TmdbApi$Collection = {
  id: number,
  name: string,
  poster_path?: ?string,
  backdrop_path?: ?string,
};
export type TmdbApi$Genre = {
  id: number,
  name: string,
};
export type TmdbApi$ProductionCompany = {
  id: number,
  name: string,
};
export type TmdbApi$ProductionCountry = {
  iso_3166_1: string,
  name: string,
};
export type TmdbApi$Language = {
  iso_639_1: string,
  name: string,
};
export type TmdbApi$CastMember = {
  cast_id: number,
  character: ?string,
  credit_id: string,
  id: number,
  name: string,
  order: number,
  profile_path: ?string,
};
export type TmdbApi$CrewMember = {
  credit_id: string,
  department: string,
  id: number,
  job: string,
  name: string,
  profile_path: ?string,
};
export type TmdbApi$Keyword = {
  id: number,
  name: string,
};
export type TmdbApi$Video = {
  id: string,
  iso_639_1: string,
  iso_3166_1: string,
  key: string,
  name: string,
  site: string,
  size: number,
  type: string,
};
export type TmdbApi$CreatedBy = {
  id: number,
  name: string,
  profile_path: ?string,
};
export type TmdbApi$TvNetwork = {
  id: number,
  name: string,
};
export type TmdbApi$TvShowSeason = {
  air_date: string,
  episode_count: number,
  id: number,
  poster_path: ?string,
  season_number: number,
};

export type TmdbApi$GetMovieDetailsResponse = {
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
  status: string,
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
export type TmdbApi$GetTvShowDetailsResponse = {
  backdrop_path: ?string,
  created_by: Array<TmdbApi$CreatedBy>,
  episode_run_time: Array<number>,
  first_air_date: ?string,
  genres: Array<TmdbApi$Genre>,
  homepage: ?string,
  id: string,
  in_production: boolean,
  languages: Array<string>,
  last_air_date: ?string,
  name: string,
  networks: Array<TmdbApi$TvNetwork>,
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: Array<string>,
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: ?string,
  production_companies: Array<TmdbApi$ProductionCompany>,
  seasons: Array<TmdbApi$TvShowSeason>,
  status: string,
  type: string,
  vote_average: number,
  vote_count: number,

  credits?: {
    cast: Array<TmdbApi$CastMember>,
    crew: Array<TmdbApi$CrewMember>,
  },
  keywords?: {
    results: Array<TmdbApi$Keyword>,
  },
  videos?: {
    results: Array<TmdbApi$Video>,
  },
};
