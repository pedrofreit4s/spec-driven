import type { FastifyInstance } from "fastify"
import type { HealthCheckOptions } from "../types.js"

export async function registerHealthCheck(app: FastifyInstance, options: HealthCheckOptions = {}) {
  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() }
  })

  app.get("/ready", async (_request, reply) => {
    const checkers = options.readinessCheckers ?? []

    if (checkers.length === 0) {
      return { status: "ok", timestamp: new Date().toISOString() }
    }

    try {
      await Promise.all(checkers.map((check) => check()))
      return { status: "ok", timestamp: new Date().toISOString() }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Readiness check failed"
      return reply.status(503).send({
        status: "unavailable",
        message,
        timestamp: new Date().toISOString(),
      })
    }
  })
}
