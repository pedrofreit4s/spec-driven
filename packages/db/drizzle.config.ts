import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: [
    "./src/schema/users.ts",
    "./src/schema/refresh-tokens.ts",
    "./src/schema/relations.ts",
  ],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
})
