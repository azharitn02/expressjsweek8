const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvdrental",
  password: "qwerty",
  port: 5432,
});

module.exports = pool;
