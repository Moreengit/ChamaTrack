// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection on startup
(async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully →', client.database);
    client.release();
  } catch (err) {
    console.error('PostgreSQL connection error:', err.stack);
  }
})();

module.exports = pool;