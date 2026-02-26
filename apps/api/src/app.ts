import { createServer } from "@spec-driven/http"
import { createFastifyLoggerConfig } from "@spec-driven/logger"

export function buildApp() {
  const server = createServer({
    logger: createFastifyLoggerConfig({
      name: "api",
      level: process.env.LOG_LEVEL ?? "info",
    }),
    cors: { origin: true },
  })

  return server
}
