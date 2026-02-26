import { drizzle } from "drizzle-orm/postgres-js"
import { createClient } from "./client.js"
import * as schema from "./schema/index.js"

export function createDatabase(databaseUrl: string) {
  const client = createClient(databaseUrl)
  return drizzle(client, { schema })
}

export type Database = ReturnType<typeof createDatabase>
