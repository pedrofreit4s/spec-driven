# View Patterns — apps/docs

Documento de referência visual para o site de documentação (`apps/docs`). Usado para manter consistência ao criar novas páginas e componentes.

---

## 1. Layout da Página

O layout raiz usa **dois painéis em flexbox horizontal**:

```
┌─────────────────────────────────────────────────────────────┐
│  <body class="flex min-h-screen">                           │
│  ┌────────────┐  ┌─────────────────────────────────────┐   │
│  │  Sidebar   │  │  <main class="flex-1 overflow-auto"> │   │
│  │  w-64      │  │                                      │   │
│  │  (256px)   │  │  Conteúdo da rota                    │   │
│  │            │  │                                      │   │
│  └────────────┘  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Arquivo:** `src/app/layout.tsx`

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  )
}
```

**Padrões do layout:**
- `flex min-h-screen` — corpo ocupa 100% da viewport em coluna horizontal
- `lang="pt-BR"` — locale obrigatório para todo o site
- Sidebar com largura fixa; conteúdo principal com `flex-1` (expande o espaço restante)
- Sem Table of Contents implementada ainda (reservar espaço no lado direito quando necessário)

---

## 2. Sidebar

**Arquivo:** `src/components/sidebar.tsx`
**Exportação:** named export — `export function Sidebar()`

```
┌──────────────────────┐
│ Spec-Driven          │  ← h2: text-lg font-semibold
│ Documentação         │  ← p: text-sm muted-foreground
│──────────────────────│
│ 📖 Introdução        │  ← nav item com ícone Lucide
│ 📄 Fundamentos       │  ← nav item com ícone Lucide
└──────────────────────┘
```

**Classes relevantes:**
| Elemento      | Classes Tailwind                                                                 |
|---------------|----------------------------------------------------------------------------------|
| `<aside>`     | `w-64 shrink-0 border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] min-h-screen` |
| Container     | `p-6`                                                                            |
| Título bloco  | `mb-8`                                                                           |
| Título h2     | `text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]`             |
| Subtítulo p   | `text-sm text-[hsl(var(--muted-foreground))] mt-1`                              |
| Nav           | `space-y-1`                                                                      |
| Link item     | `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors` |
| Link hover    | `hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]`       |
| Ícone         | `size-4 shrink-0`                                                                |

**Ícones (Lucide React):**
- `BookOpen` — Introdução
- `FileText` — Fundamentos

**Adicionando novos itens ao nav:**
```tsx
const navItems = [
  { label: "Introdução", href: "/", icon: BookOpen },
  { label: "Fundamentos", href: "/fundamentos", icon: FileText },
  // adicionar aqui: { label: "...", href: "/...", icon: IconName }
]
```

---

## 3. Área de Conteúdo

**Padrão de wrapper para páginas de conteúdo:**

```tsx
<div className="max-w-3xl mx-auto px-8 py-12">
  {/* conteúdo da página */}
</div>
```

| Propriedade    | Valor                       |
|----------------|-----------------------------|
| Largura máxima | `max-w-3xl` (768px)         |
| Centralizado   | `mx-auto`                   |
| Padding H      | `px-8` (32px)               |
| Padding V      | `py-12` (48px)              |

---

## 4. Tipografia e Hierarquia de Headings

| Nível    | Uso                    | Classes Tailwind                                                      |
|----------|------------------------|-----------------------------------------------------------------------|
| Label    | Categoria / breadcrumb | `text-sm font-medium uppercase tracking-widest text-[hsl(var(--muted-foreground))]` |
| **H1**   | Título principal       | `text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]`     |
| **H2**   | Seção de conteúdo      | `text-base font-semibold text-[hsl(var(--foreground))]`               |
| Body     | Texto corrido          | `text-lg text-[hsl(var(--muted-foreground))] leading-relaxed`         |
| Small    | Meta / caption         | `text-sm text-[hsl(var(--muted-foreground))]`                         |
| Strong   | Destaque inline        | `text-[hsl(var(--foreground))]` (sobrepõe a cor muted do pai)         |

