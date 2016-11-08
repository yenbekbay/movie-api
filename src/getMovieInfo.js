/* @flow */

import R from 'ramda';

import connector from './kinopoisk/connector';

const kinopoiskCdnUrl = 'http://st.kp.yandex.net/images';
const normalizeCdnImageUrl = (imageUrl: string) =>
  `${kinopoiskCdnUrl}/${imageUrl}`
    .replace('iphone_', 'iphone360_')
    .replace('iphone60', 'iphone360');

type KinopoiskApi$GetFilmResponse = {
  filmID?: ?string,
  imdbID?: ?string,
  nameRU?: ?string,
  nameEN?: ?string,
  posterURL?: ?string,
  year?: ?string,
  description?: ?string,
  filmLength?: ?string,
  genre?: ?string,
  ratingAgeLimits?: ?string,
  ratingMPAA?: ?string,
  ratingData: {
    rating?: ?string,
    ratingVoteCount?: ?string,
    ratingIMDb?: ?string,
    ratingIMDbVoteCount?: ?string,
    ratingFilmCritics?: ?string,
    ratingFilmCriticsVoteCount?: ?string,
  },
};

const parseRuntime = (rawRuntime: ?string): number => (
  rawRuntime
    ? R.pipe(
        R.split(':'),
        R.slice(0, 2),
        ([hours, minutes]: [string, string]): number => R.sum([
          parseInt(hours, 10) * 60,
          parseInt(minutes, 10),
        ]),
        (runtime: number) => (runtime === 0 ? NaN : runtime),
      )(rawRuntime)
    : NaN
);

const getInfo = async (id: number) => {
  const res: ?KinopoiskApi$GetFilmResponse =
    await connector.get('getFilm', { filmID: id });

  if (!res) return null;

  const {
    filmID,
    imdbID,
    nameRU,
    nameEN,
    posterURL,
    year,
    description,
    filmLength,
    genre,
    ratingAgeLimits,
    ratingMPAA,
    ratingData = {},
  } = res;

  return {
    kpId: parseInt(filmID, 10),
    imdbID,
    title: {
      ru: nameRU,
      original: nameEN,
    },
    posterUrl: posterURL ? normalizeCdnImageUrl(posterURL) : null,
    year: parseInt(year, 10),
    synopsis: {
      ru: description,
    },
    runtime: parseRuntime(filmLength),
    genres: (genre || '').split(', '),
    ageRating: parseInt(ratingAgeLimits, 10),
    mpaaRating: ratingMPAA,
    kpRating: parseFloat(ratingData.rating),
    kpRatingVoteCount: parseInt(ratingData.ratingVoteCount, 10),
    imdbRating: parseFloat(ratingData.ratingIMDb),
    imdbRatingVoteCount: parseInt(ratingData.ratingIMDbVoteCount, 10),
    rtCriticsRating: parseInt(ratingData.ratingFilmCritics, 10),
    rtCriticsRatingVoteCount: parseInt(
      ratingData.ratingFilmCriticsVoteCount,
      10,
    ),
  };
};

type KinopoiskApi$StaffMember = {
  id: string,
  type: 'KPPeople',
  nameRU?: ?string,
  nameEN?: ?string,
  posterURL?: ?string,
  description?: ?string,
  professionText: string,
  professionKey: 'actor' | 'director' | 'producer' | 'writer' | 'composer',
};
type KinopoiskApi$GetStaffResponse = {
  creators?: Array<Array<KinopoiskApi$StaffMember>>,
};
type StaffMember = {
  name: {
    ru: ?string,
    en: ?string,
  },
  photoUrl: ?string,
};

const getCrew = async (id: number): Promise<?{
  cast: Array<StaffMember>,
  directors: Array<StaffMember>,
  producers: Array<StaffMember>,
  writers: Array<StaffMember>,
  composers: Array<StaffMember>,
}> => {
  const res: ?KinopoiskApi$GetStaffResponse =
    await connector.get('getStaff', { filmID: id });

  if (!res) return null;

  return R.pipe(
    R.flatten,
    R.groupBy(R.prop('professionKey')),
    R.pick(['actor', 'director', 'producer', 'writer', 'composer']),
    R.map(R.pipe(
      R.slice(0, 10),
      R.map(({ nameRU, nameEN, posterURL }: KinopoiskApi$StaffMember) => ({
        name: {
          ru: nameRU,
          en: nameEN,
        },
        photoUrl: posterURL ? normalizeCdnImageUrl(posterURL) : null,
      })),
    )),
    ({ actor, director, producer, writer, composer }: Object) => ({
      cast: actor,
      directors: director,
      producers: producer,
      writers: writer,
      composers: composer,
    }),
  )(res.creators);
};

type KinopoiskApi$GalleryItem = {
  image: string,
  preview: string,
};
type KinopoiskApi$GetGalleryResponse = {
  gallery?: {
    kadr?: ?Array<KinopoiskApi$GalleryItem>,
    kadr_sp?: ?Array<KinopoiskApi$GalleryItem>,
    poster?: ?Array<KinopoiskApi$GalleryItem>,
  },
};

const getStills = async (id: number): Promise<?Array<string>> => {
  const res: ?KinopoiskApi$GetGalleryResponse =
    await connector.get('getGallery', { filmID: id });

  if (!res) return null;

  return R.pipe(
    R.propOr([], 'kadr'),
    R.map(
      ({ image }: KinopoiskApi$GalleryItem) => normalizeCdnImageUrl(image),
    ),
  )(res.gallery);
};

const getMovieInfo = async (id: number) => {
  const [info, crew, stills] = await Promise.all([
    getInfo(id),
    getCrew(id),
    getStills(id),
  ]);

  if (!info) return null;

  return { ...info, ...(crew || {}), stills: stills || [] };
};

export {
  getInfo as __getInfo,
  getCrew as __getCrew,
  getStills as __getStills,
};
export default getMovieInfo;
