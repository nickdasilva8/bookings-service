import { Router } from 'express';
import Joi from 'joi';
import dayjs from 'dayjs';

// services
import {
  getAllFilms,
  getAllFilmsWithTimes,
  getAllSeatsForFilm
} from './services/films';
import { batchUpdateSeats } from './services/seating';

// clients
import { FormatAllFilmsWithShowingTimes } from './clients/films';
import { determineIfSeatCanBeUnlocked } from './clients/seating';

// type
import { SeatToUpdate } from '../types';

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const films = await getAllFilms();
    return res.status(200).send(films);
  } catch (err) {
    console.error('Failed getting all films', err);
    return res.status(err?.status ?? 500).send(err);
  }
});

/**
 * Returns all the films with all their sites by date.
 * @returns FilmObjectFormatted[]
 */
router.get('/list-with-time/:date', async (req, res) => {
  const { date } = req.params;
  const dateFormat = dayjs(date).format('YYYY/MM/DD');
  try {
    const films = await getAllFilmsWithTimes(dateFormat);

    const formattedFilms = FormatAllFilmsWithShowingTimes(films);

    return res.status(200).send(formattedFilms);
  } catch (err) {
    console.error('Failed getting all films', err);
    return res.status(err?.status ?? 500).send(err);
  }
});

/**
 * Gets all the seats for a film at a time
 * @returns Seat[]
 */
router.get('/:filmId/:time/:date', async (req, res) => {
  const { filmId, time, date } = req.params;
  const dateFormat = dayjs(date).format('YYYY/MM/DD');

  let seatsToUnlock: SeatToUpdate[] = [];
  try {
    const filmIdAsInt = Joi.attempt(filmId, Joi.number());

    let films = await getAllSeatsForFilm(filmIdAsInt, time, dateFormat);

    // a way to determine locked state by last updated
    const formattedFilms = films.map((film) => {
      const updatedFilm = { ...film };

      let forceSeatUnlocked;
      if (
        updatedFilm.locked &&
        determineIfSeatCanBeUnlocked(updatedFilm.updatedAt)
      ) {
        forceSeatUnlocked = true;
        seatsToUnlock.push({
          id: updatedFilm.id,
          updated_at: new Date(),
          locked: false
        });
      }

      updatedFilm.locked = forceSeatUnlocked ? false : updatedFilm.locked;

      return updatedFilm;
    });

    res.status(200).send(formattedFilms);
  } catch (err) {
    console.error('Failed getting all films', err);
    res.status(err?.status ?? 500).send(err);
  }

  // unlock seats that have been locked
  if (seatsToUnlock?.length > 0) {
    try {
      await batchUpdateSeats(seatsToUnlock);
      // empty the array after
    } catch (err) {
      console.log('error batch updating seats');
    }
    seatsToUnlock = [];
  }
});

export default router;
