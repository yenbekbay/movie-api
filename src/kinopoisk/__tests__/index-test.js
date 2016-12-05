/* @flow */

import moment from 'moment';

import { modelFromObject } from '../../test-utils';
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

  it('finds best movie id for a given query', async () => {
    expect(await kp.getFilmId(movieQuery)).toMatchSnapshot();
  }, 7000);

  it('finds best tv show id for a given query', async () => {
    expect(await kp.getFilmId(tvShowQuery)).toMatchSnapshot();
  }, 7000);

  it('fetches movie credits for a given id', async () => {
    const res = await kp.getFilmCredits(filmId);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('fetches movie gallery for a given id', async () => {
    expect(modelFromObject(await kp.getFilmGallery(filmId))).toMatchSnapshot();
  });

  it('fetches similar movies for a given id', async () => {
    const res = await kp.getSimilarFilms(filmId);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('fetches supported countries', async () => {
    const res = await kp.getSupportedCountries();

    expect(modelFromObject({ countries: res })).toMatchSnapshot();
  });

  it('fetches supported cities for a given country id', async () => {
    const res = await kp.getSupportedCities(countryId);

    expect(modelFromObject({ cities: res })).toMatchSnapshot();
  });

  it('fetches cinemas for a given city id', async () => {
    const res = await kp.getCinemasInCity(cityId);

    expect(modelFromObject({ cinemas: res })).toMatchSnapshot();
  });

  it('fetches cinema info for given arguments', async () => {
    const res = await kp.getCinemaInfo({
      cinemaId,
      date: moment().format('DD.MM.YYYY'),
      utcOffset: '+0600',
    });

    expect(modelFromObject(res)).toMatchSnapshot();
  });
});
