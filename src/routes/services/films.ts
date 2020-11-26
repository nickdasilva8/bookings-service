import db from '../../database';

import { Film, FilmWithTime, Seat } from '../../types';

/**
 * Gets all the films
 * ToDo:: Expand system to accommodate getting all films showing on a day
 */
export const getAllFilms = (): Promise<Film[]> =>
  db.select('id', 'name').from('films');

/**
 * Gets all the films and all their showing times
 * ToDo :: This can easily be extended to get the times for a specific date - without this it's not really useable in a real environment.
 */
export const getAllFilmsWithTimes = (): Promise<FilmWithTime[]> =>
  db
    .select('*')
    .from('films')
    .leftJoin('screens', 'films.id', 'screens.film_id');

/**
 * Gets all the seats by film and showing time
 * ToDo :: This can easily be extended to get the times for a specific date - without this it's not really useable in a real environment.
 */
export const getAllSeatsForFilm = (
  filmId: number,
  timeSlot: string
): Promise<Seat[]> =>
  db
    .select(
      'seating.id',
      'seating.screen_id',
      'seating.position',
      'seating.booked',
      'seating.locked',
      'screens.film_id',
      'screens.time_slot',
      'seating.updated_at'
    )
    .from('screens')
    .leftJoin('seating', 'screens.screen_number', 'seating.screen_id')
    .where('screens.film_id', '=', filmId)
    .andWhere('screens.time_slot', '=', timeSlot);
