const knex = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATA,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  }
});

module.exports = knex