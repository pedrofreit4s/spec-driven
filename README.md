# 01 - Fundamentos

> GitHub Issue Templates, Claude Code Skills e automacao de workflow com GitHub CLI.

## O que foi feito nesta branch?

Esta branch configura a **infraestrutura de workflow** do projeto — tudo que o Claude Code precisa para criar issues e implementar codigo de forma autonoma.

### O que foi criado

```
.claude/skills/
  create-issue/SKILL.md     # Skill para criar issues via gh CLI
  process-issue/SKILL.md    # Skill para implementar issues e abrir PRs

.github/ISSUE_TEMPLATE/
  bug_report.yml             # Template de bug report
  feature_request.yml        # Template de feature request
  task.yml                   # Template de task
  config.yml                 # Desabilita issues em branco

CLAUDE.md                    # Convencoes do projeto para o Claude Code
```

## Configurando o ambiente

### Pre-requisitos

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9
- [Docker](https://www.docker.com/) (para PostgreSQL local)

### 1. Clonar e instalar

```bash
git clone git@github.com:pedrofreit4s/spec-driven.git
cd spec-driven
pnpm install
```

### 2. Instalar o GitHub CLI (`gh`)

O GitHub CLI e necessario para que as skills criem issues e PRs pelo terminal.

**Windows:**

```bash
winget install GitHub.cli
```

**macOS:**

```bash
brew install gh
```

**Linux:**

```bash
sudo apt install gh
```

Apos instalar, autentique-se:

```bash
gh auth login
```

Siga o fluxo interativo e escolha autenticacao via browser. Verifique:

```bash
gh auth status
```

### 3. Instalar o Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 4. Inicializar o Claude Code no projeto

```bash
cd spec-driven
claude
```

Na primeira execucao, o Claude Code detecta o `CLAUDE.md` e carrega as convencoes do projeto automaticamente.

### 5. Instalar o GitHub App

Dentro do Claude Code, rode:

```
/install-github-app
```

Siga as instrucoes no browser para autorizar o GitHub App. Isso permite que o Claude Code interaja com o repositorio (issues, PRs, etc).

## Skills disponiveis

### `/create-issue` — Criar issues no GitHub

Cria issues estruturadas seguindo os templates do projeto, direto do terminal.

```
/create-issue
```

Ou com descricao direta:

```
/create-issue Criar endpoint de healthcheck
```

**Fluxo:**

1. Escolhe o tipo (Bug, Feature ou Task)
2. Coleta as informacoes necessarias
3. Monta o body em Markdown seguindo os templates
4. Mostra resumo para confirmacao
5. Cria a issue via `gh` e retorna o link

| Tipo | Label | Prefixo |
|------|-------|---------|
| Bug Report | `bug` | `[Bug]:` |
| Feature Request | `enhancement` | `[Feature]:` |
| Task | `task` | `[Task]:` |

### `/process-issue` — Implementar uma issue

Le uma issue do GitHub, implementa o codigo e abre um PR.

```
/process-issue 42
```

**Fluxo:**

1. Le a issue via `gh issue view`
2. Analisa criterios de aceite e identifica o app
3. Cria branch a partir de `main` (`feat/42-descricao-curta`)
4. Implementa seguindo as convencoes do `CLAUDE.md`
5. Valida com `pnpm lint`, `pnpm check-types`, `pnpm build`
6. Commita com mensagem padronizada (`feat(api): descricao (#42)`)
7. Abre PR para `main` com `Closes #42`

## GitHub Issues como backlog do agente

A ideia central desta branch e usar o **GitHub Issues como fonte unica de verdade** para o que precisa ser feito no projeto. Em vez de descrever tarefas em conversas soltas, tudo vira uma issue estruturada com templates padronizados.

### Por que automatizar a criacao de issues?

- **Padronizacao**: todas as issues seguem o mesmo template, com os mesmos campos. Nao importa quem criou — a estrutura e consistente.
- **Velocidade**: em vez de abrir o browser, navegar ate o repo e preencher formularios, voce digita `/create-issue` e responde algumas perguntas.
- **Granularidade**: o Claude quebra features grandes em issues menores (1 issue = 1 PR = 1 app).
- **Criterios de aceite**: toda issue tem um checklist verificavel. Ou todos os checks estao marcados, ou nao esta pronto.

### Autonomia do Claude Code

Combinando as duas skills, o Claude Code opera com **autonomia dentro de limites claros**:

```
/create-issue   -->  Cria a issue no GitHub com criterios de aceite
/process-issue  -->  Le a issue, implementa e abre PR
Voce             -->  Revisa o PR e faz merge
```

O agente nao improvisa. Ele segue o que esta na issue (criterios de aceite), como esta no `CLAUDE.md` (convencoes), e nada vai para `main` sem review humano.

## Comandos uteis

```bash
pnpm dev              # Inicia todos os dev servers (API :3001, Docs :3000)
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