**Exemplo de cabeçalho de página:**
```tsx
<div className="mb-8">
  <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
    Categoria
  </span>
  <h1 className="mt-2 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
    Título da Página
  </h1>
</div>
```

---

## 5. Componentes Visuais em Uso

### 5.1 Info Box (caixa de destaque)

Usado na `page.tsx` para a seção "Sobre o projeto":

```tsx
<div className="mt-10 p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
  <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">
    Título da caixa
  </h2>
  <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### 5.2 Parágrafo com espaçamento

```tsx
<p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
  Primeiro parágrafo.
</p>
<p className="mt-4 text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
  Segundo parágrafo.
</p>
```

---

## 6. Sistema de Cores (CSS Variables)

Definidas em `src/app/globals.css`:

| Variável                  | Valor HSL             | Uso                                    |
|---------------------------|-----------------------|----------------------------------------|
| `--background`            | `0 0% 100%`           | Fundo da página (branco)               |
| `--foreground`            | `222.2 84% 4.9%`      | Texto principal (quase preto)          |
| `--muted`                 | `210 40% 96%`         | Fundo de elementos suaves              |
| `--muted-foreground`      | `215.4 16.3% 46.9%`   | Texto secundário (cinza médio)         |
| `--border`                | `214.3 31.6% 91.4%`   | Bordas gerais                          |
| `--accent`                | `210 40% 94%`         | Hover de itens de navegação            |
| `--accent-foreground`     | `222.2 84% 4.9%`      | Texto em estado hover                  |
| `--sidebar-background`    | `0 0% 97%`            | Fundo da sidebar (cinza bem claro)     |
| `--sidebar-foreground`    | `240 5.3% 26.1%`      | Texto da sidebar                       |
| `--sidebar-border`        | `220 13% 91%`         | Borda direita da sidebar               |

**Uso correto das variáveis:**
```tsx
// ✅ Correto — com hsl() wrapper
className="text-[hsl(var(--foreground))]"
className="bg-[hsl(var(--muted))]"
className="border-[hsl(var(--border))]"

// ❌ Evitar — sem hsl() não funciona com Tailwind v4
className="text-[var(--foreground)]"
```

---

## 7. Espaçamento

Base: 4px (1 unidade Tailwind = 4px)

| Token   | px  | Uso comum                           |
|---------|-----|-------------------------------------|
| `1`     | 4px | —                                   |
| `2`     | 8px | —                                   |
| `3`     | 12px| `gap-3` (ícone + label no nav)      |
| `4`     | 16px| —                                   |
| `6`     | 24px| `p-6` (padding de seções)           |
| `8`     | 32px| `px-8` (padding horizontal do main) |
| `10`    | 40px| `mt-10` (espaçamento grande)        |
| `12`    | 48px| `py-12` (padding vertical do main)  |

---

## 8. shadcn/ui — Configuração

**Arquivo:** `components.json`

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "lucide"
}
```

**Status atual:** Configurado, mas nenhum componente instalado ainda.
Componentes são instalados com: `pnpm dlx shadcn@latest add <component>`
Serão colocados em: `src/components/ui/`

---

## 9. Estrutura de Arquivos e Exportações

```
src/
├── app/
│   ├── layout.tsx       # default export — RootLayout
│   ├── page.tsx         # default export — Home
│   └── globals.css      # CSS global + variáveis de tema
├── components/
│   ├── sidebar.tsx      # named export — Sidebar
│   └── ui/              # (vazio — futuro shadcn/ui)
└── lib/
    └── utils.ts         # named export — cn()
```

**Convenções:**
- Componentes de layout e rota → `default export`
- Componentes reutilizáveis → `named export`
- Componentes shadcn/ui → `named export` em `src/components/ui/`

---

## 10. Utilitário `cn()`

**Arquivo:** `src/lib/utils.ts`

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usado para mesclar classes condicionalmente sem conflito:

```tsx
className={cn(
  "base-classes",
  isActive && "active-classes",
  "override-classes"
)}
```
