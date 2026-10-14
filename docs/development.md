# Development Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Docker + Docker Compose

## Setup

### 1. Install dependencies

```bash
# From the root directory
npm install

# Then install dependencies for each app
cd apps/frontend && npm install
cd ../backend && npm install
cd ../..
```

### 2. Environment variables

```bash
cp .env.example .env
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env
```

### 3. Start the database

```bash
docker compose up -d
```

### 4. Run migrations and seed

```bash
cd apps/backend
npm run migration:run
npm run seed
cd ../..
```

### 5. Start development servers

```bash
npm run dev
```

## Ports

| Service    | Port                  |
| ---------- | --------------------- |
| Frontend   | http://localhost:3000 |
| Backend    | http://localhost:4000 |
| PostgreSQL | localhost:5433        |

## Seed Credentials

| Role    | Email                   | Password   |
| ------- | ----------------------- | ---------- |
| Owner   | owner@taskboard.local   | owner123   |
| Manager | manager@taskboard.local | manager123 |
| Member  | member@taskboard.local  | member123  |

## Scripts

| Command                 | Description                      |
| ----------------------- | -------------------------------- |
| `npm run dev`           | Start all apps in dev mode       |
| `npm run build`         | Build all apps                   |
| `docker compose up -d`  | Start PostgreSQL                 |
| `docker compose down`   | Stop PostgreSQL                  |
| `npm run migration:run` | Run TypeORM migrations (backend) |
| `npm run seed`          | Seed initial users (backend)     |
