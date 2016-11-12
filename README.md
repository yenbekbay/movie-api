# movie-api

[![Build Status](https://img.shields.io/travis/anvilabs/movie-api.svg)](https://travis-ci.org/anvilabs/movie-api)
[![Coverage Status](https://img.shields.io/codecov/c/github/anvilabs/movie-api.svg)](https://codecov.io/gh/anvilabs/movie-api)
[![Dependency Status](https://img.shields.io/david/anvilabs/movie-api.svg)](https://david-dm.org/anvilabs/movie-api)
[![devDependency Status](https://img.shields.io/david/dev/anvilabs/movie-api.svg)](https://david-dm.org/anvilabs/movie-api?type=dev)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)

> Get info for movies and TV shows

Supported sources: [Kinopoisk](https://kinopoisk.ru), [TMDB](https://www.themoviedb.org/).

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
    title: 'Звёздные войны: Пробуждение силы',
    year: 2015, // optionally specify release year
    countries: ['США'], // optionally specify production countries
  });
  // 714888

  const tvShowId = await kp.getId({
    title: 'Игра престолов',
    isTvShow: true,
  });
  // 464963

  const movieInfo = await kp.getInfo(
    movieId,
    // optionally specify desired fields with a GraphQL query
    `
      {
        kpId
        title
        originalTitle
        posterUrl
        year
        productionCountries
        synopsis
        runtime
        genres
        ageRating
        mpaaRating
        kpRating
        kpRatingVoteCount
        imdbRating
        imdbRatingVoteCount
        rtCriticsRating
        rtCriticsRatingVoteCount
        stills
      }
    `,
  );
  // { kpId: 714888,
  //   title: 'Звёздные войны: Пробуждение силы',
  //   originalTitle: 'Star Wars: Episode VII - The Force Awakens',
  //   posterUrl: 'http://st.kp.yandex.net/images/film_iphone/iphone360_714888.jpg?d=20151105180111',
  //   year: 2015,
  //   productionCountries: [ 'США' ],
  //   synopsis: 'Через тридцать лет после гибели Дарта Вейдера...',
  //   runtime: 138,
  //   genres: [ 'фантастика', 'фэнтези', 'боевик' ],
  //   ageRating: 12,
  //   mpaaRating: 'PG-13',
  //   kpRating: 7.2,
  //   kpRatingVoteCount: 114481,
  //   imdbRating: 8.2,
  //   imdbRatingVoteCount: 590220,
  //   rtCriticsRating: 92,
  //   rtCriticsRatingVoteCount: 346,
  //   stills:
  //     [ 'http://st.kp.yandex.net/images/kadr/2751407.jpg',
  //       'http://st.kp.yandex.net/images/kadr/2751406.jpg',
  //       'http://st.kp.yandex.net/images/kadr/2751405.jpg',
  //       ... ] }

  const movieCredits = await kp.getCredits(
    movieId,
    // optionally specify desired fields with a GraphQL query
    `
      {
        cast { ...MemberProfile }
        crew {
          cinematographers { ...MemberProfile }
          composers { ...MemberProfile }
          directors { ...MemberProfile }
          producers { ...MemberProfile }
          writers { ...MemberProfile }
        }
      }

      fragment MemberProfile on Member {
        name
        photoUrl
      }
    `,
  );
  // { cast:
  //    [ { name: 'Джон Бойега',
  //        photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_2196854.jpg?d=20130703131657' },
  //      { name: 'Дэйзи Ридли',
  //        photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_3016071.jpg?d=20140430113652' },
  //      { name: 'Оскар Айзек',
  //        photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_43284.jpg' },
  //      ... ],
  //   crew:
  //    { cinematographers: [ [Object] ],
  //      composers: [ [Object] ],
  //      directors: [ [Object] ],
  //      producers:
  //       [ [Object],
  //         [Object],
  //         [Object],
  //         ... ],
  //      writers: [ [Object], [Object], [Object], [Object] ] } }
})();
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
        backdropUrl
        budget
        genres
        homepage
        tmdbId
        imdbId
        originalLanguage
        originalTitle
        synopsis
        tmdbPopularity
        posterUrl
        productionCompanies
        productionCountries {
          iso_3166_1
          name
        }
        releaseDate
        revenue
        runtime
        tagline
        title
        tmdbRating
        tmdbRatingVoteCount
        credits {
          cast { ...MemberProfile }
          crew {
            cinematographers { ...MemberProfile }
            composers { ...MemberProfile }
            directors { ...MemberProfile }
            producers { ...MemberProfile }
            writers { ...MemberProfile }
          }
        }
      }

      fragment MemberProfile on Member {
        name
        photoUrl
      }
    `,
  );
  // { backdropUrl: 'https://image.tmdb.org/t/p/w1000/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg',
  //   budget: 200000000,
  //   genres: [ 'боевик', 'приключения', 'фантастика', 'фэнтези' ],
  //   homepage: 'http://www.starwars.ru/',
  //   tmdbId: 140607,
  //   imdbId: 'tt2488496',
  //   originalLanguage: 'en',
  //   originalTitle: 'Star Wars: The Force Awakens',
  //   synopsis: 'Через тридцать лет после гибели Дарта Вейдера...',
  //   tmdbPopularity: 10.222112,
  //   posterUrl: 'https://image.tmdb.org/t/p/w500/q7b8zH4bCsHME86Hawia32ZuvJF.jpg',
  //   productionCompanies: [ 'Lucasfilm', 'Truenorth Productions', 'Bad Robot' ],
  //   productionCountries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
  //   releaseDate: '2015-12-15',
  //   revenue: 2068178225,
  //   runtime: 135,
  //   tagline: 'У каждого поколения - своя история',
  //   title: 'Звёздные войны: Эпизод 7 - Пробуждение силы',
  //   tmdbRating: 7.5,
  //   tmdbRatingVoteCount: 4946,
  //   credits:
  //    { cast:
  //       [ [Object],
  //         [Object],
  //         [Object],
  //         ... ],
  //      crew:
  //       { cinematographers: [Object],
  //         composers: [Object],
  //         directors: [Object],
  //         producers: [Object],
  //         writers: [Object] } } }
})();
```

## API Reference

Coming soon.

## License

[MIT License](./LICENSE) © Anvilabs LLC
