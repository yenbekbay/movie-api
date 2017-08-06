/* @flow */

import R from 'ramda';

import type {TraktApi$MovieSummaryResponse} from './types';

const trailerYtTrailerIdFromRes = (
  res: TraktApi$MovieSummaryResponse,
): ?string => R.nth(1, (res.trailer || '').match(/\/watch\?v=(.*)/) || []);

const movieInfoFromRes = (res: TraktApi$MovieSummaryResponse) => ({
  title: res.title,
  year: res.year,
  traktId: res.ids.trakt,
  traktSlug: res.ids.slug,
  tmdbId: res.ids.tmdb,
  imdbId: res.ids.imdb,
  tagline: res.tagline,
  synopsis: res.overview,
  releaseDate: res.released,
  runtime: res.runtime,
  ytTrailerId: trailerYtTrailerIdFromRes(res),
  homepage: res.homepage,
  traktRating: res.rating,
  traktRatingVoteCount: res.votes,
  originalLanguage: res.language,
  genres: res.genres || [],
  mpaaRating: res.certification,
});

export default movieInfoFromRes;
