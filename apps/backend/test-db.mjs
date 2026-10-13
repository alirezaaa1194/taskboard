import dotenv from 'dotenv';
import { Client } from 'pg';
import { resolve } from 'node:path';

dotenv.config({
  path: resolve(process.cwd(), '.env'),
  override: true,
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();

  const result = await client.query('SELECT current_user, current_database()');

  console.log('Database connection successful:', result.rows[0]);
} catch (error) {
  console.error('Database connection failed:', error.message);
} finally {
  await client.end().catch(() => {});
}
