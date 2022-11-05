import { Client } from 'pg';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: resolve(__dirname, '..', '..', '..', '.env.test'),
});

const teardown = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query('DROP SCHEMA IF EXISTS test_schema CASCADE');
  await client.end();
};

module.exports = teardown;
