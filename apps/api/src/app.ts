import cors from "@fastify/cors"
import { createFastifyLoggerConfig } from "@spec-driven/logger"
import Fastify from "fastify"

export function buildApp() {
  const app = Fastify({
    logger: createFastifyLoggerConfig({
      name: "api",
      level: process.env.LOG_LEVEL ?? "info",
    }),
  })

  app.register(cors, {
    origin: true,
  })

  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() }
  })

  return app
}
