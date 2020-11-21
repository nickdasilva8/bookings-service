/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// get this from a config
const dbValues = {
  host: 'localhost',
  port: 5432,
  database: 'bookings',
  user: 'bookings_user',
  password: 'woodhouse1'
};

const configs = {
  development: {
    client: 'pg',
    connection: {
      database: dbValues.database,
      user: dbValues.user,
      password: dbValues.password,
      host: dbValues.host,
      port: dbValues.port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, 'db/migrations'),
      tableName: 'knex_migrations'
    },
    debug: true
  }
  //   test: {
  // copy in another DB blob from above
  // }
};

module.exports = configs;
