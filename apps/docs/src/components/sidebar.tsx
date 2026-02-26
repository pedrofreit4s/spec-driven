import { cn } from "@/lib/utils"
import { BookOpen, FileText } from "lucide-react"
import Link from "next/link"

const navItems = [
  {
    label: "Introdução",
    href: "/",
    icon: BookOpen,
  },
  {
    label: "Fundamentos",
    href: "/fundamentos",
    icon: FileText,
  },
]

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-background))] min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Spec-Driven
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Documentação</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
