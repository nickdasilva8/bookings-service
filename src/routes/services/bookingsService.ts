import db from '../../database';

import { Film } from '../../types';

// TODO: split into individual services

const getAllFilms = (): Promise<Film[]> =>
  db.select('id', 'name').from('films');

export { db, getAllFilms };
