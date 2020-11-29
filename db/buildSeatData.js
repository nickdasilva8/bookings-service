// this file is required so the date object on the seating can be up to date when this is first created.
// A CRON job would need to run once a day and generate new seats, as well as archive old seats.
const dayjs = require('dayjs');

const days = [];

let counter = 0;

while (counter !== 7) {
  days.push(dayjs().add(counter, 'day'));

  counter++;
}

const filmTimesData = [
  [
    '10:00am',
    '11:30am',
    '1:00pm',
    '2:30pm',
    '4:00pm',
    '5:30pm',
    '7:00pm',
    '8:30pm'
  ],
  ['10:15am', '12:15am', '2:15pm', '4:15pm', '6:15pm', '8:15pm'],
  ['10:30am', '1:30pm', '4:30pm', '7:30pm']
];

// all the screen times
const screenTimes = [];

filmTimesData.forEach((setOfTimes, index) => {
  setOfTimes.forEach((time) => {
    days.forEach((day) => {
      const screenObject = {
        screen_number: index + 1,
        film_id: index + 1,
        time_slot: time,
        showing_date: day
      };

      screenTimes.push(screenObject);
    });
  });
});

const seatPositions = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];

// this has all the seat rows
const allSeatRows = [];

screenTimes.forEach((screenTime, index) => {
  seatPositions.forEach((position) => {
    const seatObject = {
      screen_id: index + 1,
      position,
      booked: false,
      locked: false
    };
    allSeatRows.push(seatObject);
  });
});

module.exports = { allSeatRows, screenTimes };
