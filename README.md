# spec-driven

TypeScript monorepo (pnpm + Turborepo) com duas aplicações:

- **apps/api** — Fastify 5 REST API com Drizzle ORM + PostgreSQL + Zod
- **apps/docs** — Next.js 15 documentation site (pt-BR)

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9
- [Docker](https://www.docker.com/) (para PostgreSQL local)

## Setup rápido

```bash
git clone git@github.com:pedrofreit4s/spec-driven.git
cd spec-driven
pnpm install
cp apps/api/.env.example apps/api/.env  # configure DATABASE_URL
pnpm dev                                 # API :3001, Docs :3000
```

---

## Configurando o ambiente com Claude Code

Este projeto utiliza o [Claude Code](https://docs.anthropic.com/en/docs/claude-code) como assistente de desenvolvimento com skills customizadas para gerenciar issues e implementar código.

### 1. Instalar o GitHub CLI (`gh`)

O GitHub CLI é necessário para que as skills possam criar issues e PRs diretamente do terminal.

**Windows (winget):**

```bash
winget install GitHub.cli
```

**macOS (Homebrew):**

```bash
brew install gh
```

**Linux (apt):**

```bash
sudo apt install gh
```

Após instalar, autentique-se:

```bash
gh auth login
```

Siga o fluxo interativo e escolha autenticação via browser. Verifique se funcionou:

```bash
gh auth status
```

### 2. Instalar o Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 3. Inicializar o Claude Code no projeto

Navegue até a pasta do projeto e inicie o Claude Code:

```bash
cd spec-driven
claude
```

Se for a primeira vez, o Claude Code vai detectar automaticamente o `CLAUDE.md` e carregar as convenções do projeto.

### 4. Instalar o GitHub App do Claude Code

Dentro do Claude Code, rode o comando:

```
/install-github-app
```

Siga as instruções no browser para autorizar o GitHub App na sua conta/organização. Isso permite que o Claude Code interaja com o repositório (issues, PRs, etc).

---

## Workflow com Skills

### Criar issues — `/create-issue`

Use essa skill para criar issues estruturadas no GitHub sem sair do terminal.

**Como usar:**

No Claude Code, digite:

```
/create-issue
```

Ou passe uma descrição direta:

```
/create-issue Configurar CI com GitHub Actions
```

**O que acontece:**

1. O Claude pergunta o **tipo** da issue (Bug, Feature ou Task)
2. Coleta as informações necessárias com base no tipo escolhido
3. Monta o body em Markdown seguindo os templates do projeto
4. Mostra um **resumo** para você confirmar antes de criar
5. Cria a issue via `gh issue create` e retorna o link

**Tipos disponíveis:**

| Tipo | Label | Prefixo |
|------|-------|---------|
| Bug Report | `bug` | `[Bug]:` |
| Feature Request | `enhancement` | `[Feature]:` |
| Task | `task` | `[Task]:` |

---

### Processar issues — `/process-issue`

Use essa skill para ler uma issue do GitHub e implementar o código necessário.

**Como usar:**

No Claude Code, diga:

```
Processe a issue #42
```

Ou use a skill diretamente:

```
/process-issue 42
```

**O que acontece:**

1. **Lê a issue** do GitHub via `gh issue view`
2. **Analisa** os critérios de aceite e identifica o app afetado
3. **Cria uma branch** a partir de `main` seguindo a convenção:
   ```
   feat/42-descricao-curta
   fix/99-descricao-curta
   chore/50-descricao-curta
   ```
4. **Implementa** o código seguindo as convenções do `CLAUDE.md`
5. **Valida** com lint, type-check e build:
   ```bash
   pnpm lint
   pnpm check-types
   pnpm build
   ```
6. **Commita** com mensagem padronizada:
   ```
   feat(api): adiciona endpoint de users (#42)
   ```
7. **Abre um PR** para `main` referenciando a issue com `Closes #42`

---

## Comandos úteis

```bash
pnpm dev              # Inicia todos os dev servers
pnpm build            # Build de todas as apps
pnpm lint             # Lint com Biome
pnpm lint:fix         # Auto-fix de lint
pnpm format           # Formata com Biome
pnpm check-types      # Type-check de todos os packages
```

### API (apps/api)

```bash
pnpm db:generate      # Gera migrations do Drizzle a partir do schema
pnpm db:migrate       # Aplica migrations pendentes
pnpm db:studio        # Abre o Drizzle Studio
```
