# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.14.2"></a>
## [0.14.2](https://github.com/anvilabs/movie-api/compare/v0.14.1...v0.14.2) (2016-12-13)


### Bug Fixes

* **kinopoisk:** account for missing `ratingData` in `getFilm`'s response ([7ccb86c](https://github.com/anvilabs/movie-api/commit/7ccb86c))



<a name="0.14.1"></a>
## [0.14.1](https://github.com/anvilabs/movie-api/compare/v0.14.0...v0.14.1) (2016-12-07)


### Bug Fixes

* **kinopoisk:** fix broken flow type inference ([a79991a](https://github.com/anvilabs/movie-api/commit/a79991a))
* **tmdb:** use correct type for `id` in responses ([c153deb](https://github.com/anvilabs/movie-api/commit/c153deb))
* **trakt:** fix broken flow type inference ([0436adf](https://github.com/anvilabs/movie-api/commit/0436adf))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/anvilabs/movie-api/compare/v0.13.0...v0.14.0) (2016-12-07)


### Features

* **tmdb:** add an ability to override language for responses ([7755f4f](https://github.com/anvilabs/movie-api/commit/7755f4f))
* add missing flow typings ([a54c433](https://github.com/anvilabs/movie-api/commit/a54c433))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/anvilabs/movie-api/compare/v0.12.0...v0.13.0) (2016-12-06)


### Features

* **kinopoisk:** improve search accuracy ([a6b0674](https://github.com/anvilabs/movie-api/commit/a6b0674))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/anvilabs/movie-api/compare/v0.11.1...v0.12.0) (2016-12-06)


### Features

* retry html requests when applicable ([d6ab4aa](https://github.com/anvilabs/movie-api/commit/d6ab4aa))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/anvilabs/movie-api/compare/v0.11.0...v0.11.1) (2016-12-05)



<a name="0.11.0"></a>
# [0.11.0](https://github.com/anvilabs/movie-api/compare/v0.10.2...v0.11.0) (2016-12-05)


### Features

* remove graphql querying functionality ([35f3e50](https://github.com/anvilabs/movie-api/commit/35f3e50))
* **tmdb:** throw errors for invalid queries ([d1603b9](https://github.com/anvilabs/movie-api/commit/d1603b9))
* **trakt:** add `getMovieInfo` method and rename `getId` to `getSlug` ([dfa778f](https://github.com/anvilabs/movie-api/commit/dfa778f))


### BREAKING CHANGES

* tmdb: `Tmdb#getTvShowId` and `Tmdb#getMovieId` will now throw errors instead of returning null if provided invalid queries
* trakt: `Trakt#getId` has been replaced by `Trakt#getSlug`
* the optional graphql query parameter, which has been available for many of the API's methods, no longer has any effect



<a name="0.10.2"></a>
## [0.10.2](https://github.com/anvilabs/movie-api/compare/v0.10.1...v0.10.2) (2016-11-29)


### Bug Fixes

* work out remaining ramda bugs ([6782ad4](https://github.com/anvilabs/movie-api/commit/6782ad4))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/anvilabs/movie-api/compare/v0.10.0...v0.10.1) (2016-11-28)


### Bug Fixes

* **Tmdb:** handle empty search results ([213c613](https://github.com/anvilabs/movie-api/commit/213c613))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/anvilabs/movie-api/compare/v0.9.0...v0.10.0) (2016-11-28)


### Features

* **Kinopoisk:** filter search results by title similarity ([bd482d7](https://github.com/anvilabs/movie-api/commit/bd482d7))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/anvilabs/movie-api/compare/v0.8.1...v0.9.0) (2016-11-27)


### Features

* export flow types with distribution ([49b3786](https://github.com/anvilabs/movie-api/commit/49b3786))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/anvilabs/movie-api/compare/v0.8.0...v0.8.1) (2016-11-24)


### Bug Fixes

* **imdb:** return correct popularity for over 999 ([7c584d7](https://github.com/anvilabs/movie-api/commit/7c584d7))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/anvilabs/movie-api/compare/v0.7.0...v0.8.0) (2016-11-24)


### Features

* **imdb:** add the `getPopularity` method ([1b37f1c](https://github.com/anvilabs/movie-api/commit/1b37f1c))
* **kinopoisk:** decrease requests per second for html requests ([68e8111](https://github.com/anvilabs/movie-api/commit/68e8111))
* **kinopoisk:** use a random useragent for html requests ([909ce76](https://github.com/anvilabs/movie-api/commit/909ce76))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/anvilabs/movie-api/compare/v0.5.1...v0.7.0) (2016-11-24)


### Features

* add Trakt source ([501ae9b](https://github.com/anvilabs/movie-api/commit/501ae9b))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/anvilabs/movie-api/compare/v0.5.0...v0.5.1) (2016-11-22)


### Bug Fixes

* **kinopoisk:** fix various ramda bugs ([337e577](https://github.com/anvilabs/movie-api/commit/337e577))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/anvilabs/movie-api/compare/v0.4.0...v0.5.0) (2016-11-22)


### Bug Fixes

* **kinopoisk:** fix crashes on empty search results ([6f4339b](https://github.com/anvilabs/movie-api/commit/6f4339b))


### Features

* **kinopoisk:** stop filtering search results by title similarity ([4d12814](https://github.com/anvilabs/movie-api/commit/4d12814))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/anvilabs/movie-api/compare/v0.3.1...v0.4.0) (2016-11-22)


### Features

* **imdb:** add reasonable throttling to rating requests ([e664a61](https://github.com/anvilabs/movie-api/commit/e664a61))
* **kinopoisk:** add reasonable throttling to all requests ([b052c08](https://github.com/anvilabs/movie-api/commit/b052c08))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/anvilabs/movie-api/compare/v0.3.0...v0.3.1) (2016-11-19)


### Bug Fixes

* add the missing IMDB source export ([34a7d49](https://github.com/anvilabs/movie-api/commit/34a7d49))



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
