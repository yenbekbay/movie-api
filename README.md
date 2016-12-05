# movie-api

[![Version](https://img.shields.io/npm/v/movie-api.svg)](http://npm.im/movie-api)
[![Build Status](https://img.shields.io/travis/anvilabs/movie-api.svg)](https://travis-ci.org/anvilabs/movie-api)
[![Coverage Status](https://img.shields.io/codecov/c/github/anvilabs/movie-api.svg)](https://codecov.io/gh/anvilabs/movie-api)
[![Dependency Status](https://img.shields.io/david/anvilabs/movie-api.svg)](https://david-dm.org/anvilabs/movie-api)
[![devDependency Status](https://img.shields.io/david/dev/anvilabs/movie-api.svg)](https://david-dm.org/anvilabs/movie-api?type=dev)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)

> Get info for movies and TV shows

Supported sources: [Kinopoisk](https://kinopoisk.ru), [TMDB](https://www.themoviedb.org), [IMDB (ratings and popularities)](http://imdb.com), [Trakt](http://trakt.tv).

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
  const movieId = await kp.getFilmId({
    title: 'Звёздные войны: Пробуждение силы',
    year: 2015, // optionally specify release year
    countries: ['США'], // optionally specify production countries
  });
  console.log(movieId);
  // 714888

  const movieInfo = await kp.getFilmInfo(movieId);
  console.log(util.inspect(movieInfo, { depth: null, maxArrayLength: 1 }));
  // { kpId: 714888,
  //   title: 'Звёздные войны: Пробуждение силы',
  //   originalTitle: 'Star Wars: Episode VII - The Force Awakens',
  //   posterUrl: 'http://st.kp.yandex.net/images/film_iphone/iphone360_714888.jpg?d=20151105180111',
  //   year: 2015,
  //   productionCountries: [ 'США' ],
  //   synopsis: 'Через тридцать лет после гибели Дарта Вейдера и Императора галактика по-прежнему в опасности. Государственное образование Первый Орден во главе с таинственным верховным лидером Сноуком и его правой рукой Кайло Реном идёт по стопам Империи, пытаясь захватить всю власть. В это нелёгкое время судьба сводит юную девушку Рей и бывшего штурмовика Первого Ордена Финна с героями войны с Империей - Ханом Соло, Чубаккой и генералом Леей. Вместе они должны дать бой Первому Ордену, однако настаёт тот момент, когда становится очевидно, что лишь джедаи могут остановить Сноука и Кайло Рена.',
  //   runtime: 138,
  //   genres: [ 'фантастика', ... 2 more items ],
  //   ageRating: 12,
  //   mpaaRating: 'PG-13',
  //   kpRating: 7.2,
  //   kpRatingVoteCount: 114659,
  //   imdbRating: 8.2,
  //   imdbRatingVoteCount: 590220,
  //   rtCriticsRating: 92,
  //   rtCriticsRatingVoteCount: 346,
  //   stills:
  //    [ 'http://st.kp.yandex.net/images/kadr/2751407.jpg',
  //      ... 99 more items ] }

  const movieCredits = await kp.getFilmCredits(movieId);
  console.log(util.inspect(movieCredits, { depth: null, maxArrayLength: 1 }));
  // { cast:
  //     [ { name: 'Джон Бойега',
  //         photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_2196854.jpg?d=20130703131657' },
  //       ... 9 more items ],
  //   crew:
  //     { cinematographers:
  //       [ { name: 'Дэниэл Миндел',
  //           photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_610174.jpg?d=20150813191602' } ],
  //       composers:
  //       [ { name: 'Джон Уильямс',
  //           photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_225027.jpg?d=20130908235640' } ],
  //       directors:
  //       [ { name: 'Джей Джей Абрамс',
  //           photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_27741.jpg?d=20150827134539' } ],
  //       producers:
  //       [ { name: 'Джей Джей Абрамс',
  //           photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_27741.jpg?d=20150827134539' },
  //         ... 9 more items ],
  //       writers:
  //       [ { name: 'Лоуренс Кэздан',
  //           photoUrl: 'http://st.kp.yandex.net/images/actor_iphone/iphone360_26537.jpg?d=20131017121035' },
  //         ... 3 more items ] } }

  const movieGallery = await kp.getFilmGallery(movieId);
  console.log(util.inspect(movieGallery, { depth: null, maxArrayLength: 1 }));
  // { stills:
  //     [ 'http://st.kp.yandex.net/images/kadr/2751407.jpg',
  //       ... 136 more items ],
  //   posters:
  //     [ 'http://st.kp.yandex.net/images/poster/sm_2738354.jpg',
  //       ... 64 more items ],
  //   behindTheScenes:
  //     [ 'http://st.kp.yandex.net/images/kadr/2751387.jpg',
  //       ... 46 more items ] }

  const similarMovies = await kp.getSimilarFilms(movieId);
  console.log(util.inspect(similarMovies, { depth: null, maxArrayLength: 1 }));
  // { items:
  //     [ { kpId: 255129,
  //         title: 'Звездный путь',
  //         originalTitle: 'Star Trek',
  //         posterUrl: 'http://st.kp.yandex.net/images/film_iphone/iphone360_255129.jpg',
  //         year: 2009,
  //         productionCountries: [ 'США', ... 1 more item ],
  //         runtime: 127,
  //         genres: [ 'фантастика', ... 2 more items ],
  //         kpRating: 7.8,
  //         kpRatingVoteCount: 104436 },
  //       ... 5 more items ] }

  const countries = await kp.getSupportedCountries();
  console.log(util.inspect(countries, { depth: null, maxArrayLength: 1 }));
  // [ { id: 69, name: 'Беларусь' }, ... 4 more items ]

  const cities = await kp.getSupportedCities(
    122, // Kazakhstan
  );
  console.log(util.inspect(cities, { depth: null, maxArrayLength: 1 }));
  // [ { id: 5546, name: 'Актау' }, ... 20 more items ]

  const cinemas = await kp.getCinemasInCity(
    706, // Almaty, Kazakhstan
  );
  console.log(util.inspect(cinemas, { depth: null, maxArrayLength: 1 }));
  // [ { id: 280504,
  //     name: 'Chaplin ADK 3D',
  //     address: 'ТРЦ «ADK» ул. Сатпаева, 90 (уг. ул. Тлендиева)',
  //     location: { lat: 43.232695, lng: 76.879001 } },
  //   ... 27 more items ]

  const cinemaInfo = await kp.getCinemaInfo({
    cinemaId: 280616, // Есентай (Кинопарк 11) (Almaty, Kazakhstan)
    date: '14.11.2016',
    utcOffset: '+0600',
  });
  console.log(util.inspect(cinemaInfo, { depth: null, maxArrayLength: 1 }));
  // { id: 280616,
  //   name: 'Есентай (Кинопарк 11)',
  //   address: 'г. Алма-Ата, пр. Аль-Фараби, 77/7',
  //   location: { lat: 43.2195989797025, lng: 76.92893925662227 },
  //   showtimes:
  //     [ { filmId: 766533,
  //         items:
  //         [ { time: '10:20',
  //             date: '14.11.2016',
  //             timestamp: 2016-11-14T04:20:00.000Z,
  //             formats: [ '3D' ] } ] },
  //       ... 18 more items ] }
})();
```

#### Basic TMDB example

```js
import { Tmdb } from 'movie-api';

const tmdb = new Tmdb({
  apiKey: process.env.TMDB_API_KEY, // required, refer to https://www.themoviedb.org/faq/api
  language: 'ru', // optional, "ru" by default
});

(async () => {
  const movieId = await tmdb.getMovieId({
    title: 'Star Wars: The Force Awakens',
    // or alternatively
    // imdbId: 'tt2488496',
  });
  console.log(movieId);
  // 140607

  const tvShowId = await tmdb.getTvShowId({
    title: 'Game of Thrones',
    // or alternatively
    // imdbId: 'tt0944947',
    isTvShow: true,
  });
  console.log(tvShowId);
  // 1399

  const movieInfo = await tmdb.getMovieInfo(movieId);
  console.log(util.inspect(movieInfo, { depth: null, maxArrayLength: 1 }));
  // { backdropUrl: 'https://image.tmdb.org/t/p/w1000/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg',
  //   budget: 200000000,
  //   genres: [ 'боевик', ... 3 more items ],
  //   homepage: 'http://www.starwars.ru/',
  //   tmdbId: 140607,
  //   imdbId: 'tt2488496',
  //   originalLanguage: 'en',
  //   originalTitle: 'Star Wars: The Force Awakens',
  //   synopsis: 'Через тридцать лет после гибели Дарта Вейдера и Императора галактика по-прежнему в опасности. Государственное образование Новый Порядок во главе с их таинственным верховным лидером Сноуком и его правой рукой Кайло Реном идёт по стопам Империи, пытаясь захватить всю власть. В это нелёгкое время судьба сводит юную девушку Рей и бывшего штурмовика Нового Порядка Финна с героями времён войны с Империей — Ханом Соло, Чубаккой и Королевой Леей. Вместе они должны дать бой Новому Порядку, однако настаёт тот момент, когда становится очевидно, что лишь джедаи могут остановить Сноука и Кайло Рена. И в галактике в живых остаётся только один.',
  //   tmdbPopularity: 9.699057,
  //   posterUrl: 'https://image.tmdb.org/t/p/w500/q7b8zH4bCsHME86Hawia32ZuvJF.jpg',
  //   productionCompanies: [ 'Lucasfilm', ... 2 more items ],
  //   productionCountries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
  //   releaseDate: '2015-12-15',
  //   revenue: 2068178225,
  //   runtime: 135,
  //   tagline: 'У каждого поколения - своя история',
  //   title: 'Звёздные войны: Эпизод 7 - Пробуждение силы',
  //   tmdbRating: 7.5,
  //   tmdbRatingVoteCount: 4952,
  //   credits:
  //    { cast:
  //       [ { name: 'Daisy Ridley',
  //           photoUrl: 'https://image.tmdb.org/t/p/w300/iiBJCkVVLHAUBW6vbUhJ3RtxlXv.jpg' },
  //         ... 38 more items ],
  //      crew:
  //       { cinematographers: [ { name: 'Daniel Mindel', photoUrl: null } ],
  //         composers:
  //          [ { name: 'John Williams',
  //              photoUrl: 'https://image.tmdb.org/t/p/w300/d7NNRZQAIzLBSaoez550QHLpTk.jpg' } ],
  //         directors:
  //          [ { name: 'J.J. Abrams',
  //              photoUrl: 'https://image.tmdb.org/t/p/w300/xljsYopubv9egYzclBPNf9EAYxB.jpg' } ],
  //         producers:
  //          [ { name: 'Bryan Burk',
  //              photoUrl: 'https://image.tmdb.org/t/p/w300/8sjfYlGhhqPwCoDzhze211ONtBX.jpg' },
  //            ... 3 more items ],
  //         writers:
  //          [ { name: 'George Lucas',
  //              photoUrl: 'https://image.tmdb.org/t/p/w300/8qxin8urtFE0NqaZNFWOuV537bH.jpg' },
  //            ... 2 more items ] } },
  //   keywords: [ 'android', ... 5 more items ],
  //   videos:
  //    [ { iso_639_1: 'ru',
  //        iso_3166_1: 'RU',
  //        key: 'qgcJlJP9NCw',
  //        name: 'Звёздные войны: Пробуждение силы',
  //        site: 'YouTube',
  //        size: 720,
  //        type: 'Trailer' } ] }

  const tvShowInfo = await tmdb.getTvShowInfo(tvShowId);
  console.log(util.inspect(tvShowInfo, { depth: null, maxArrayLength: 1 }));
  // { backdropUrl: 'https://image.tmdb.org/t/p/w1000/mUkuc2wyV9dHLG0D0Loaw5pO2s8.jpg',
  //   createdBy:
  //    [ { name: 'David Benioff',
  //        photoUrl: 'https://image.tmdb.org/t/p/w300/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg' },
  //      ... 1 more item ],
  //   episodeRuntime: [ 60 ],
  //   firstAirDate: '2011-04-17',
  //   genres: [ 'Sci-Fi & Fantasy', ... 2 more items ],
  //   homepage: 'http://www.hbo.com/game-of-thrones',
  //   tmdbId: 1399,
  //   inProduction: true,
  //   languages: [ 'es', ... 2 more items ],
  //   lastAirDate: '2017-06-25',
  //   name: 'Игра престолов',
  //   networks: [ 'HBO' ],
  //   numberOfEpisodes: 52,
  //   numberOfSeasons: 7,
  //   originCountry: [ 'US' ],
  //   originalLanguage: 'en',
  //   originalName: 'Game of Thrones',
  //   synopsis: 'К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наемника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем, никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от нее.',
  //   tmdbPopularity: 27.418045,
  //   posterUrl: 'https://image.tmdb.org/t/p/w500/7w3ydOfp6hge33BkALJF4RsyOLx.jpg',
  //   productionCompanies: [ 'Home Box Office (HBO)', ... 4 more items ],
  //   seasons:
  //    [ { airDate: '2010-12-05',
  //        episodeCount: 13,
  //        posterUrl: 'https://image.tmdb.org/t/p/w500/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg',
  //        seasonNumber: 0 },
  //      ... 7 more items ],
  //   status: 'Returning Series',
  //   type: 'Scripted',
  //   tmdbRating: 7.8,
  //   tmdbRatingVoteCount: 1323,
  //   credits:
  //    { cast:
  //       [ { name: 'Kit Harington',
  //           photoUrl: 'https://image.tmdb.org/t/p/w300/dwRmvQUkddCx6Xi7vDrdnQL4SJ0.jpg' },
  //         ... 11 more items ],
  //      crew:
  //       [ { name: 'Peter Welter Soler', photoUrl: null },
  //         ... 2 more items ] },
  //   keywords: [ 'war', ... 6 more items ],
  //   videos: [] }
})();
```

#### Basic IMDB example

```js
import { Imdb } from 'movie-api';

const imdb = new Imdb({
  userId: process.env.IMDB_USER_ID, // required, extract from your profile page url (should be in the following format: urXXXXXXXX)
});

(async () => {
  const movieRating = await imdb.getRating(
    'tt2488496', // Star Wars: The Force Awakens
  );
  console.log(movieRating);
  // { imdbRating: 8.2, imdbRatingVoteCount: 598161 }

  const moviePopularity = await imdb.getPopularity(
    'tt2488496', // Star Wars: The Force Awakens
  );
  console.log(moviePopularity);
  // 81
});
```

### Basic Trakt example

```js
import { Trakt } from 'movie-api';

const trakt = new Trakt({
  apiKey: process.env.TRAKT_API_KEY, // required, refer to http://docs.trakt.apiary.io
});

(async () => {
  const movieSlug = await trakt.getSlug({
    imdbId: 'tt2488496', // Star Wars: The Force Awakens
    // or alternatively
    // tmdbId: 140607',
  });
  console.log(movieSlug);
  // star-wars-the-force-awakens-2015

  const movieInfo = await trakt.getMovieInfo(movieSlug);
  console.log(movieInfo);
  // { title: 'Star Wars: The Force Awakens',
  //   year: 2015,
  //   traktId: 94024,
  //   traktSlug: 'star-wars-the-force-awakens-2015',
  //   tmdbId: 140607,
  //   imdbId: 'tt2488496',
  //   tagline: 'Every generation has a story.',
  //   synopsis: 'Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.',
  //   releaseDate: '2015-12-18',
  //   runtime: 136,
  //   ytTrailerId: 'sGbxmsDFVnE',
  //   homepage: 'http://www.starwars.com/films/star-wars-episode-vii',
  //   traktRating: 8.23577,
  //   traktRatingVoteCount: 20715,
  //   originalLanguage: 'en',
  //   genres: [ 'action', 'adventure', 'fantasy', 'science-fiction' ],
  //   mpaaRating: 'PG-13' }

  const movieStats = await trakt.getMovieStats(movieId);
  console.log(movieStats);
  // { watchers: 'number',
  //   plays: 'number',
  //   collectors: 'number',
  //   comments: 'number',
  //   lists: 'number',
  //   votes: 'number' }
});
```

## License

[MIT License](./LICENSE) © Anvilabs LLC
