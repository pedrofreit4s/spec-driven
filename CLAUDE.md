# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript monorepo (pnpm + Turborepo) with two apps:
- **apps/api** — Fastify 5 REST API with Drizzle ORM + PostgreSQL + Zod validation
- **apps/docs** — Next.js 15 documentation site (React 19, pt-BR locale)

## Commands

### Root-level (runs across all apps via Turborepo)
```bash
pnpm install          # Install all workspace dependencies
pnpm dev              # Start all dev servers (API :3001, Docs :3000)
pnpm build            # Build all apps
pnpm start            # Start production servers (requires build first)
pnpm lint             # Lint with Biome
pnpm lint:fix         # Auto-fix lint issues
pnpm format           # Format with Biome
pnpm check-types      # Type-check all packages
```

### API-specific (run from apps/api)
```bash
pnpm dev              # Watch mode with tsx
pnpm db:generate      # Generate Drizzle migrations from schema changes
pnpm db:migrate       # Apply pending migrations
pnpm db:studio        # Open Drizzle Studio UI
```

## Architecture

### API (apps/api)
- **Entry:** `src/index.ts` starts Fastify on PORT/HOST from env
- **App config:** `src/app.ts` sets up Fastify with pino logger, CORS, and routes
- **Database:** `src/db/index.ts` connects via postgres.js, wrapped with Drizzle ORM
- **Schema:** `src/db/schema.ts` defines Drizzle table definitions
- **Migrations:** Output to `drizzle/` directory, managed by Drizzle Kit
- **Build:** tsup bundles to ESM in `dist/`
- **Config:** `drizzle.config.ts` points to schema and migration output

### Docs (apps/docs)
- Standard Next.js App Router at `src/app/`
- Path alias: `@/*` maps to `./src/*`

### Environment Variables (API)
Required: `DATABASE_URL` (PostgreSQL connection string)
Optional: `PORT` (3001), `HOST` (0.0.0.0), `LOG_LEVEL` (info), `NODE_ENV`
See `apps/api/.env.example` for template.

## Code Style (Biome)

- 2-space indentation, 100 char line width
- Double quotes, semicolons only as needed, ES5 trailing commas
- Automatic import organization enabled
- Biome replaces both ESLint and Prettier in this repo

## Skills (slash commands)

| Comando | Descrição |
|---------|-----------|
| `/create-issue` | Cria issues no GitHub via `gh` CLI seguindo os templates do projeto (Bug, Feature, Task) |
| `/process-issue` | Lê uma issue do GitHub, cria branch, implementa o código e abre PR |
