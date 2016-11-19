# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.3.0"></a>
# [0.3.0](https://github.com/anvilabs/movie-api/compare/v0.2.0...v0.3.0) (2016-11-19)


### Features

* **tmdb:** add throttling to respect TMDB API's rate limits ([e428a61](https://github.com/anvilabs/movie-api/commit/e428a61))
* add IMDB source ([5f935b8](https://github.com/anvilabs/movie-api/commit/5f935b8))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/anvilabs/movie-api/compare/v0.1.0...v0.2.0) (2016-11-13)


### Features

* revamp Kinopoisk connector ([eeb5399](https://github.com/anvilabs/movie-api/commit/eeb5399))
* **kinopoisk:** add `getCinemasInCity` and `getCinemaInfo` ([3b1d4cc](https://github.com/anvilabs/movie-api/commit/3b1d4cc))
* **kinopoisk:** add `getGallery` and `getSimilar` methods ([4586816](https://github.com/anvilabs/movie-api/commit/4586816))
* **kinopoisk:** add `getSupportedCountries` and `getSupportedCities` ([b94b0c2](https://github.com/anvilabs/movie-api/commit/b94b0c2))
* **kinopoisk:** document and test support for graphql fragments ([95b5a16](https://github.com/anvilabs/movie-api/commit/95b5a16))
* **kinopoisk:** rename methods with higher specificality ([fb2d0cb](https://github.com/anvilabs/movie-api/commit/fb2d0cb))
* **tmdb:** add `getTvShowInfo` method ([279494f](https://github.com/anvilabs/movie-api/commit/279494f))
* **tmdb:** break down `getId` into two methods ([0ea39a8](https://github.com/anvilabs/movie-api/commit/0ea39a8))
* **tmdb:** rename `getInfo` to `getMovieInfo` ([5ae3134](https://github.com/anvilabs/movie-api/commit/5ae3134))


### BREAKING CHANGES

* tmdb: `Tmdb#getInfo` has been replaced by `Tmdb#getMovieInfo`
* tmdb: `Tmdb#getId` has been replaced by `Tmdb#getTvShowId` and `Tmdb#getMovieId`
* kinopoisk: Existing Kinopoisk methods have been renamed as follows:
  * `Kinopoisk#getInfo` → `Kinopoisk#getFilmInfo`
  * `Kinopoisk#getId` → `Kinopoisk#getFilmId`
  * `Kinopoisk#getCredits` → `Kinopoisk#getFilmCredits`



<a name="0.1.0"></a>
# 0.1.0 (2016-11-11)

Initial release.
