import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { User } from '../users/entities/user.entity.js';
import { Task } from '../tasks/entities/task.entity.js';
import { RefreshToken } from '../auth/entities/refresh-token.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '../../.env');

dotenv.config({
  path: envPath,
  override: true,
});

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL is not defined. Expected .env at: ${envPath}`);
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Task, RefreshToken],
  migrations: [resolve(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: false,
});
