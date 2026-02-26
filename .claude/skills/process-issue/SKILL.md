---
name: process-issue
description: Lê uma issue do GitHub e implementa o código necessário. Use quando o usuário pedir para processar, implementar ou resolver uma issue.
---

# Processar Issue do GitHub

## Uso

```
Processe a issue #N. Leia os critérios de aceite, crie uma branch, implemente o código e abra um PR.
```

## Passos

### 1. Ler a issue

```bash
gh issue view <numero> --repo pedrofreit4s/spec-driven
```

### 2. Analisar e planejar

- Leia os critérios de aceite e contexto técnico
- Identifique o app afetado (API, Docs ou Monorepo)
- Liste os arquivos a criar/modificar
- Se necessário, explore a estrutura do app afetado

### 3. Criar a branch

Seguindo as convenções do projeto:

```bash
git checkout main
git checkout -b <tipo>/<numero>-descricao-curta
```

Exemplos:
- `feat/123-add-endpoint-users`
- `fix/99-corrigir-validacao-zod`
- `chore/180-atualizar-deps`
- `docs/161-criar-pagina-guia`

### 4. Implementar

Seguindo:
- Critérios de aceite da issue
- Convenções do `CLAUDE.md`
- Padrões do app afetado

### 5. Validar

```bash
pnpm lint
pnpm check-types
pnpm build
```

### 6. Commitar

```bash
git add <arquivos-especificos>
git commit -m "tipo(escopo): descrição (#numero)"
```

Formato: `tipo(escopo): descrição`

| Tipo | Escopo | Exemplo |
|------|--------|---------|
| `feat` | `api` | `feat(api): adiciona endpoint de users (#42)` |
| `fix` | `api` | `fix(api): corrige validação de schema zod (#99)` |
| `chore` | `monorepo` | `chore(monorepo): atualiza dependências (#50)` |
| `docs` | `docs` | `docs(docs): cria página de guia de uso (#161)` |

### 7. Abrir PR

PR sempre apontando para `main`:

```bash
gh pr create \
  --title "tipo(escopo): descrição" \
  --base main \
  --body "$(cat <<'EOF'
## Summary
- Mudança 1
- Mudança 2

## Critérios de Aceite Atendidos
- [x] Critério 1
- [x] Critério 2

## Test plan
- [ ] Como testar

Closes #<numero>
EOF
)"
```

## Regras

- Sempre criar branch a partir de `main`
- PRs sempre apontam para `main` (`--base main`)
- 1 PR por issue
- PR deve referenciar a issue com `Closes #N`
- Nunca commitar com `git add .` — preferir arquivos específicos
- Nunca usar `--no-verify`
