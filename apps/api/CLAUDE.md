# API — Fastify 5 + Arquitetura Hexagonal

REST API com Drizzle ORM, PostgreSQL, Zod e JWT.

## Estrutura

```
apps/api/
├── index.ts                          ← Entry point + composição manual (DI)
├── config/
│   └── env.ts                        ← Validação de env vars com Zod
│
├── domain/
│   └── user/
│       ├── entity.ts                 ← User entity (factory methods)
│       ├── repository.ts             ← Port: UserRepository interface
│       └── value-objects/
│           ├── email.ts              ← Email VO (validação + normalização)
│           └── password.ts           ← Password VO (regras de força)
│
├── application/
│   └── user/
│       ├── ports/
│       │   ├── hasher.ts             ← Port: Hasher interface
│       │   └── token-provider.ts     ← Port: TokenProvider interface
│       └── use-cases/
│           ├── register.ts           ← RegisterUseCase
│           ├── authenticate.ts       ← AuthenticateUseCase
│           ├── logout.ts             ← LogoutUseCase
│           ├── refresh-token.ts      ← RefreshTokenUseCase
│           └── get-profile.ts        ← GetProfileUseCase
│
├── infrastructure/
│   ├── database/
│   │   └── repositories/
│   │       └── drizzle-user-repository.ts  ← Adapter: UserRepository com Drizzle
│   └── http/
│       ├── plugins/
│       │   └── swagger.ts            ← @fastify/swagger + Scalar (OpenAPI docs)
│       ├── routes/
│       │   ├── auth-routes.ts        ← POST /auth/register, /auth/login, /auth/refresh, /auth/logout
│       │   └── user-routes.ts        ← GET /me (protegida por Bearer)
│       └── schemas/
│           ├── auth-schemas.ts       ← Zod schemas de request + response
│           ├── error-schemas.ts      ← Zod schema de error response
│           └── user-schemas.ts       ← Zod schemas de response
│
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Comandos

```bash
pnpm dev              # Watch mode com tsx (index.ts)
pnpm build            # Build com tsup (ESM → dist/)
pnpm start            # Executa dist/index.js
pnpm check-types      # Type-check com tsc
pnpm db:generate      # Gerar migrações Drizzle
pnpm db:migrate       # Aplicar migrações pendentes
pnpm db:studio        # Abrir Drizzle Studio
```

## Arquitetura Hexagonal

A API segue **Clean Architecture / Ports & Adapters**:

- **Domain** — Entidades, Value Objects e interfaces de repositório. Não importa nada de infraestrutura.
- **Application** — Use Cases que orquestram lógica de negócio. Dependem apenas de **ports** (interfaces), nunca de implementações concretas.
- **Infrastructure** — Adapters que implementam os ports: repositório Drizzle, rotas HTTP, schemas Zod.
- **Composição** — `index.ts` conecta tudo manualmente (sem framework de DI).

### Regras de dependência

```
domain ← application ← infrastructure
                    ↑
               index.ts (composição)
```

- `domain/` nunca importa de `application/` ou `infrastructure/`
- `application/` nunca importa de `infrastructure/`
- `infrastructure/` importa de `domain/` e `application/`
- `index.ts` importa de todos para montar o grafo de dependências

## Variáveis de Ambiente

| Variável | Obrigatória | Default | Descrição |
|----------|-------------|---------|-----------|
| `DATABASE_URL` | Sim | — | Connection string PostgreSQL |
| `JWT_SECRET` | Sim | — | Chave para JWT (mín. 32 chars) |
| `PORT` | Não | `3001` | Porta do servidor |
| `HOST` | Não | `0.0.0.0` | Host do servidor |
| `LOG_LEVEL` | Não | `info` | Nível de log (pino) |
| `NODE_ENV` | Não | `development` | Ambiente |

Validação via Zod em `config/env.ts` — falha fast no startup se variáveis obrigatórias faltarem.

## Rotas HTTP

| Método | Rota | Auth | Body | Response |
|--------|------|------|------|----------|
| POST | `/auth/register` | Não | `{ name, email, password }` | `201 { user }` |
| POST | `/auth/login` | Não | `{ email, password }` | `200 { accessToken, refreshToken, user }` |
| POST | `/auth/refresh` | Não | `{ refreshToken }` | `200 { accessToken, refreshToken }` |
| POST | `/auth/logout` | Bearer | — | `204 No Content` |
| GET | `/me` | Bearer | — | `200 { user }` |
| GET | `/docs` | Não | — | Scalar UI (documentação interativa) |
| GET | `/openapi.json` | Não | — | OpenAPI 3.1 spec JSON |

## Documentação OpenAPI

- **Spec**: `@fastify/swagger` gera OpenAPI 3.1 automaticamente a partir dos schemas Zod das rotas
- **UI**: `@scalar/fastify-api-reference` serve UI interativa em `GET /docs`
- **Type Provider**: `fastify-type-provider-zod` converte schemas Zod para JSON Schema e valida requests
- **Schemas**: Rotas usam `schema` do Fastify com Zod schemas (body, response, tags, security)
- Novos endpoints devem incluir `schema` com `body`, `response`, `tags`, `summary` e `description`
- Endpoints autenticados devem incluir `security: [{ bearerAuth: [] }]`

## Convenções

- **Sem pasta `src/`** — arquivos TS ficam na raiz de `apps/api/`
- **Entry point**: `index.ts` (não `src/index.ts`)
- **Imports com `.js`** — extensão obrigatória em imports relativos (ESM)
- **Entities imutáveis** — propriedades `readonly`, criação via factory methods estáticos
- **Use Cases como classes** — recebem dependências via construtor, expõem `execute()`
- **Ports como interfaces** — nunca classes abstratas
- **1 use case = 1 arquivo**
- **Erros de domínio** — usar classes de `@spec-driven/http` (`ConflictError`, `UnauthorizedError`, etc.)
- **Passwords nunca expostos** — responses não incluem `passwordHash`
- **Refresh token rotation** — token antigo é revogado ao usar

## Pacotes workspace utilizados

| Pacote | Uso |
|--------|-----|
| `@spec-driven/auth` | `createHasher()`, `createTokenProvider()`, `createAuthMiddleware()` |
| `@spec-driven/db` | `createDatabase()`, tabelas `users`/`refreshTokens`, tipos |
| `@spec-driven/http` | `createServer()`, classes de erro, `ServerInstance` |
| `@spec-driven/logger` | `createFastifyLoggerConfig()` |
