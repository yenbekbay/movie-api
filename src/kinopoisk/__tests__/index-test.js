/* @flow */

import moment from 'moment';

import {modelFromObject} from '../../testUtils';
import Kinopoisk from '../';

const sampleFilmId = 714888; // Star Wars: The Force Awakens
const sampleMovieQuery = {
  title: 'Звёздные войны: Пробуждение силы',
};
const sampleTvShowQuery = {
  title: 'Игра престолов',
  isTvShow: true,
};
const sampleCountryId = 122; // Kazakhstan
const sampleCityId = 706; // Almaty
const sampleCinemaId = 281144; // CINEMAX Dostyk Multiplex

const sampleDate = '2018-01-12T00:00:00.000+06:00';

describe('Kinopoisk', () => {
  let kp: Kinopoisk;

  beforeAll(() => {
    kp = new Kinopoisk();
  });

  it('fetches movie info for a given id', async () => {
    expect(
      modelFromObject(await kp.getFilmInfo(sampleFilmId)),
    ).toMatchSnapshot();
  });

  it(
    'finds best movie id for a given query',
    async () => {
      expect(await kp.getFilmId(sampleMovieQuery)).toMatchSnapshot();
    },
    // $FlowFixMe
    7000,
  );

  it(
    'finds best tv show id for a given query',
    async () => {
      expect(await kp.getFilmId(sampleTvShowQuery)).toMatchSnapshot();
    },
    // $FlowFixMe
    7000,
  );

  it('fetches movie credits for a given id', async () => {
    const res = await kp.getFilmCredits(sampleFilmId);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('fetches movie gallery for a given id', async () => {
    expect(
      modelFromObject(await kp.getFilmGallery(sampleFilmId)),
    ).toMatchSnapshot();
  });

  it('fetches similar movies for a given id', async () => {
    const res = await kp.getSimilarFilms(sampleFilmId);

    expect(modelFromObject(res)).toMatchSnapshot();
  });

  it('fetches supported countries', async () => {
    const res = await kp.getSupportedCountries();

    expect(modelFromObject({countries: res})).toMatchSnapshot();
  });

  it('fetches supported cities for a given country id', async () => {
    const res = await kp.getSupportedCities(sampleCountryId);

    expect(modelFromObject({cities: res})).toMatchSnapshot();
  });

  it('fetches cinemas for a given city id', async () => {
    const res = await kp.getCinemasInCity(sampleCityId);

    expect(modelFromObject({cinemas: res})).toMatchSnapshot();
  });

  it('fetches cinema info for given arguments', async () => {
    const res = await kp.getCinemaInfo({
      cinemaId: sampleCinemaId,
      date: moment(sampleDate).format('DD.MM.YYYY'),
      utcOffset: '+0600',
    });

    expect(modelFromObject(res)).toMatchSnapshot();
  });
});
