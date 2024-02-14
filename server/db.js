import { Pool } from 'pg';

const connectionString =
  'postgresql://postgres:postgres@postgres:5432/postgres' ||
  process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString,
});

pool.on('error', () => console.log('Lost PG Connection!'));

export const query = (text, params) => pool.query(text, params);

// query('CREATE TABLE IF NOT EXISTS values (number INT)')
