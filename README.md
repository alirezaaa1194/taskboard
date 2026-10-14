# Task Board

A production-ready task board application with secure authentication, role-based authorization, and a modern frontend.

## Demo Video

Watch the project demo (Persian, 5 min): https://drive.google.com/file/d/1qphIE-0c32DTK4kGadnXwnatEELQe5Cv/view?usp=sharing

## Tech Stack

| Area     | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, Headless UI, TipTap |
| Backend  | NestJS, TypeORM, PostgreSQL                                       |
| Runtime  | Node.js 20+                                                       |
| Database | PostgreSQL (Docker Compose)                                       |

## Repository Structure

```
task-board/
├── apps/
│   ├── frontend/     # Next.js application
│   └── backend/      # NestJS application
├── docs/             # Architecture and development docs
├── docker-compose.yml
└── README.md
```

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

**Note:** Change these credentials in production. The seed script safely skips existing records.

## Features

- JWT authentication with HttpOnly cookies
- Refresh token rotation (hashed in DB)
- Role-based access control (Owner, Manager, Member)
- Task CRUD with TipTap JSON descriptions
- Infinite scroll for tasks and users
- Dark/Light theme
- Persian RTL interface
- Disabled user session invalidation
- Last active owner protection

## AI-Assisted Development

This project was built with AI assistance. See [docs/ai-workflow.md](docs/ai-workflow.md) for details.

## Documentation

- [Architecture](docs/architecture.md)
- [Development Guide](docs/development.md)
- [AI Workflow](docs/ai-workflow.md)
