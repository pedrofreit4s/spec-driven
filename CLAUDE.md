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
- **Entry:** `index.ts` — composição manual de dependências + bootstrap do Fastify
- **Config:** `config/env.ts` — validação de env vars com Zod (fail-fast)
- **Domain:** `domain/` — entidades, value objects e ports (interfaces de repositório)
- **Application:** `application/` — use cases e ports (interfaces de serviços)
- **Infrastructure:** `infrastructure/` — adapters (Drizzle repository, rotas HTTP, Zod schemas)
- **Build:** tsup bundles to ESM in `dist/`
- **Sem pasta `src/`** — arquivos TS ficam direto na raiz de `apps/api/`

### Docs (apps/docs)
- Standard Next.js App Router at `src/app/`
- Path alias: `@/*` maps to `./src/*`

### Environment Variables (API)
Required: `DATABASE_URL` (PostgreSQL connection string), `JWT_SECRET` (min 32 chars)
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
| `/create-page` | Cria uma nova página em `apps/docs` seguindo os padrões visuais do `view.md` |
| `/db-add-table` | Cria uma nova tabela no banco de dados usando Drizzle ORM no pacote @spec-driven/db |
