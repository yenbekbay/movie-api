/* @flow */

export type TraktApi$MovieSummaryResponse = {
  title: string,
  year: number,
  ids: {
    trakt: number,
    slug: string,
    imdb: string,
    tmdb: number,
  },
  tagline: string,
  overview: string,
  released: string,
  runtime: string,
  trailer: ?string,
  homepage: ?string,
  rating: number,
  votes: number,
  updated_at: string,
  language: string,
  available_translations: Array<string>,
  genres: Array<string>,
  certification: ?string,
};
export type TraktApi$MovieStatsResponse = {
  watchers: number,
  plays: number,
  collectors: number,
  comments: number,
  lists: number,
  votes: number,
};
