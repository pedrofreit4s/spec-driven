---
name: create-page
description: Cria uma nova página de documentação em apps/docs seguindo os padrões visuais do projeto. Use quando o usuário pedir para criar uma nova página, seção ou rota na documentação.
---

# Criar Página de Documentação

## Quando usar


Quando o usuário pedir para criar uma nova página ou seção na documentação. Exemplos:
- "cria a página de API"
- "adiciona uma página sobre autenticação"
- "cria /fundamentos/drizzle"

---

## O que fazer

1. **Identificar** rota, título, label (categoria) e se precisa aparecer na sidebar
2. **Criar** o arquivo `.tsx` no caminho correto dentro de `apps/docs/src/app/`
3. **Linkar na sidebar** se o usuário pedir ou se for uma seção de primeiro nível
4. **Verificar** que o arquivo exporta `default` e que a rota está acessível

---

## Passo 1 — Determinar o caminho do arquivo

O Next.js App Router mapeia pastas para rotas:

| Rota desejada        | Arquivo a criar                                      |
|----------------------|------------------------------------------------------|
| `/fundamentos`       | `src/app/fundamentos/page.tsx`                       |
| `/fundamentos/drizzle` | `src/app/fundamentos/drizzle/page.tsx`             |
| `/api`               | `src/app/api-docs/page.tsx` *(evitar `/api` — reservado pelo Next.js)* |

> **Atenção:** nunca criar `src/app/api/` — essa pasta é reservada para Route Handlers do Next.js.

---

## Passo 2 — Template de página

Todo arquivo de página deve seguir este template:

```tsx
export default function NomeDaPagina() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      {/* Cabeçalho da página */}
      <div className="mb-8">
        <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
          Categoria
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Título da Página
        </h1>
      </div>

      {/* Parágrafo introdutório */}
      <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
        Descrição da página.
      </p>

      {/* Seções adicionais conforme necessário */}
    </div>
  )
}
```

**Regras do template:**
- Wrapper: `max-w-3xl mx-auto px-8 py-12` (nunca alterar — padrão de todas as páginas)
- Label (categoria): `text-sm font-medium uppercase tracking-widest` + `muted-foreground`
- H1: `text-4xl font-bold tracking-tight` + `foreground`
- Body: `text-lg leading-relaxed` + `muted-foreground`
- Export: sempre `default export` em arquivos de rota

---

## Passo 3 — Blocos de conteúdo reutilizáveis

### Info Box (caixa de destaque com lista)

```tsx
<div className="mt-10 p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
  <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">
    Título da seção
  </h2>
  <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### Seção com H2

```tsx
<div className="mt-10">
  <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">
    Título da seção
  </h2>
  <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
    Conteúdo da seção.
  </p>
</div>
```

### Parágrafos múltiplos

```tsx
<p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
  Primeiro parágrafo.
</p>
<p className="mt-4 text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
  Segundo parágrafo.
</p>
```

---

## Passo 4 — Linkar na Sidebar (quando necessário)

**Arquivo:** `apps/docs/src/components/sidebar.tsx`

A sidebar contém um array `navItems` no topo do arquivo:

```tsx
const navItems = [
  { label: "Introdução",  href: "/",            icon: BookOpen },
  { label: "Fundamentos", href: "/fundamentos",  icon: FileText },
]
```

### Quando adicionar à sidebar

- A página é uma **seção de primeiro nível** (ex: `/api`, `/conceitos`)
- O usuário pede explicitamente para linkar no menu

### Quando NÃO adicionar à sidebar

- A página é uma **subpágina** (ex: `/fundamentos/drizzle`) — subpáginas não entram no nav principal
- O usuário não pediu e não é uma seção nova de primeiro nível

### Como adicionar

1. Escolher um ícone adequado do `lucide-react`. Ícones disponíveis no projeto:
   - `BookOpen` — seções introdutórias
   - `FileText` — documentação técnica
   - Outros sugeridos: `Code2`, `Database`, `Layers`, `Settings`, `Zap`, `Globe`

2. Adicionar o import no topo do arquivo se o ícone ainda não estiver importado:
```tsx
import { BookOpen, FileText, Code2 } from "lucide-react"
```

3. Adicionar o item ao array `navItems`:
```tsx
const navItems = [
  { label: "Introdução",  href: "/",           icon: BookOpen },
  { label: "Fundamentos", href: "/fundamentos", icon: FileText },
  { label: "Nova Seção",  href: "/nova-secao",  icon: Code2 },   // ← adicionado
]
```

> A ordem no array é a ordem de exibição no menu. Geralmente: introdução primeiro, depois seções técnicas em ordem lógica de aprendizado.

---

## Hierarquia de tipografia (referência rápida)

| Elemento | Classes                                                                          |
|----------|----------------------------------------------------------------------------------|
| Label    | `text-sm font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]` |
| H1       | `text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]`                |
| H2       | `text-base font-semibold text-[hsl(var(--foreground))]`                          |
| Body     | `text-lg leading-relaxed text-[hsl(var(--muted-foreground))]`                    |
| Small    | `text-sm text-[hsl(var(--muted-foreground))]`                                    |
| Strong   | `text-[hsl(var(--foreground))]`                                                  |

---

## Cores (referência rápida)

Sempre usar `hsl(var(--nome))` — nunca `var(--nome)` direto (Tailwind v4).

| Variável             | Uso                              |
|----------------------|----------------------------------|
| `--foreground`       | Texto principal, títulos         |
| `--muted-foreground` | Texto secundário, corpo          |
| `--muted`            | Fundo de caixas de destaque      |
| `--border`           | Bordas de caixas e divisores     |
| `--background`       | Fundo da página                  |

---

## Checklist de entrega

Antes de considerar a tarefa concluída, verificar:

- [ ] Arquivo criado no caminho correto dentro de `src/app/`
- [ ] Exporta `default function`
- [ ] Wrapper `max-w-3xl mx-auto px-8 py-12` presente
- [ ] Cabeçalho com label + H1 seguindo o padrão
- [ ] Se pedido: item adicionado ao `navItems` da sidebar com ícone e import corretos
- [ ] Sem classes CSS fora do padrão do projeto (sem `var(--x)` sem `hsl()`)
