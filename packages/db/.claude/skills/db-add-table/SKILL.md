---
name: db-add-table
description: Cria uma nova tabela no banco de dados usando Drizzle ORM no pacote @spec-driven/db. Use quando o usuário pedir para criar tabela, definir schema ou adicionar entidade no banco.
---

# Criar Tabela no Banco de Dados

## Quando usar

Quando o usuário pedir para criar uma nova tabela, entidade ou schema no banco. Exemplos:
- "cria a tabela de orders"
- "adiciona a entidade projects no banco"
- "define o schema de notifications"

---

## Estrutura do pacote

```
packages/db/
├── src/
│   ├── schema/
│   │   ├── index.ts            ← barrel file (re-exporta tudo)
│   │   ├── users.ts            ← tabela + tipos
│   │   ├── refresh-tokens.ts   ← tabela + tipos
│   │   └── relations.ts        ← todas as relations
│   ├── client.ts
│   ├── drizzle.ts
│   ├── index.ts
│   └── types.ts
├── drizzle/                    ← migrações geradas
└── drizzle.config.ts
```

**Regra principal:** cada tabela fica em seu próprio arquivo. Relations ficam centralizadas em `relations.ts`.

---

## Passo 1 — Criar o arquivo da tabela

Criar `packages/db/src/schema/<nome-da-tabela>.ts` seguindo o template:

### Tabela simples (sem FK)

```typescript
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const nomeTabela = pgTable("nome_tabela", {
  id: uuid("id").primaryKey().defaultRandom(),
  // ... colunas
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type SelectNomeTabela = InferSelectModel<typeof nomeTabela>
export type InsertNomeTabela = InferInsertModel<typeof nomeTabela>
```

### Tabela com FK

```typescript
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { tabelaPai } from "./tabela-pai"

export const nomeTabela = pgTable(
  "nome_tabela",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tabelaPaiId: uuid("tabela_pai_id")
      .notNull()
      .references(() => tabelaPai.id, { onDelete: "cascade" }),
    // ... colunas
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("nome_tabela_tabela_pai_id_idx").on(table.tabelaPaiId)],
)

export type SelectNomeTabela = InferSelectModel<typeof nomeTabela>
export type InsertNomeTabela = InferInsertModel<typeof nomeTabela>
```

---

## Passo 2 — Adicionar relations em `relations.ts`

Abrir `packages/db/src/schema/relations.ts` e adicionar as relations da nova tabela.

### Relation `one` (FK pertence a)

```typescript
import { nomeTabela } from "./nome-tabela"

export const nomeTabelaRelations = relations(nomeTabela, ({ one }) => ({
  tabelaPai: one(tabelaPai, { fields: [nomeTabela.tabelaPaiId], references: [tabelaPai.id] }),
}))
```

### Relation `many` (tem muitos)

Atualizar a relation da tabela pai existente para incluir a nova tabela:

```typescript
export const tabelaPaiRelations = relations(tabelaPai, ({ many }) => ({
  // ... relations existentes
  nomeTabelas: many(nomeTabela),
}))
```

---

## Passo 3 — Exportar no barrel file

Adicionar exports em `packages/db/src/schema/index.ts`:

```typescript
export { nomeTabela } from "./nome-tabela"
export type { InsertNomeTabela, SelectNomeTabela } from "./nome-tabela"
```

> Se adicionou novas relations, verificar que `relations.ts` já está exportado no barrel. O import das relations novas é coberto pelo `export { ... } from "./relations"` existente — basta adicionar o nome da relation exportada.

---

## Passo 4 — Registrar no drizzle.config.ts

Adicionar o novo arquivo ao array `schema` em `packages/db/drizzle.config.ts`:

```typescript
export default defineConfig({
  schema: [
    "./src/schema/users.ts",
    "./src/schema/refresh-tokens.ts",
    "./src/schema/nome-tabela.ts",       // ← adicionar
    "./src/schema/relations.ts",
  ],
  // ...
})
```

---

## Passo 5 — Gerar migração

```bash
cd packages/db
pnpm db:generate
```

Verificar o SQL gerado em `packages/db/drizzle/`.

---

## Passo 6 — Validar

```bash
pnpm lint
pnpm check-types
pnpm build
```

---

## Passo 7 — Aplicar migração (opcional)

Requer `DATABASE_URL` configurado em `apps/api/.env`:

```bash
cd apps/api
pnpm db:migrate
```

---

## Convenções

### Nomes

| Contexto | Convenção | Exemplo |
|----------|-----------|---------|
| Nome da tabela (DB) | `snake_case` | `"refresh_tokens"` |
| Nome de coluna (DB) | `snake_case` | `"user_id"`, `"created_at"` |
| Variável da tabela (TS) | `camelCase` | `refreshTokens` |
| Propriedade de coluna (TS) | `camelCase` | `userId`, `createdAt` |
| Nome do arquivo | `kebab-case` | `refresh-tokens.ts` |
| Tipos exportados | `PascalCase` com prefixo `Select`/`Insert` | `SelectUser`, `InsertUser` |
| Nome de índice | `{tabela}_{coluna}_idx` | `refresh_tokens_user_id_idx` |

### Colunas padrão

Toda tabela deve incluir:

| Coluna | Tipo | Observação |
|--------|------|------------|
| `id` | `uuid` | PK com `defaultRandom()` |
| `createdAt` | `timestamp with tz` | `notNull().defaultNow()` |
| `updatedAt` | `timestamp with tz` | Incluir quando a entidade é mutável |

### Imports entre schemas

- Usar imports **sem extensão `.js`** dentro de `packages/db/src/schema/` (compatibilidade com drizzle-kit)
- Exemplo: `import { users } from "./users"` (não `"./users.js"`)

### FKs e índices

- Sempre adicionar `index()` em colunas de FK para performance em lookups
- Usar `onDelete: "cascade"` quando a entidade filha não faz sentido sem o pai
- Usar `onDelete: "set null"` quando a relação é opcional

### Relations

- Relations ficam **centralizadas** em `relations.ts` (evita dependências circulares)
- Nunca colocar relations no mesmo arquivo da tabela

---

## Referência rápida de tipos de coluna

```typescript
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

// Tipos comuns
uuid("id")                                          // UUID
varchar("name", { length: 255 })                    // VARCHAR(255)
text("description")                                 // TEXT (sem limite)
integer("count")                                    // INTEGER
numeric("price", { precision: 10, scale: 2 })       // NUMERIC(10,2)
boolean("active")                                   // BOOLEAN
timestamp("created_at", { withTimezone: true })      // TIMESTAMPTZ
jsonb("metadata")                                   // JSONB

// Enum
export const statusEnum = pgEnum("status", ["active", "inactive"])
statusEnum("status")                                 // Usa o enum

// Constraints
.primaryKey()
.notNull()
.unique()
.default("valor")
.defaultRandom()       // UUID v4
.defaultNow()          // CURRENT_TIMESTAMP
.references(() => outraTabela.id, { onDelete: "cascade" })
```

---

## Checklist de entrega

- [ ] Arquivo da tabela criado em `packages/db/src/schema/<nome>.ts`
- [ ] Tipos `Select*` e `Insert*` exportados
- [ ] Relations adicionadas/atualizadas em `relations.ts`
- [ ] Exports adicionados em `index.ts` (barrel)
- [ ] Arquivo registrado em `drizzle.config.ts`
- [ ] Migração gerada com `pnpm db:generate`
- [ ] `pnpm check-types` e `pnpm build` passam
- [ ] Convenções de nomes respeitadas (snake_case DB, camelCase TS)
