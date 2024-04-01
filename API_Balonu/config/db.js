const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'balonu_api',
  password: '2812',
  port: 5432,
});

module.exports = pool;
