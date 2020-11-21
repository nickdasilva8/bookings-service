# bookings-service

### Good to know

- Project is based on 'TypeScript Node Starter'.
- `git commit` runs husky (linter and tests)
  - if tests are failing due to a db connection issue, make sure you have the testdb up and running for tests to run against - see 'Testing' section
  - try `yarn lint-and-test` in a terminal, if they all pass, try committing again

## Running locally

- `yarn`
- `docker-compose up`
- `yarn watch`

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

