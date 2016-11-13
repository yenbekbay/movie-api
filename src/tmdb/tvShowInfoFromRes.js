/* @flow */

import { castFromCredits, crewFromCredits } from './creditsFromRes';
import { imageUrlFromPath } from './utils';
import type {
  TmdbApi$CreatedBy,
  TmdbApi$Genre,
  TmdbApi$GetTvShowDetailsResponse,
  TmdbApi$Keyword,
  TmdbApi$ProductionCompany,
  TmdbApi$TvNetwork,
  TmdbApi$TvShowSeason,
  TmdbApi$Video,
} from './types';

const tvShowInfoFromRes = (
  res: TmdbApi$GetTvShowDetailsResponse,
) => ({
  backdropUrl: res.backdrop_path
    ? imageUrlFromPath(res.backdrop_path, 1000)
    : null,
  createdBy: res.created_by.map(({
    name,
    profile_path: profilePath,
  }: TmdbApi$CreatedBy) => ({
    name,
    photoUrl: profilePath ? imageUrlFromPath(profilePath, 300) : null,
  })),
  episodeRuntime: res.episode_run_time,
  firstAirDate: res.first_air_date,
  genres: res.genres.map(({ name }: TmdbApi$Genre) => name),
  homepage: res.homepage,
  tmdbId: res.id,
  inProduction: res.in_production,
  languages: res.languages,
  lastAirDate: res.last_air_date,
  name: res.name,
  networks: res.networks.map(({ name }: TmdbApi$TvNetwork) => name),
  numberOfEpisodes: res.number_of_episodes,
  numberOfSeasons: res.number_of_seasons,
  originCountry: res.origin_country,
  originalLanguage: res.original_language,
  originalName: res.original_name,
  synopsis: res.overview,
  tmdbPopularity: res.popularity,
  posterUrl: res.poster_path ? imageUrlFromPath(res.poster_path, 500) : null,
  productionCompanies: res.production_companies.map(
    ({ name }: TmdbApi$ProductionCompany) => name,
  ),
  seasons: res.seasons.map((season: TmdbApi$TvShowSeason) => ({
    airDate: season.air_date,
    episodeCount: season.episode_count,
    posterUrl: season.poster_path
      ? imageUrlFromPath(season.poster_path, 500)
      : null,
    seasonNumber: season.season_number,
  })),
  status: res.status,
  type: res.type,
  tmdbRating: res.vote_average,
  tmdbRatingVoteCount: res.vote_count,
  credits: ({
    cast: castFromCredits(res.credits),
    crew: crewFromCredits(res.credits),
  }),
  keywords: ((res.keywords || {}).results || [])
    .map(({ name }: TmdbApi$Keyword) => name),
  videos: ((res.videos || {}).results || [])
    .map((video: TmdbApi$Video) => ({
      iso_639_1: video.iso_639_1,
      iso_3166_1: video.iso_3166_1,
      key: video.key,
      name: video.name,
      site: video.site,
      size: video.size,
      type: video.type,
    })),
});

export default tvShowInfoFromRes;
