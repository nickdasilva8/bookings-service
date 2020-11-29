const data = require('../buildSeatData');
const { allSeatRows, screenTimes } = data;

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
      table.date('showing_date');
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
    .createTable('users_bookings', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('name').notNullable();
    })
    .createTable('bookings', (table) => {
      table.increments('id').primary();
      table
        .integer('users_bookings_id')
        .references('id')
        .inTable('users_bookings');
      table
        .integer('seating_id')
        .references('id')
        .inTable('seating');
    })
    .then(function() {
      // generate the list of films
      return knex('films').insert([
        { name: 'Frozen' },
        { name: 'Toy Story' },
        { name: 'Antz' }
      ]);
    })
    .then(function() {
      // insert the list of time showings for films
      return knex('screens').insert(screenTimes);
    })
    .then(function() {
      // insert the seating positions for seats
      return knex('seating').insert(allSeatRows);
    });

exports.down = (knex) => knex.schema.dropTable('films');
