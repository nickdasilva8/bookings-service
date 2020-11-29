import { Router } from 'express';
import Joi from 'joi';

import { setUpdateDateForSeat, insertNewBooking } from './services/seating';

const router = Router();

/**
 * Updates the "last_updated" column, used for determining if the seat is locked.
 * @returns SeatMinimum[]
 */
router.put('/:seatId/:newLockedCondition', async (req, res) => {
  const { seatId, newLockedCondition } = req.params;

  try {
    const seatIdAsInt = Joi.attempt(seatId, Joi.number());
    const newLockedConditionBoolean = Joi.attempt(
      newLockedCondition,
      Joi.boolean()
    );

    const updateResult = await setUpdateDateForSeat(
      seatIdAsInt,
      newLockedConditionBoolean
    );

    return res.status(200).send(updateResult);
  } catch (err) {
    console.error(`Failed updating seat ${seatId}`, err);
    return res.status(err?.status ?? 500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const outcome = await insertNewBooking(req.body);
    return res.status(200).send(outcome);
  } catch (err) {
    return res.status(err?.status ?? 500).send(err);
  }
});

export default router;
