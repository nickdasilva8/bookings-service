import { Router } from 'express';

import { getAllFilms } from './services/bookingsService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const films = await getAllFilms();
    return res.status(200).send(films);
  } catch (err) {
    console.error('Failed getting all films');
    return res.status(err?.status ?? 500).send(err);
  }
});

export default router;
