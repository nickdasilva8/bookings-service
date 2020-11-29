# bookings-service

## Running locally

- `yarn`
- `docker-compose up`
  - If you want to delete the database (tear it down) and start again, run the code below.
    `docker-compose down && docker-compose up`
  - The start up migration inserts 7 days worth of screens. If you start it today and come back in 5 days, it wont work properly.
  - This would have a cron job running once a night creating new rows (for more than 7 days for safety) and then also archiving any past dates.
- `yarn watch`
  - Your service should now be available on http://localhost:3001

## Database Migrations (knex.js)

- Prefix knex commands with `npx` if 'knex' command not found e.g. `npx knex migrate:rollback`
- Before making any changes to an existing migration that has been previously run:
  - `knex migrate:rollback`
- Creating a new migration:
- `knex migrate:make ${some_sensible_name}`
  - eg: `knex migrate:make alter_bookings_rename_content`
  - creates a file in `./db/migrations` that will have a time stamp in front of it, followed by your sensible name:
    eg: `20200122084046_alter_bookings_rename_content.js`
- `knex migrate:latest` to run all migrations

  https://knexjs.org/
  http://perkframework.com/v1/guides/database-migrations-knex.html - beginner's guide to writing migrations
