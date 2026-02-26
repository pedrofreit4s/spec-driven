import { Sidebar } from "@/components/sidebar"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Docs | Spec-Driven",
  description: "Documentação do projeto Spec-Driven",
}

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
