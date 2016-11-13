/* @flow */

import { __timestampForShowtime } from '../cinemaInfoFromRes';

describe('kinopoisk/cinemaInfoFromRes', () => {
  it('generates a timestamp for showtime', () => {
    expect(__timestampForShowtime({
      time: '20:00',
      date: '14.11.2016',
      utcOffset: '+0600',
    })).toMatchSnapshot();

    expect(__timestampForShowtime({
      time: '02:00',
      date: '14.11.2016',
      utcOffset: '+0600',
    })).toMatchSnapshot();

    expect(__timestampForShowtime({
      time: '02:00',
      date: '14.11.2016',
      utcOffset: '-0600',
    })).toMatchSnapshot();
  });
});
