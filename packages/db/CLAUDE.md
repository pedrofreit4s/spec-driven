# @spec-driven/db

Pacote compartilhado de banco de dados — Drizzle ORM + PostgreSQL via postgres.js.

## Estrutura

```
packages/db/
├── src/
│   ├── schema/           ← definições de tabelas (1 arquivo por tabela)
│   │   ├── index.ts      ← barrel file (re-exporta tabelas, tipos e relations)
│   │   ├── users.ts
│   │   ├── refresh-tokens.ts
│   │   └── relations.ts  ← todas as relations centralizadas
│   ├── client.ts         ← factory de conexão postgres.js
│   ├── drizzle.ts        ← factory do Drizzle ORM (createDatabase)
│   ├── index.ts          ← entry point do pacote
│   └── types.ts          ← re-export de InferInsertModel/InferSelectModel
├── drizzle/              ← migrações SQL geradas
└── drizzle.config.ts     ← config do Drizzle Kit (carrega .env de apps/api)
```

## Comandos

```bash
pnpm db:generate    # Gerar migrações a partir do schema
pnpm db:migrate     # Aplicar migrações (requer DATABASE_URL em apps/api/.env)
pnpm db:studio      # Abrir Drizzle Studio
pnpm build          # Build com tsup (ESM + .d.ts)
pnpm check-types    # Type-check
```

## Convenções

- **1 tabela = 1 arquivo** em `src/schema/` (nome em `kebab-case`)
- **Relations centralizadas** em `src/schema/relations.ts` (evita dependência circular)
- **Imports sem extensão `.js`** dentro de `src/schema/` (compatibilidade com drizzle-kit)
- Colunas no DB: `snake_case` — Propriedades no TS: `camelCase`
- Toda tabela exporta tipos `Select*` e `Insert*` via `InferSelectModel`/`InferInsertModel`
- Toda tabela tem `id` (uuid, PK, defaultRandom), `createdAt` (timestamptz)
- Novos arquivos de schema devem ser registrados no array `schema` do `drizzle.config.ts`

## Exports do pacote

| Export | Tipo | Descrição |
|--------|------|-----------|
| `createClient(url)` | Function | Cria cliente postgres.js |
| `createDatabase(url)` | Function | Cria instância Drizzle ORM com schema |
| `Database` | Type | Tipo da instância do banco |
| `InferInsertModel<T>` | Type | Infere tipo de insert a partir de tabela |
| `InferSelectModel<T>` | Type | Infere tipo de select a partir de tabela |
| `users`, `refreshTokens` | Table | Definições de tabela Drizzle |
| `usersRelations`, `refreshTokensRelations` | Relations | Relations para queries com join |
| `SelectUser`, `InsertUser`, etc. | Type | Tipos inferidos das tabelas |

## Skills

| Comando | Descrição |
|---------|-----------|
| `/db-add-table` | Cria nova tabela seguindo as convenções do pacote |
