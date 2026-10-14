# Architecture

## Overview

Task Board is a monorepo built with Turborepo. The browser communicates only with Next.js, which proxies all API requests to NestJS via `/api/v1/*`.

## Stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, Headless UI, TipTap |
| Backend  | NestJS, TypeORM, PostgreSQL                                       |
| Runtime  | Node.js 20+                                                       |
| Database | PostgreSQL (Docker Compose)                                       |

## Request Flow

Browser → Next.js Route Handler (`/api/v1/*`) → NestJS

- Client Components use `ClientCall` → `/api/v1/*`
- Server Components use `ServerCall` → `/api/v1/*`
- Both go through the same Route Handler, which handles refresh tokens and forwards to NestJS.

## Authentication

- Access tokens stored in HttpOnly cookies
- Refresh tokens stored as hashes in PostgreSQL
- `proxy.ts` handles navigation-level auth checks and token refresh
- Disabled users cannot access APIs even with old tokens (checked in `JwtStrategy.validate`)

## Authorization

- Three roles: Owner, Manager, Member
- Enforced in NestJS via `RolesGuard` (UI hiding is not security)
- Last active owner cannot be disabled or downgraded
- Member can only access tasks they created or are assigned to

## Database

- Schema created only through TypeORM migrations
- `synchronize: false` is enforced
- Seeds create one Owner, one Manager, one Member
