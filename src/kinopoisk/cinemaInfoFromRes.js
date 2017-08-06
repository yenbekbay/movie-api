/* @flow */

import moment from 'moment';

import type {
  KinopoiskApi$GetCinemaDetailView,
  KinopoiskApi$MovieShowtimes,
  KinopoiskApi$Showtime,
} from './types';

const timestampForShowtime = ({
  time,
  date,
  utcOffset,
}: {
  time: string,
  date: string,
  utcOffset: string,
}) => {
  const timeMoment = moment(time, 'HH.mm');
  const dateMoment = moment(date, 'DD.MM.YYYY').utcOffset(utcOffset);

  if (!dateMoment) return null;

  const hours = timeMoment.hours();
  const minutes = timeMoment.minutes();

  return dateMoment
    .clone()
    .hours(hours < 4 ? hours + 24 : hours)
    .minutes(minutes)
    .toDate();
};

const showtimesFromRes = (
  {
    date,
    items,
  }: {
    date: string,
    items: Array<KinopoiskApi$MovieShowtimes>,
  } = {},
  utcOffset: ?string,
) => {
  if (!date || !items) return [];

  return items.map(({filmID, seance}: KinopoiskApi$MovieShowtimes) => ({
    filmId: parseInt(filmID, 10),
    items: seance.map(({time, formats}: KinopoiskApi$Showtime) => ({
      time,
      date,
      timestamp: utcOffset
        ? timestampForShowtime({time, date, utcOffset})
        : null,
      formats: formats.format,
    })),
  }));
};

const cinemaInfoFromRes = (
  {cinemaDetail}: KinopoiskApi$GetCinemaDetailView,
  utcOffset: ?string,
) =>
  !cinemaDetail
    ? null
    : {
        id: parseInt(cinemaDetail.cinemaID, 10),
        name: cinemaDetail.cinemaName,
        address: (cinemaDetail.cinemaLocation || {}).addressDescription,
        location: {
          lat: parseFloat((cinemaDetail.cinemaLocation || {}).lat),
          lng: parseFloat((cinemaDetail.cinemaLocation || {}).lon),
        },
        phoneNumbers: cinemaDetail.phones,
        homepage: cinemaDetail.cinemaWeb,
        showtimes: showtimesFromRes(cinemaDetail.seance, utcOffset),
      };

export {
  timestampForShowtime as __timestampForShowtime,
  showtimesFromRes as __showtimesFromRes,
};
export default cinemaInfoFromRes;
