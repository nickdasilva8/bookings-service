import { Router } from 'express';
import Joi from 'joi';

import {
  getAllFilms,
  getAllFilmsWithTimes,
  getAllSeatsForFilm
} from './services/films';
import { FormatAllFilmsWithShowingTimes } from './clients/films';

const router = Router();

router.get('/list', async (req, res) => {
  try {
    const films = await getAllFilms();
    return res.status(200).send(films);
  } catch (err) {
    console.error('Failed getting all films');
    return res.status(err?.status ?? 500).send(err);
  }
});

/**
 * @returns FilmObjectFormatted[]
 */
router.get('/list-with-time', async (req, res) => {
  try {
    const films = await getAllFilmsWithTimes();

    const formattedFilms = FormatAllFilmsWithShowingTimes(films);

    return res.status(200).send(formattedFilms);
  } catch (err) {
    console.error('Failed getting all films');
    return res.status(err?.status ?? 500).send(err);
  }
});

/**
 * Gets all the seats for a film at a time
 * @returns Seat[]
 */
router.get('/:filmId/:time', async (req, res) => {
  const { filmId, time } = req.params;

  try {
    const filmIdAsInt = Joi.attempt(filmId, Joi.number());

    const films = await getAllSeatsForFilm(filmIdAsInt, time);

    return res.status(200).send(films);
  } catch (err) {
    console.error('Failed getting all films');
    return res.status(err?.status ?? 500).send(err);
  }
});

export default router;
