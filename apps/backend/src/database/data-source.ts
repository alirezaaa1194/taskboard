import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// data-source.ts is in src/database/
// backend root is two levels above this file.
dotenv.config({
  path: resolve(__dirname, '../../.env'),
  override: true,
});
console.log({
  envPath: resolve(__dirname, '../../.env'),
  databaseUrl: process.env.DATABASE_URL?.replace(
    /\/\/([^:]+):([^@]+)@/,
    '//$1:****@',
  ),
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in apps/backend/.env');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: false,
});
