export default function Fundamentos() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Cabeçalho */}
      <div className="mb-8">
        <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
          Fundamentos
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          01 — Infraestrutura de Workflow
        </h1>
      </div>

      <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
        Esta seção documenta a infraestrutura de workflow do projeto — tudo que o{" "}
        <strong className="text-[hsl(var(--foreground))]">Claude Code</strong> precisa para criar
        issues e implementar código de forma autônoma, seguindo convenções consistentes.
      </p>

      {/* O que foi configurado */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-4">
          O que foi configurado
        </h2>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
          <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))] font-mono">
            <li>
              <span className="text-[hsl(var(--foreground))]">.claude/skills/create-issue/SKILL.md</span>
              <span className="ml-2">— skill para criar issues via gh CLI</span>
            </li>
            <li>
              <span className="text-[hsl(var(--foreground))]">.claude/skills/process-issue/SKILL.md</span>
              <span className="ml-2">— skill para implementar issues e abrir PRs</span>
            </li>
            <li>
              <span className="text-[hsl(var(--foreground))]">.github/ISSUE_TEMPLATE/bug_report.yml</span>
              <span className="ml-2">— template de bug report</span>
            </li>
            <li>
              <span className="text-[hsl(var(--foreground))]">.github/ISSUE_TEMPLATE/feature_request.yml</span>
              <span className="ml-2">— template de feature request</span>
            </li>
            <li>
              <span className="text-[hsl(var(--foreground))]">.github/ISSUE_TEMPLATE/task.yml</span>
              <span className="ml-2">— template de task</span>
            </li>
            <li>
              <span className="text-[hsl(var(--foreground))]">CLAUDE.md</span>
              <span className="ml-2">— convenções do projeto para o Claude Code</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Configurando o ambiente */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-4">
          Configurando o ambiente
        </h2>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] mb-4">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">Pré-requisitos</p>
          <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
            <li>Node.js &gt;= 20</li>
            <li>pnpm &gt;= 9</li>
            <li>Docker (para PostgreSQL local)</li>
          </ul>
        </div>

        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">1. Clonar e instalar</p>
        <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--foreground))]/5 font-mono text-sm text-[hsl(var(--muted-foreground))] mb-6">
          <p>git clone git@github.com:pedrofreit4s/spec-driven.git</p>
          <p>cd spec-driven</p>
          <p>pnpm install</p>
        </div>

        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">2. Instalar o GitHub CLI</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
          Necessário para que as skills criem issues e PRs pelo terminal.
        </p>
        <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--foreground))]/5 font-mono text-sm text-[hsl(var(--muted-foreground))] mb-3">
          <p className="text-[hsl(var(--muted-foreground))]/50 mb-1"># Windows</p>
          <p>winget install GitHub.cli</p>
          <p className="text-[hsl(var(--muted-foreground))]/50 mt-3 mb-1"># macOS</p>
          <p>brew install gh</p>
          <p className="text-[hsl(var(--muted-foreground))]/50 mt-3 mb-1"># Linux</p>
          <p>sudo apt install gh</p>
        </div>
        <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--foreground))]/5 font-mono text-sm text-[hsl(var(--muted-foreground))] mb-6">
          <p className="text-[hsl(var(--muted-foreground))]/50 mb-1"># Autenticar</p>
          <p>gh auth login</p>
          <p className="text-[hsl(var(--muted-foreground))]/50 mt-3 mb-1"># Verificar</p>
          <p>gh auth status</p>
        </div>

        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">3. Instalar e inicializar o Claude Code</p>
        <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--foreground))]/5 font-mono text-sm text-[hsl(var(--muted-foreground))] mb-3">
          <p>npm install -g @anthropic-ai/claude-code</p>
          <p>cd spec-driven</p>
          <p>claude</p>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
          Na primeira execução, o Claude Code detecta o{" "}
          <code className="text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] px-1 rounded">CLAUDE.md</code>{" "}
          e carrega as convenções do projeto automaticamente.
        </p>

        <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3">4. Instalar o GitHub App</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
          Dentro do Claude Code, rode{" "}
          <code className="text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] px-1 rounded">/install-github-app</code>{" "}
          e siga as instruções no browser para autorizar o acesso ao repositório (issues, PRs).
        </p>
      </div>

      {/* Skills disponíveis */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-4">
          Skills disponíveis
        </h2>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] mb-4">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1 font-mono">/create-issue</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
            Cria issues estruturadas seguindo os templates do projeto, direto do terminal.
          </p>
          <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
            <li>1. Escolhe o tipo (Bug, Feature ou Task)</li>
            <li>2. Coleta as informações necessárias</li>
            <li>3. Monta o body em Markdown com o template correto</li>
            <li>4. Cria a issue via <code className="text-[hsl(var(--foreground))]">gh</code> e retorna o link</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-[hsl(var(--border))]">
            <table className="w-full text-xs text-[hsl(var(--muted-foreground))]">
              <thead>
                <tr>
                  <th className="text-left font-medium text-[hsl(var(--foreground))] pb-1">Tipo</th>
                  <th className="text-left font-medium text-[hsl(var(--foreground))] pb-1">Label</th>
                  <th className="text-left font-medium text-[hsl(var(--foreground))] pb-1">Prefixo</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr>
                  <td className="py-0.5">Bug Report</td>
                  <td><code>bug</code></td>
                  <td><code>[Bug]:</code></td>
                </tr>
                <tr>
                  <td className="py-0.5">Feature Request</td>
                  <td><code>enhancement</code></td>
                  <td><code>[Feature]:</code></td>
                </tr>
                <tr>
                  <td className="py-0.5">Task</td>
                  <td><code>task</code></td>
                  <td><code>[Task]:</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1 font-mono">/process-issue &lt;número&gt;</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
            Lê uma issue do GitHub, implementa o código e abre um PR.
          </p>
          <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
            <li>1. Lê a issue via <code className="text-[hsl(var(--foreground))]">gh issue view</code></li>
            <li>2. Analisa critérios de aceite e identifica o app</li>
            <li>3. Cria branch a partir de <code className="text-[hsl(var(--foreground))]">main</code> (<code className="text-[hsl(var(--foreground))]">feat/42-descricao-curta</code>)</li>
            <li>4. Implementa seguindo as convenções do <code className="text-[hsl(var(--foreground))]">CLAUDE.md</code></li>
            <li>5. Valida com <code className="text-[hsl(var(--foreground))]">pnpm lint</code>, <code className="text-[hsl(var(--foreground))]">pnpm check-types</code>, <code className="text-[hsl(var(--foreground))]">pnpm build</code></li>
            <li>6. Commita e abre PR para <code className="text-[hsl(var(--foreground))]">main</code> com <code className="text-[hsl(var(--foreground))]">Closes #42</code></li>
          </ul>
        </div>
      </div>

      {/* Fluxo de autonomia */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">
          Fluxo de autonomia
        </h2>
        <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
          A ideia central é usar o{" "}
          <strong className="text-[hsl(var(--foreground))]">GitHub Issues como fonte única de verdade</strong>{" "}
          para o que precisa ser feito. O agente não improvisa — ele segue o que está na issue
          (critérios de aceite), como está no <code className="text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] px-1 rounded">CLAUDE.md</code>{" "}
          (convenções), e nada vai para <code className="text-[hsl(var(--foreground))] bg-[hsl(var(--muted))] px-1 rounded">main</code> sem review humano.
        </p>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] font-mono text-sm text-[hsl(var(--muted-foreground))]">
          <p>
            <span className="text-[hsl(var(--foreground))]">/create-issue</span>
            {"  "}→{"  "}Cria issue no GitHub com critérios de aceite
          </p>
          <p className="mt-1">
            <span className="text-[hsl(var(--foreground))]">/process-issue</span>
            {"  "}→{"  "}Lê a issue, implementa e abre PR
          </p>
          <p className="mt-1">
            <span className="text-[hsl(var(--foreground))]">Você</span>
            {"             "}→{"  "}Revisa o PR e faz merge
          </p>
        </div>
      </div>

      {/* Comandos úteis */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-4">
          Comandos úteis
        </h2>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] mb-4">
          <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">
            Raiz do monorepo
          </p>
          <ul className="space-y-1 text-sm font-mono text-[hsl(var(--muted-foreground))]">
            <li><span className="text-[hsl(var(--foreground))]">pnpm dev</span>{"          "}— inicia todos os servidores (API :3001, Docs :3000)</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm build</span>{"        "}— build de todas as apps</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm lint</span>{"         "}— lint com Biome</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm lint:fix</span>{"     "}— auto-fix de lint</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm format</span>{"       "}— formata com Biome</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm check-types</span>{"  "}— type-check de todos os packages</li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
          <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">
            API (apps/api)
          </p>
          <ul className="space-y-1 text-sm font-mono text-[hsl(var(--muted-foreground))]">
            <li><span className="text-[hsl(var(--foreground))]">pnpm db:generate</span>{"  "}— gera migrations a partir do schema</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm db:migrate</span>{"   "}— aplica migrations pendentes</li>
            <li><span className="text-[hsl(var(--foreground))]">pnpm db:studio</span>{"    "}— abre o Drizzle Studio</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
