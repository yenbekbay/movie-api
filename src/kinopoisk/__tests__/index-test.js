/* @flow */

import {
  modelFromObject,
  modelFromFirstElement,
  modelFromFirstElementAtPath,
} from '../../test-utils';
import Kinopoisk from '../';

const filmId = 714888; // Star Wars: The Force Awakens
const movieQuery = {
  title: 'Звёздные войны: Пробуждение силы',
};
const tvShowQuery = {
  title: 'Игра престолов',
  isTvShow: true,
};
const countryId = 122; // Kazakhstan
const cityId = 706; // Almaty
const cinemaId = 281144; // CINEMAX Dostyk Multiplex

describe('Kinopoisk', () => {
  let kp: Kinopoisk;

  beforeAll(() => {
    kp = new Kinopoisk();
  });

  it('fetches movie info for a given id', async () => {
    expect(modelFromObject(await kp.getFilmInfo(filmId))).toMatchSnapshot();
  });

  it('formats movie info response according to graphql query', async () => {
    const res = await kp.getFilmInfo(filmId, `
      {
        kpId
        title
        synopsis
      }
    `);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('finds best movie id for a given query', async () => {
    expect(await kp.getFilmId(movieQuery)).toMatchSnapshot();
  }, 7000);

  it('finds best tv show id for a given query', async () => {
    expect(await kp.getFilmId(tvShowQuery)).toMatchSnapshot();
  }, 7000);

  it('fetches movie credits for a given id', async () => {
    const res = await kp.getFilmCredits(filmId);

    expect(modelFromObject(res)).toMatchSnapshot();
    expect(modelFromFirstElementAtPath('cast')(res)).toMatchSnapshot();
  });

  it('formats movie credits response according to graphql query', async () => {
    const res = await kp.getFilmCredits(filmId, `
      {
        cast { ...MemberProfile }
        crew {
          cinematographers { ...MemberProfile }
        }
      }

      fragment MemberProfile on Member {
        name
        photoUrl
      }
    `);

    expect(modelFromFirstElementAtPath('cast')(res)).toMatchSnapshot();
    expect(
      modelFromFirstElementAtPath('crew.cinematographers')(res),
    ).toMatchSnapshot();
  });

  it('fetches movie gallery for a given id', async () => {
    expect(modelFromObject(await kp.getFilmGallery(filmId))).toMatchSnapshot();
  });

  it('formats movie gallery response according to graphql query', async () => {
    const res = await kp.getFilmGallery(filmId, `
      {
        stills
        posters
      }
    `);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('fetches similar movies for a given id', async () => {
    const res = await kp.getSimilarFilms(filmId);

    expect(modelFromFirstElementAtPath('items')(res)).toMatchSnapshot();
  });

  it('formats similar movies response according to graphql query', async () => {
    const res = await kp.getSimilarFilms(filmId, `
      {
        items {
          kpId
          title
        }
      }
    `);

    expect(modelFromFirstElementAtPath('items')(res)).toMatchSnapshot();
  });

  it('fetches supported countries', async () => {
    const res = await kp.getSupportedCountries();

    expect(modelFromFirstElement(res)).toMatchSnapshot();
  });

  it('fetches supported cities for a given country id', async () => {
    const res = await kp.getSupportedCities(countryId);

    expect(modelFromFirstElement(res)).toMatchSnapshot();
  });

  it('fetches cinemas for a given city id', async () => {
    const res = await kp.getCinemasInCity(cityId);

    expect(modelFromFirstElement(res)).toMatchSnapshot();
  });

  it('fetches cinema info for given arguments', async () => {
    const res = await kp.getCinemaInfo({
      cinemaId,
      date: '14.11.2016',
      utcOffset: '+0600',
    });

    expect(modelFromObject(res)).toMatchSnapshot();
    expect(modelFromFirstElementAtPath('showtimes')(res)).toMatchSnapshot();
    expect(
      modelFromFirstElementAtPath('showtimes.0.items')(res),
    ).toMatchSnapshot();
  });

  it('formats cinema info response according to graphql query', async () => {
    const res = await kp.getCinemaInfo(
      {
        cinemaId,
        date: '14.11.2016',
        utcOffset: '+0600',
      }, `
        {
          id
          name
          showtimes {
            items {
              timestamp
            }
          }
        }
      `,
    );

    expect(modelFromObject(res)).toMatchSnapshot();
    expect(
      modelFromFirstElementAtPath('showtimes.0.items')(res),
    ).toMatchSnapshot();
  });
});
