const { Pool } = require("pg");

const e = process.env;

module.exports = new Pool({
  host: e.DB_HOST,
  user: e.DB_USER,
  database: e.DB_DATABASE,
  password: e.DB_PASSWORD,
  port: e.DB_PORT
});