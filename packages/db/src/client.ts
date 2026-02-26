import postgres from "postgres"

export function createClient(databaseUrl: string) {
  return postgres(databaseUrl)
}
