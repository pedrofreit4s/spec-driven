import path from "node:path"
import dotenv from "dotenv"
import { defineConfig } from "drizzle-kit"

dotenv.config({ path: path.resolve(__dirname, "../../apps/api/.env") })

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
