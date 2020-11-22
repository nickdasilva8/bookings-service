exports.up = (knex) =>
  knex.schema
    .createTable('films', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('screens', (table) => {
      table.increments('id').primary();
      table.integer('screen_number');
      table
        .integer('film_id')
        .references('id')
        .inTable('films');
      table.string('time_slot');
      table.timestamps(true, true);
    })
    .createTable('seating', (table) => {
      table.increments('id').primary();
      table
        .integer('screen_id')
        .references('id')
        .inTable('screens');
      table.string('position');
      table.boolean('booked');
      table.boolean('locked');
      table.timestamps(true, true);
    })
    .createTable('bookings', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('name').notNullable();
      table
        .integer('seating_id')
        .references('id')
        .inTable('seating');
      table
        .integer('film_id')
        .references('id')
        .inTable('films');
    })
    .then(function() {
      // generate the list of films
      return knex('films').insert([
        { name: 'The Grinch' },
        { name: 'Happy Gilmore' },
        { name: 'Ragnarok' }
      ]);
    })
    .then(function() {
      // generate the list of time showings for films
      return knex('screens').insert([
        // film one
        { screen_number: 1, film_id: 1, time_slot: '10:00am' },
        { screen_number: 1, film_id: 1, time_slot: '11:30am' },
        { screen_number: 1, film_id: 1, time_slot: '1:00pm' },
        { screen_number: 1, film_id: 1, time_slot: '2:30pm' },
        { screen_number: 1, film_id: 1, time_slot: '4:00pm' },
        { screen_number: 1, film_id: 1, time_slot: '5:30pm' },
        { screen_number: 1, film_id: 1, time_slot: '7:00pm' },
        { screen_number: 1, film_id: 1, time_slot: '8:30pm' },
        // film 2
        { screen_number: 2, film_id: 2, time_slot: '10:15am' },
        { screen_number: 2, film_id: 2, time_slot: '12:15am' },
        { screen_number: 2, film_id: 2, time_slot: '2:15pm' },
        { screen_number: 2, film_id: 2, time_slot: '4:15pm' },
        { screen_number: 2, film_id: 2, time_slot: '6:15pm' },
        { screen_number: 2, film_id: 2, time_slot: '8:15pm' },
        // film 3
        { screen_number: 3, film_id: 3, time_slot: '10:30am' },
        { screen_number: 3, film_id: 3, time_slot: '1:30pm' },
        { screen_number: 3, film_id: 3, time_slot: '4:30pm' },
        { screen_number: 3, film_id: 3, time_slot: '7:30pm' }
      ]);
    })
    .then(function() {
      // generate the seating positions for screen 1 at each time
      return knex('seating').insert([
        // screen 1 at 10:00am
        { screen_id: 1, position: '1A', booked: false, locked: false },
        { screen_id: 1, position: '1B', booked: true, locked: false },
        { screen_id: 1, position: '1C', booked: false, locked: false },
        { screen_id: 1, position: '2A', booked: true, locked: false },
        { screen_id: 1, position: '2B', booked: true, locked: false },
        { screen_id: 1, position: '2C', booked: false, locked: false },
        { screen_id: 1, position: '3A', booked: false, locked: false },
        { screen_id: 1, position: '3B', booked: false, locked: false },
        { screen_id: 1, position: '3C', booked: false, locked: false },
        // screen 1 at 11:30am
        { screen_id: 2, position: '1A', booked: false, locked: false },
        { screen_id: 2, position: '1B', booked: false, locked: false },
        { screen_id: 2, position: '1C', booked: false, locked: false },
        { screen_id: 2, position: '2A', booked: false, locked: false },
        { screen_id: 2, position: '2B', booked: false, locked: false },
        { screen_id: 2, position: '2C', booked: false, locked: false },
        { screen_id: 2, position: '3A', booked: false, locked: false },
        { screen_id: 2, position: '3B', booked: false, locked: false },
        { screen_id: 2, position: '3C', booked: false, locked: false },
        // screen 1 at 1:00pm
        { screen_id: 3, position: '1A', booked: false, locked: false },
        { screen_id: 3, position: '1B', booked: false, locked: false },
        { screen_id: 3, position: '1C', booked: false, locked: false },
        { screen_id: 3, position: '2A', booked: false, locked: false },
        { screen_id: 3, position: '2B', booked: false, locked: false },
        { screen_id: 3, position: '2C', booked: false, locked: false },
        { screen_id: 3, position: '3A', booked: false, locked: false },
        { screen_id: 3, position: '3B', booked: false, locked: false },
        { screen_id: 3, position: '3C', booked: false, locked: false },
        // screen 1 at 2:30pm
        { screen_id: 4, position: '1A', booked: false, locked: false },
        { screen_id: 4, position: '1B', booked: false, locked: false },
        { screen_id: 4, position: '1C', booked: false, locked: false },
        { screen_id: 4, position: '2A', booked: false, locked: false },
        { screen_id: 4, position: '2B', booked: false, locked: false },
        { screen_id: 4, position: '2C', booked: false, locked: false },
        { screen_id: 4, position: '3A', booked: false, locked: false },
        { screen_id: 4, position: '3B', booked: false, locked: false },
        { screen_id: 4, position: '3C', booked: false, locked: false },
        // screen 1 at 4:00pm
        { screen_id: 5, position: '1A', booked: false, locked: false },
        { screen_id: 5, position: '1B', booked: false, locked: false },
        { screen_id: 5, position: '1C', booked: false, locked: false },
        { screen_id: 5, position: '2A', booked: false, locked: false },
        { screen_id: 5, position: '2B', booked: false, locked: false },
        { screen_id: 5, position: '2C', booked: false, locked: false },
        { screen_id: 5, position: '3A', booked: false, locked: false },
        { screen_id: 5, position: '3B', booked: false, locked: false },
        { screen_id: 5, position: '3C', booked: false, locked: false },
        // screen 1 at 5:30pm
        { screen_id: 6, position: '1A', booked: false, locked: false },
        { screen_id: 6, position: '1B', booked: false, locked: false },
        { screen_id: 6, position: '1C', booked: false, locked: false },
        { screen_id: 6, position: '2A', booked: false, locked: false },
        { screen_id: 6, position: '2B', booked: false, locked: false },
        { screen_id: 6, position: '2C', booked: false, locked: false },
        { screen_id: 6, position: '3A', booked: false, locked: false },
        { screen_id: 6, position: '3B', booked: false, locked: false },
        { screen_id: 6, position: '3C', booked: false, locked: false },
        // screen 1 at 7:00pm
        { screen_id: 7, position: '1A', booked: false, locked: false },
        { screen_id: 7, position: '1B', booked: false, locked: false },
        { screen_id: 7, position: '1C', booked: false, locked: false },
        { screen_id: 7, position: '2A', booked: false, locked: false },
        { screen_id: 7, position: '2B', booked: false, locked: false },
        { screen_id: 7, position: '2C', booked: false, locked: false },
        { screen_id: 7, position: '3A', booked: false, locked: false },
        { screen_id: 7, position: '3B', booked: false, locked: false },
        { screen_id: 7, position: '3C', booked: false, locked: false },
        // screen 1 at 8:30pm
        { screen_id: 8, position: '1A', booked: false, locked: false },
        { screen_id: 8, position: '1B', booked: false, locked: false },
        { screen_id: 8, position: '1C', booked: false, locked: false },
        { screen_id: 8, position: '2A', booked: false, locked: false },
        { screen_id: 8, position: '2B', booked: false, locked: false },
        { screen_id: 8, position: '2C', booked: false, locked: false },
        { screen_id: 8, position: '3A', booked: false, locked: false },
        { screen_id: 8, position: '3B', booked: false, locked: false },
        { screen_id: 8, position: '3C', booked: false, locked: false }
      ]);
    })
    .then(function() {
      // generate the seating positions for screen 2 at each time
      return knex('seating').insert([
        // screen 2 at 10:15am
        { screen_id: 9, position: '1A', booked: false, locked: false },
        { screen_id: 9, position: '1B', booked: false, locked: false },
        { screen_id: 9, position: '1C', booked: false, locked: false },
        { screen_id: 9, position: '2A', booked: false, locked: false },
        { screen_id: 9, position: '2B', booked: false, locked: false },
        { screen_id: 9, position: '2C', booked: false, locked: false },
        { screen_id: 9, position: '3A', booked: false, locked: false },
        { screen_id: 9, position: '3B', booked: false, locked: false },
        { screen_id: 9, position: '3C', booked: false, locked: false },
        // screen 2 at 12:15pm
        { screen_id: 10, position: '1A', booked: false, locked: false },
        { screen_id: 10, position: '1B', booked: false, locked: false },
        { screen_id: 10, position: '1C', booked: false, locked: false },
        { screen_id: 10, position: '2A', booked: false, locked: false },
        { screen_id: 10, position: '2B', booked: false, locked: false },
        { screen_id: 10, position: '2C', booked: false, locked: false },
        { screen_id: 10, position: '3A', booked: false, locked: false },
        { screen_id: 10, position: '3B', booked: false, locked: false },
        { screen_id: 10, position: '3C', booked: false, locked: false },
        // screen 2 at 2:15pm
        { screen_id: 11, position: '1A', booked: false, locked: false },
        { screen_id: 11, position: '1B', booked: false, locked: false },
        { screen_id: 11, position: '1C', booked: false, locked: false },
        { screen_id: 11, position: '2A', booked: false, locked: false },
        { screen_id: 11, position: '2B', booked: false, locked: false },
        { screen_id: 11, position: '2C', booked: false, locked: false },
        { screen_id: 11, position: '3A', booked: false, locked: false },
        { screen_id: 11, position: '3B', booked: false, locked: false },
        { screen_id: 11, position: '3C', booked: false, locked: false },
        // screen 2 at 4:15pm
        { screen_id: 12, position: '1A', booked: false, locked: false },
        { screen_id: 12, position: '1B', booked: false, locked: false },
        { screen_id: 12, position: '1C', booked: false, locked: false },
        { screen_id: 12, position: '2A', booked: false, locked: false },
        { screen_id: 12, position: '2B', booked: false, locked: false },
        { screen_id: 12, position: '2C', booked: false, locked: false },
        { screen_id: 12, position: '3A', booked: false, locked: false },
        { screen_id: 12, position: '3B', booked: false, locked: false },
        { screen_id: 12, position: '3C', booked: false, locked: false },
        // screen 2 at 6:15pm
        { screen_id: 13, position: '1A', booked: false, locked: false },
        { screen_id: 13, position: '1B', booked: false, locked: false },
        { screen_id: 13, position: '1C', booked: false, locked: false },
        { screen_id: 13, position: '2A', booked: false, locked: false },
        { screen_id: 13, position: '2B', booked: false, locked: false },
        { screen_id: 13, position: '2C', booked: false, locked: false },
        { screen_id: 13, position: '3A', booked: false, locked: false },
        { screen_id: 13, position: '3B', booked: false, locked: false },
        { screen_id: 13, position: '3C', booked: false, locked: false },
        // screen 2 at 8:15pm
        { screen_id: 14, position: '1A', booked: false, locked: false },
        { screen_id: 14, position: '1B', booked: false, locked: false },
        { screen_id: 14, position: '1C', booked: false, locked: false },
        { screen_id: 14, position: '2A', booked: false, locked: false },
        { screen_id: 14, position: '2B', booked: false, locked: false },
        { screen_id: 14, position: '2C', booked: false, locked: false },
        { screen_id: 14, position: '3A', booked: false, locked: false },
        { screen_id: 14, position: '3B', booked: false, locked: false },
        { screen_id: 14, position: '3C', booked: false, locked: false }
      ]);
    })
    .then(function() {
      // generate the seating positions for screen 3 at each time
      return knex('seating').insert([
        // screen 3 at 10:30am
        { screen_id: 15, position: '1A', booked: false, locked: false },
        { screen_id: 15, position: '1B', booked: false, locked: false },
        { screen_id: 15, position: '1C', booked: false, locked: false },
        { screen_id: 15, position: '2A', booked: false, locked: false },
        { screen_id: 15, position: '2B', booked: false, locked: false },
        { screen_id: 15, position: '2C', booked: false, locked: false },
        { screen_id: 15, position: '3A', booked: false, locked: false },
        { screen_id: 15, position: '3B', booked: false, locked: false },
        { screen_id: 15, position: '3C', booked: false, locked: false },
        // screen 3 at 1:30pm
        { screen_id: 16, position: '1A', booked: false, locked: false },
        { screen_id: 16, position: '1B', booked: false, locked: false },
        { screen_id: 16, position: '1C', booked: false, locked: false },
        { screen_id: 16, position: '2A', booked: false, locked: false },
        { screen_id: 16, position: '2B', booked: false, locked: false },
        { screen_id: 16, position: '2C', booked: false, locked: false },
        { screen_id: 16, position: '3A', booked: false, locked: false },
        { screen_id: 16, position: '3B', booked: false, locked: false },
        { screen_id: 16, position: '3C', booked: false, locked: false },
        // screen 3 at 4:30pm
        { screen_id: 17, position: '1A', booked: false, locked: false },
        { screen_id: 17, position: '1B', booked: false, locked: false },
        { screen_id: 17, position: '1C', booked: false, locked: false },
        { screen_id: 17, position: '2A', booked: false, locked: false },
        { screen_id: 17, position: '2B', booked: false, locked: false },
        { screen_id: 17, position: '2C', booked: false, locked: false },
        { screen_id: 17, position: '3A', booked: false, locked: false },
        { screen_id: 17, position: '3B', booked: false, locked: false },
        { screen_id: 17, position: '3C', booked: false, locked: false },
        // screen 3 at 7:30pm
        { screen_id: 18, position: '1A', booked: false, locked: false },
        { screen_id: 18, position: '1B', booked: false, locked: false },
        { screen_id: 18, position: '1C', booked: false, locked: false },
        { screen_id: 18, position: '2A', booked: false, locked: false },
        { screen_id: 18, position: '2B', booked: false, locked: false },
        { screen_id: 18, position: '2C', booked: false, locked: false },
        { screen_id: 18, position: '3A', booked: false, locked: false },
        { screen_id: 18, position: '3B', booked: false, locked: false },
        { screen_id: 18, position: '3C', booked: false, locked: false }
      ]);
    })
    .then(function() {
      // book some seats so that the UI shows something different conditions
      return knex('bookings').insert([
        // 10:00 for film 1 (POS 1B)
        {
          email: 'joeblogs@domain.com',
          name: 'Jow Blogs',
          seating_id: 2,
          film_id: 1
        },
        // 10:00 for film 1 (POS 2A)
        {
          email: 'joeblogs@domain.com',
          name: 'Jow Blogs',
          seating_id: 4,
          film_id: 1
        },
        // 10:00 for film 1 (POS 2B)
        {
          email: 'joeblogs@domain.com',
          name: 'Jow Blogs',
          seating_id: 5,
          film_id: 1
        }
      ]);
    });

exports.down = (knex) => knex.schema.dropTable('films');
