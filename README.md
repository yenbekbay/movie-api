# movie-api

[![Build Status](https://img.shields.io/travis/anvilabs/movie-api.svg)](https://travis-ci.org/anvilabs/movie-api)
[![Coverage Status](https://img.shields.io/codecov/c/github/anvilabs/movie-api.svg)](https://codecov.io/gh/anvilabs/movie-api)
[![Dependency Status](https://img.shields.io/david/anvilabs/movie-api.svg)](https://david-dm.org/anvilabs/movie-api)
[![devDependency Status](https://img.shields.io/david/dev/anvilabs/movie-api.svg)](https://david-dm.org/anvilabs/movie-api?type=dev)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)

> Get info for movies and TV shows

Supported sources: [Kinopoisk](https://kinopoisk.ru), [TMDB](https://tmdb.com).

**Warning:** This module is experimental, and the API is likely to change.

## Installation

```bash
yarn add movie-api # npm install movie-api --save
```

## Usage

The following examples assume that you have a working ES2016 environment with support for the [`async` / `await` feature](http://babeljs.io/docs/plugins/transform-async-to-generator/).

#### Basic Kinopoisk example

```js
import { Kinopoisk } from 'movie-api';

const kp = new Kinopoisk();

(async () => {
  const movieId = await kp.getId({
    title: 'Звёздные войны: Пробуждение силы'
  });
  // 714888

  const tvShowId = await kp.getId({
    title: 'Игра престолов',
    isTvShow: true,
  });;
  // 464963

  const movieInfo = await kp.getInfo(
    movieId,
    // optionally specify desired fields with a GraphQL query
    `
      {
        kpId
        title
        synopsis
      }
    `
  );
  // {
  //   kpId: 714888,
  //   title: 'Звёздные войны: Пробуждение силы',
  //   synopsis: 'Через тридцать лет после гибели Дарта Вейдера...'
  // }

  const movieCredits = await kp.getCredits(movieId);
  // {
  //   cast: [
  //     {
  //       "name": "Джон Бойега",
  //       "photoUrl": "http://st.kp.yandex.net/images/actor_iphone/iphone360_2196854.jpg?d=20130703131657",
  //     },
  //     ...
  //   ],
  //   crew: {
  //     cinematographers: [
  //       {
  //         "name": "Дэниэл Миндел",
  //         "photoUrl": "http://st.kp.yandex.net/images/actor_iphone/iphone360_610174.jpg?d=20150813191602",
  //       }
  //     ],
  //     composers: [...],
  //     directors: [...],
  //     producers: [...],
  //     writers: [...]
  //   }
  // }
});
```

#### Basic TMDB example

```js
import { Tmdb } from 'movie-api';

const tmdb = new Tmdb({
  apiKey: process.env.TMDB_API_KEY,
  language: 'ru', // "ru" by default
});

(async () => {
  const movieId = await tmdb.getId({
    title: 'Star Wars: The Force Awakens',
    // or alternatively
    // imdbId: 'tt2488496',
  });
  // 140607

  const tvShowId = await tmdb.getId({
    title: 'Game of Thrones',
    // or alternatively
    // imdbId: 'tt0944947',
    isTvShow: true,
  });
  // 1399

  const movieInfo = await tmdb.getInfo(
    movieId,
    // optionally specify desired fields with a GraphQL query
    `
      {
        tmdbId
        imdbId
        title
        synopsis
      }
    `
  );
  // {
  //   tmdbId: 140607,
  //   imdbId: 'tt2488496',
  //   title: 'Звёздные войны: Эпизод 7 - Пробуждение силы',
  //   synopsis: 'Через тридцать лет после гибели Дарта Вейдера...'
  // }
});
```

## API Reference

Coming soon.

## License

[MIT License](./LICENSE) © Anvilabs LLC
