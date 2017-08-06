/* @flow */

import {castFromCredits, crewFromCredits} from './creditsFromRes';
import {imageUrlFromPath} from './utils';
import type {
  TmdbApi$Genre,
  TmdbApi$GetMovieDetailsResponse,
  TmdbApi$Keyword,
  TmdbApi$ProductionCompany,
  TmdbApi$Video,
} from './types';

const movieInfoFromRes = (res: TmdbApi$GetMovieDetailsResponse) => ({
  backdropUrl: res.backdrop_path
    ? imageUrlFromPath(res.backdrop_path, 1000)
    : null,
  budget: res.budget,
  genres: res.genres.map(({name}: TmdbApi$Genre) => name),
  homepage: res.homepage,
  tmdbId: res.id,
  imdbId: res.imdb_id,
  originalLanguage: res.original_language,
  originalTitle: res.original_title,
  synopsis: res.overview,
  tmdbPopularity: res.popularity,
  posterUrl: res.poster_path ? imageUrlFromPath(res.poster_path, 500) : null,
  productionCompanies: res.production_companies.map(
    ({name}: TmdbApi$ProductionCompany) => name,
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
    cast: castFromCredits(res.credits),
    crew: {
      directors: crewFromCredits(res.credits, ['Director']),
      producers: crewFromCredits(res.credits, [
        'Associate Producer',
        'Co-Producer',
        'Executive Producer',
        'Producer',
      ]),
      writers: crewFromCredits(res.credits, ['Screenplay', 'Characters']),
      composers: crewFromCredits(res.credits, ['Original Music Composer']),
      cinematographers: crewFromCredits(res.credits, [
        'Director of Photography',
      ]),
    },
  },
  keywords: ((res.keywords || {}).keywords || [])
    .map(({name}: TmdbApi$Keyword) => name),
  videos: ((res.videos || {}).results || []).map((video: TmdbApi$Video) => ({
    iso_639_1: video.iso_639_1,
    iso_3166_1: video.iso_3166_1,
    key: video.key,
    name: video.name,
    site: video.site,
    size: video.size,
    type: video.type,
  })),
});

export default movieInfoFromRes;
