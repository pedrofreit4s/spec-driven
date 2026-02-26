---
name: create-issue
description: Cria issues bem estruturadas no GitHub seguindo as convenções do projeto spec-driven. Use quando o usuário pedir para criar issues, tickets ou tarefas no GitHub.
---

# Criar Issue no GitHub

## Labels disponíveis no projeto

| Label | Uso |
|-------|-----|
| `bug` | Correção de bug |
| `enhancement` | Nova funcionalidade ou melhoria |
| `task` | Tarefa técnica ou item de trabalho |

## Apps do monorepo

| Identificador | Descrição |
|---------------|-----------|
| API (`apps/api`) | Fastify 5 REST API com Drizzle ORM + PostgreSQL |
| Docs (`apps/docs`) | Next.js 15 documentation site (pt-BR) |
| Monorepo / Build | Turborepo, CI/CD, configs compartilhadas |

## Passos

1. Entenda o que o usuário quer implementar
2. Quebre em issues granulares (1 issue = 1 PR, 1 app por issue)
3. Para cada issue, defina:
   - Título com prefixo do tipo: `[Bug]`, `[Feature]`, `[Task]`
   - Descrição detalhada
   - Critérios de aceite como checklist
   - Labels: tipo + opcionalmente outras relevantes

4. Monte o body seguindo o template do tipo:

### Bug Report

```markdown
## App afetado
API (apps/api) | Docs (apps/docs) | Monorepo / Build

## Descrição do bug
Detalhe aqui.

## Comportamento esperado
O que deveria acontecer.

## Passos para reproduzir
1. Passo 1
2. Passo 2

## Logs / Screenshots
N/A

## Ambiente
- Node.js:
- pnpm:
- SO:
```

### Feature Request

```markdown
## App relacionado
API (apps/api) | Docs (apps/docs) | Monorepo / Build

## Problema ou motivação
Detalhe aqui.

## Solução proposta
Detalhe aqui.

## Alternativas consideradas
N/A

## Contexto adicional
N/A
```

### Task

```markdown
## App relacionado
API (apps/api) | Docs (apps/docs) | Monorepo / Build

## Descrição da tarefa
Detalhe aqui.

## Critérios de aceite
- [ ] Critério 1
- [ ] Critério 2

## Contexto adicional
N/A
```

5. Crie com `gh` CLI usando HEREDOC para o body:

```bash
gh issue create \
  --repo pedrofreit4s/spec-driven \
  --title "[Task]: Título descritivo da issue" \
  --label "task" \
  --body "$(cat <<'EOF'
## App relacionado
API (apps/api)

## Descrição da tarefa
Detalhe aqui.

## Critérios de aceite
- [ ] Critério 1
- [ ] Critério 2

## Contexto adicional
N/A
EOF
)"
```

6. Liste as issues criadas para o usuário revisar

## Regras

- Cada issue deve afetar **apenas 1 app**
- Issues devem ser pequenas o suficiente para **1 PR**
- Sempre incluir **critérios de aceite** (checklist)
- Relacionar issues dependentes com "Depende de: #N"
- PRs devem ser abertos para a branch `main`
