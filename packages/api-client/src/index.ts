export { createApiClient } from "./client"
export type { paths, components } from "./generated/api"

export function withAuth(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } }
}
