export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-8">
        <span className="text-sm font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
          Introdução
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Spec-Driven Development
        </h1>
      </div>

      <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
        Bem-vindo à documentação do projeto{" "}
        <strong className="text-[hsl(var(--foreground))]">Spec-Driven</strong>. Esta é uma abordagem
        de desenvolvimento orientada a especificações, onde as decisões de arquitetura e
        implementação são guiadas por contratos bem definidos entre as partes do sistema.
      </p>

      <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
        Explore o menu lateral para navegar pelos tópicos disponíveis e aprender mais sobre os
        fundamentos e práticas deste projeto.
      </p>

      <div className="mt-10 p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">
          Sobre o projeto
        </h2>
        <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
          <li>API REST com Fastify 5 e Drizzle ORM</li>
          <li>Documentação com Next.js 15 e React 19</li>
          <li>Monorepo gerenciado com pnpm e Turborepo</li>
          <li>Locale pt-BR</li>
        </ul>
      </div>
    </div>
  )
}
