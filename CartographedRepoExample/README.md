# Cartographed Repo Example

Minimal Node.js monorepo showing common project conventions and scoped contexts:

- `apps/api`: HTTP API for auth, notes, and billing demo flows
- `apps/web`: browser UI consuming the API
- `packages/db`: JSON-file persistence layer
- `packages/observability`: structured log helpers
- `packages/ui`: small shared UI component module

## Requirements

- Node.js `>=18`

## Quick Start

```bash
npm install
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run start`: starts API + static web server
- `npm run check`: syntax checks all JS files in `apps`, `packages`, `scripts`, and `tests`
- `npm run test`: runs Node test suite
- `npm run verify`: runs check + test

## Environment Variables

- `PORT`: server port (default `3000`)
- `DB_FILE_PATH`: optional database file override (defaults to `packages/db/db.json`)

## API Summary

- `GET /api/health`
- `GET /api/session`
- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/notes`
- `POST /api/notes`
- `GET /api/billing/plans`
- `GET /api/billing/subscription`
- `POST /api/billing/subscribe`

## Project Conventions

- CommonJS modules for backend and package code
- Built-in Node test runner (`node:test`) for unit and integration coverage
- CI workflow runs checks and tests on pull requests and pushes
