import db from '../../database';

import { SeatMinimum, SeatToUpdate, BookingsObject } from '../../types';

/**
 * Updates the "updated_last" and "locked" columns
 */
export const setUpdateDateForSeat = (
  seatId: number,
  isLocked: boolean
): Promise<SeatMinimum[]> =>
  db
    .update({ updated_at: new Date(), locked: isLocked }, ['id', 'position'])
    .from('seating')
    .where({ id: seatId });

/**
 * Handles any seats that have been left "locked" by a user who leaves the page before completing booking.
 * @param seatsToUpdate
 */
export const batchUpdateSeats = async (
  seatsToUpdate: SeatToUpdate[]
): Promise<any> => {
  try {
    await db.transaction(async (trx: any) => {
      seatsToUpdate.forEach(async (seat) => {
        await db
          .where('id', seat.id)
          .update(seat)
          .into('seating');
      });
    });
  } catch (err) {
    console.log('Error updating seats', err);
    return err;
  }
};

/**
 * Inserts a new booking.
 *
 * 1. Inserts the new booking into the users_bookings table. Returns the ID.
 * 2. Uses the above ID to insert all seats (by their id) against the above booking ID, making a many to many table
 * 3. Takes all the Seat IDs and updates them to booked = true and updated the last_updates column.
 */
export const insertNewBooking = (
  bookingsObject: BookingsObject
): Promise<boolean> => {
  // first insert the new user into the users_booking table
  return db
    .transaction((t: any) => {
      return db
        .transacting(t)
        .insert({ name: bookingsObject?.name, email: bookingsObject?.email })
        .returning('id')
        .into('users_bookings')
        .then(function(response: number[]) {
          const objectsToInsert = bookingsObject.seats.map((seat) => {
            const newSeat = {
              seating_id: -1,
              users_bookings_id: -1
            };

            newSeat.seating_id = seat.id;
            newSeat.users_bookings_id = response[0];

            return newSeat;
          });

          // using the users id, insert their seats into the bookings table with a seatId
          return db
            .transacting(t)
            .insert(objectsToInsert)
            .into('bookings');
        })
        .then((response: any) => {
          const queries: any[] = [];

          // now update all those seat IDs to be booked
          bookingsObject.seats.forEach((seat) => {
            const query = db
              .update({ booked: true, updated_at: new Date() })
              .into('seating')
              .where('id', '=', seat.id)
              .transacting(t);

            queries.push(query);
          });

          // using promise.all allows us to reach t.commit and have everything happen together.
          return Promise.all(queries);
        })
        .then(t.commit)
        .catch((t: any) => t.rollback);
    })
    .then(() => true)
    .catch(() => false);
};
