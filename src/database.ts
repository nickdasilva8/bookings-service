import knex from 'knex';
/* tslint:disable */
const configs = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

export default knex(configs[environment]);
